import { ReportService } from './report.service';
import { Component, Input, ViewChild } from '@angular/core';
import { Report } from './report';
import { ReportGroup } from './report-group';
import { ItemInfoModalComponent } from './iteminfo-modal.component';

@Component({
  selector: 'app-content',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent {
  @Input() report: Report;
  @ViewChild('itemInfoModal') itemInfoModal: ItemInfoModalComponent;

  constructor(reportService: ReportService) {
    reportService.get().then(report => {
      this.report = report;
    });
  }

  setPage(page: number): boolean {
    this.report.setPage(page);
    return false;
  }

  showReport(rg: ReportGroup) {
    this.itemInfoModal.show(rg);
  }
}
