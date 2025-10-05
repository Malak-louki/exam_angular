import { Component, inject, input } from '@angular/core';
import { PictureApi } from '../../api/picture/picture-api';
import { PostList } from "../../components/post-list/post-list";
import { Pagination } from "../../components/pagination/pagination";

@Component({
  selector: 'hb-feed',
  imports: [PostList, Pagination],
  templateUrl: './feed.html',
  styleUrl: './feed.scss'
})
export class Feed {

  private readonly pictureApi= inject(PictureApi);

  readonly page = input(1, {transform: (val) => val ? Number(val):1});

  protected readonly postPage =  this.pictureApi.getAll(this.page);


}
