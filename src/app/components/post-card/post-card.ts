import { Component, input } from '@angular/core';
import { Picture } from '../../../../entities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hb-post-card',
  imports: [CommonModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss'
})
export class PostCard {

  readonly post = input.required<Picture>();

  liked = false;

toggleLike() {
  this.liked = !this.liked;
}

}
