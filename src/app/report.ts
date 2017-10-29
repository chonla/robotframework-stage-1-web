import { ReportGroup } from './report-group';
import { ReportItem } from './report-item';

export class Report {
  page: number;
  pageCount: number;
  data: ReportGroup[];
  pageSize: number;
  pagedData: ReportGroup[];
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

  groupData(d: ReportItem[]): ReportGroup[] {
    const g: { [index: string]: any; } = {};
    for (let i = 0; i < d.length; i++) {
      const v = d[i].datestamp.split('T');

      if (!g.hasOwnProperty(v[0])) {
        const rg = new ReportGroup();
        rg.date = v[0];
        rg.total_cost = 0;
        rg.total_income = 0;
        rg.items = new Array<ReportItem>();
        g[rg.date] = rg;
      }

      g[v[0]].total_cost += d[i].cost;
      g[v[0]].total_income += d[i].income;
      g[v[0]].items.push(d[i]);
    }

    const o: ReportGroup[] = [];
    for (const k in g) {
      if (g.hasOwnProperty(k)) {
        o.push(g[k]);
      }
    }
    return o;
  }

  setData(d: ReportItem[]) {
    this.data = this.groupData(d);

    this.setPage(1);
    this.refresh();
  }
}
