import { ReportService } from './report.service';
import { Component, Input } from '@angular/core';
import { Report } from './report';

@Component({
  selector: 'app-content',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent {
  @Input() reports: Report[];

  constructor(reportService: ReportService) {
    reportService.get().then(reports => this.reports = reports);
  }
}
