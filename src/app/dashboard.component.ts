import { ReportService } from './report.service';
import { Component, Input } from '@angular/core';
import { Report } from './report';

@Component({
  selector: 'app-content',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent {
  @Input() report: Report;

  constructor(reportService: ReportService) {
    reportService.get().then(report => {
      this.report = report;
    });
  }

  setPage(page: number): boolean {
    this.report.setPage(page);
    return false;
  }
}
