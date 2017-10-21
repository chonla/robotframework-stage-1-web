import { Component } from '@angular/core';
import { Deferred } from './defer.service';

declare var $: any;

@Component({
  selector: 'success-modal',
  templateUrl: './success-modal.component.html',
})

export class SuccessModalComponent {
  message = '';
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
    $('#modal').on('hidden.bs.modal', () => {
      $(this).off('hidden.bs.modal');
      this.defer.resolve();
    });
    $('#modal').modal({
      backdrop: 'static',
      keyboard: false
    });
  }
}
