import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { Picture } from '../../../shared/models/entities';

@Component({
  selector: 'hb-post-card',
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.scss'],
  standalone: true,
  imports: [RouterLink, DatePipe],
})
export class PostCard {
  post = input.required<Picture>();
  serverUrl = environment.serverUrl;

  /** ✅ valeurs directes (pas des fonctions) */
  currentUser = input<any>(null);                 // User | null
  isLiked     = input<boolean>(false);            // like state
  likesCount  = input<number>(0);                 // nombre de likes
  toggleLike  = input<(event: Event) => void>(() => {}); // handler fourni par le parent

  private isAbsolute(url?: string | null): boolean {
    return !!url && /^https?:\/\//i.test(url);
  }

  thumbnailSrc = computed(() => {
    const p = this.post();
    const thumb = (p as any).thumbnaillink || (p as any).thumbnailLink;
    const full  = (p as any).imagelink || (p as any).imageLink;
    const base  = p.image;
    const candidate = thumb || full || base;

    if (this.isAbsolute(candidate)) return candidate!;
    if (candidate) return `${this.serverUrl}/uploads/${candidate}`;
    return 'assets/image-fallback.svg';
  });

  createdAtDate = computed(() => {
    const raw = this.post().createdAt;
    if (!raw) return null;
    const iso = raw.includes('T') ? raw : raw.replace(' ', 'T');
    const d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
  });

  onImageError(evt: Event) {
    const img = evt.target as HTMLImageElement;
    (img as any).onerror = null;
    img.src = 'assets/image-fallback.svg';
  }
}
