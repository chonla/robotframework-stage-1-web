import { ReportItem } from './report-item';

export class Report {
  page: number;
  pageCount: number;
  data: ReportItem[];
  pageSize: number;
  pagedData: ReportItem[];
  pageRange: number[];

  setPageSize(s: number) {
    this.pageSize = s;
    this.refresh();
  }

  setPage(p: number) {
    this.page = p;
    this.refresh();
  }

  getPagedData() {
    return this.pagedData;
  }

  refresh() {
    if (this.data) {
      const fromItem = (this.page - 1) * this.pageSize;
      const toItem = fromItem + this.pageSize;
      this.pagedData = this.data.slice(fromItem, toItem);
      this.pageCount = Math.ceil(this.data.length / this.pageSize);
      this.pageRange = [];
      for (let i = 1; i <= this.pageCount; i++) {
        this.pageRange.push(i);
      }
    }
  }

  setData(d: ReportItem[]) {
    this.data = d;

    this.setPage(1);
    this.refresh();
  }
}
