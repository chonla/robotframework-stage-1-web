import { Component } from '@angular/core'
import { Deferred } from './defer.service'

declare var $: any;

@Component({
  selector: 'error-modal',
  templateUrl: './error-modal.component.html',
})

export class ErrorModalComponent {
  message: string = '';
  defer: Deferred<void>;

  constructor() {
    this.defer = new Deferred<void>()
  }

  show(msg: string): Promise<void> {
    this._show(msg);
    return this.defer.promise;
  }

  _show(msg: string): void {
    this.message = msg;
    $('#errorModal').on('hidden.bs.modal', () => {
      $(this).off('hidden.bs.modal');
      this.defer.resolve()
    });
    $('#errorModal').modal({
      backdrop: 'static',
      keyboard: false
    });
  }
}