
import { Component } from '@angular/core'
import { Deferred } from './defer.service'

declare var $: any;

@Component({
  selector: 'loading-modal',
  templateUrl: './loading-modal.component.html',
})

export class LoadingModalComponent {
  message: string = '';
  showDefer: Deferred<void>;
  closeDefer: Deferred<void>;

  constructor() {}

  show(): Promise<void> {
    this.showDefer = new Deferred<void>()
    $('#modalLoading').on('shown.bs.modal', () => {
      $(this).off('shown.bs.modal');
      this.showDefer.resolve();
    });
    $('#modalLoading').modal({
      backdrop: 'static',
      keyboard: false
    });
    return this.showDefer.promise;
  }

  hide(): Promise<void> {
    this.closeDefer = new Deferred<void>()
    $('#modalLoading').on('hidden.bs.modal', () => {
      $(this).off('hidden.bs.modal');
      this.closeDefer.resolve()
    });
    $('#modalLoading').modal('hide');
    return this.closeDefer.promise;
  }
}