import { Component, input } from '@angular/core';
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
}
