
import { Component } from '@angular/core'
import { Deferred } from './defer.service'

declare var $: any;

@Component({
  selector: 'delay-loading-modal',
  templateUrl: './loading-modal.component.html',
})

export class DelayLoadingModalComponent {
  message: string = '';
  defer: Deferred<void>;

  constructor() {
    this.defer = new Deferred<void>()
  }

  show(timeout: number): Promise<void> {
    $('#modalLoading').on('hidden.bs.modal', () => {
      $(this).off('hidden.bs.modal');
      this.defer.resolve()
    });
    $('#modalLoading').on('shown.bs.modal', () => {
      $(this).off('shown.bs.modal');
      setTimeout(() => {
        $('#modalLoading').modal('hide')
      }, timeout);  
    });
    $('#modalLoading').modal({
      backdrop: 'static',
      keyboard: false
    });
    return this.defer.promise;
  }
}