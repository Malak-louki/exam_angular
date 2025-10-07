import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Page } from '../../../shared/models/entities';

@Component({
  selector: 'hb-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  readonly paginated = input.required<Page<any>>();
  readonly page = input.required<number>();
   readonly pageChange = output<number>(); 
     next() {
    const p = this.page() + 1;
    if (p < (this.paginated().totalPages ?? p)) this.pageChange.emit(p);
  }
  prev() {
    const p = Math.max(0, this.page() - 1);
    this.pageChange.emit(p);
  }
}
