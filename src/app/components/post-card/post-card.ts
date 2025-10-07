import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Picture } from '../../../shared/models/entities';
import { CommonModule } from '@angular/common';
import { AuthApi } from '../../api/auth/auth-api';
import { PictureApi } from '../../api/picture/picture-api';
import { environment } from '../../../environments/environment.development';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hb-post-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard implements OnInit {
  private readonly authApi = inject(AuthApi);
  private readonly pictureApi = inject(PictureApi);

  readonly post = input.required<Picture>();
  readonly isLiked = signal<boolean>(false);
  readonly likesCount = signal<number>(0);
  readonly currentUser = this.authApi.user;
  readonly serverUrl = environment.serverUrl;

  ngOnInit() {
    const post = this.post();
    const user = this.currentUser();

    // Get likes count from the likes array
    this.likesCount.set(post.likes?.length || 0);

    // Check if the current user has liked the post
    if (user && post.likes) {
      const liked = post.likes.some((likeUser) => likeUser.id === user.id);
      this.isLiked.set(liked);
    }
  }

  onImageError(event: Event): void {
    console.error('Image failed to load for post:', this.post());
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
  }

  toggleLike(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.currentUser()) {
      return;
    }

    const post = this.post();

    // Le backend fait un toggle automatique avec PATCH
    this.pictureApi.toggleLike(post.id).subscribe({
      next: (updatedPicture) => {
        // Mettre à jour l'état local avec la réponse du serveur
        const user = this.currentUser();
        if (user) {
          const nowLiked =
            updatedPicture.likes?.some((likeUser) => likeUser.id === user.id) || false;
          this.isLiked.set(nowLiked);
          this.likesCount.set(updatedPicture.likes?.length || 0);
        }
      },
      error: (err) => console.error('Error toggling like:', err),
    });
  }
}
