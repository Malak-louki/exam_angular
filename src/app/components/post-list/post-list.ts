import { Component, input } from '@angular/core';
import { Picture } from '../../../../entities';
import { PostCard } from "../post-card/post-card";

@Component({
  selector: 'hb-post-list',
  imports: [PostCard],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss'
})
export class PostList {

  readonly posts = input.required<Picture[]>();


}
