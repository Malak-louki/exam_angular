import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PictureApi } from '../../api/picture/picture-api';
import { AuthApi } from '../../api/auth/auth-api';
import { environment } from '../../../environments/environment.development';
import { Comment as PictureComment, Picture } from '../../../shared/models/entities'; 

@Component({
  selector: 'hb-picture-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './picture-detail.html',
  styleUrl: './picture-detail.scss'
})
export class PictureDetailView implements OnInit {
  private readonly pictureApi = inject(PictureApi);
  private readonly authApi = inject(AuthApi);
  private readonly route = inject(ActivatedRoute);

  readonly picture = signal<Picture | null>(null);
  readonly comments = signal<PictureComment[]>([]); 
  readonly isLiked = signal<boolean>(false);
  readonly likesCount = signal<number>(0);
  readonly isLoading = signal<boolean>(true);
  readonly commentContent = signal<string>('');
  readonly isSubmitting = signal<boolean>(false);
  readonly currentUser = this.authApi.user;

  readonly serverUrl = environment.serverUrl;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadPicture(id);
    }
  }

  private loadPicture(id: number) {
    this.pictureApi.getById(id).subscribe({
      next: (picture) => {
        this.picture.set(picture);
        this.comments.set(picture.comments || []);
        this.likesCount.set(picture.likes?.length || 0);
        
        // Vérifier si l'utilisateur a liké
        const user = this.currentUser();
        if (user && picture.likes) {
          const liked = picture.likes.some(likeUser => likeUser.id === user.id);
          this.isLiked.set(liked);
        }
        
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading picture:', err);
        this.isLoading.set(false);
      }
    });
  }

  toggleLike() {
    const picture = this.picture();
    if (!picture || !this.currentUser()) return;

    this.pictureApi.toggleLike(picture.id).subscribe({
      next: (updatedPicture) => {
        this.picture.set(updatedPicture);
        this.likesCount.set(updatedPicture.likes?.length || 0);
        
        const user = this.currentUser();
        if (user) {
          const nowLiked = updatedPicture.likes?.some(likeUser => likeUser.id === user.id) || false;
          this.isLiked.set(nowLiked);
        }
      },
      error: (err) => console.error('Error toggling like:', err)
    });
  }

  submitComment() {
    const picture = this.picture();
    const content = this.commentContent().trim();
    
    if (!picture || !content || !this.currentUser() || this.isSubmitting()) return;

    this.isSubmitting.set(true);

    // Le comment doit avoir une référence à la picture
    const comment: Partial<PictureComment> = {
      content: content,
      picture: { id: picture.id } as Picture
    };

    this.pictureApi.addComment(comment).subscribe({
      next: (newComment) => {
        this.comments.update(comments => [newComment, ...comments]);
        this.commentContent.set('');
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error('Error posting comment:', err);
        this.isSubmitting.set(false);
      }
    });
  }
}