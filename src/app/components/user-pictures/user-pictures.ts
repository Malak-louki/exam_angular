import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PictureApi } from '../../api/picture/picture-api';
import { Page, Picture } from '../../../shared/models/entities';
import { PostList } from '../../components/post-list/post-list';
import { Pagination } from '../../components/pagination/pagination';

@Component({
  selector: 'hb-user-pictures',
  imports: [CommonModule, PostList, Pagination, RouterLink],
  templateUrl: './user-pictures.html',
  styleUrl: './user-pictures.scss',
})
export class UserPicturesView implements OnInit {
  private readonly pictureApi = inject(PictureApi);
  private readonly route = inject(ActivatedRoute);

  readonly pictures = signal<Page<Picture> | null>(null);
  readonly isLoading = signal<boolean>(true);
  readonly currentPage = signal<number>(0);
  readonly userId = signal<number>(0);
  readonly displayName = signal<string>('');

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('userId'));
      this.userId.set(id);

      this.route.queryParamMap.subscribe((queryParams) => {
        const page = Number(queryParams.get('pageNumber')) || 0;
        this.currentPage.set(page);
        this.loadUserPictures(id, page);
      });
    });
  }

  private loadUserPictures(userId: number, pageNumber: number) {
    this.isLoading.set(true);

    this.pictureApi.getByUser(userId, pageNumber).subscribe({
      next: (data) => {
        this.pictures.set(data);
        if (data.content.length > 0) {
          this.displayName.set(data.content[0].author.displayName);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading user pictures:', err);
        this.isLoading.set(false);
      },
    });
  }
}
