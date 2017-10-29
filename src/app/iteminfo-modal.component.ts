import { ReportGroup } from './report-group';
import { Component } from '@angular/core';
import { Deferred } from './defer.service';

declare var $: any;

@Component({
  selector: 'iteminfo-modal',
  templateUrl: './iteminfo-modal.component.html',
})

export class ItemInfoModalComponent {
  protected rg: ReportGroup;
  defer: Deferred<void>;

  constructor() {
    this.defer = new Deferred<void>();
    this.rg = new ReportGroup();
  }

  show(rg: ReportGroup): Promise<void> {
    this._show(rg);
    return this.defer.promise;
  }

  _show(rg: ReportGroup): void {
    this.rg = rg;
    $('#iteminfo-modal').on('hidden.bs.modal', () => {
      $(this).off('hidden.bs.modal');
      this.defer.resolve();
    });
    $('#iteminfo-modal').modal({
      backdrop: 'static',
      keyboard: false,
      focus: true
    });
  }
}
