
import { Component, OnDestroy } from '@angular/core'
import { Deferred } from './defer.service'

declare var $: any;

@Component({
  selector: 'delay-loading-modal',
  templateUrl: './loading-modal.component.html',
})

export class DelayLoadingModalComponent {
  message: string = '';
  defer: Deferred<void>;
  private timer;

  constructor() {}

  ngOnDestroy() {
    this._clearTimer();
  }

  _clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  show(timeout: number): Promise<void> {
    this.defer = new Deferred<void>()
    $('#modalLoading').on('hidden.bs.modal', () => {
      $(this).off('hidden.bs.modal');
      this.defer.resolve()
    });
    $('#modalLoading').on('shown.bs.modal', () => {
      $(this).off('shown.bs.modal');
      this.timer = setTimeout(() => {
        $('#modalLoading').modal('hide')
        this._clearTimer();
        console.log("timer")

      }, timeout);  
    });
    $('#modalLoading').modal({
      backdrop: 'static',
      keyboard: false
    });
    return this.defer.promise;
  }
}