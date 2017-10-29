import { ReportItem } from './report-item';

export class ReportGroup {
    date: string;
    total_cost: number;
    total_income: number;
    items: ReportItem[];
}
