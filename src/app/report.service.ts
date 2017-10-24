import { Injectable } from '@angular/core';
import { Report } from './report';

@Injectable()
export class ReportService {
  get(): Promise<Report[]> {
    const reports: Report[] = [
      { datestamp: new Date(2017, 9, 15), cost: 47721.32, income: 58091.11 },
      { datestamp: new Date(2017, 9, 16), cost: 39871.48, income: 47883.92 }
    ];
    return Promise.resolve(reports);
  }
}
