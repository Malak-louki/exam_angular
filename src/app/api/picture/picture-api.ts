import { inject, Injectable, Signal } from '@angular/core';
import { Page, Picture, Comment } from '../../../shared/models/entities'; // ⚠️ Nouveau chemin
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureApi {
  private readonly http = inject(HttpClient);

  // Récupérer toutes les images paginées
  getAll(page?: Signal<number>) {
    return httpResource<Page<Picture>>(() => {
      const params: any = {
        pageNumber: page ? page() : 0,
        pageSize: 10
      }
      return {
        url: environment.serverUrl + '/api/picture',
        params
      }
    });
  }

  // Récupérer les images d'un utilisateur spécifique
  getByUser(userId: number, pageNumber: number = 0, pageSize: number = 10) {
    return this.http.get<Page<Picture>>(
      `${environment.serverUrl}/api/picture/user/${userId}`,
      { 
        params: { 
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString()
        },
        withCredentials: true 
      }
    );
  }

  // Récupérer une image spécifique
  getById(id: number) {
    return this.http.get<Picture>(
      `${environment.serverUrl}/api/picture/${id}`,
      { withCredentials: true }
    );
  }

  // Upload d'une image
  uploadImage(file: File): Observable<{filename: string}> {
    const formData = new FormData();
    formData.append('image', file);
    
    return this.http.post<{filename: string}>(
      `${environment.serverUrl}/api/picture/upload`,
      formData,
      { withCredentials: true }
    );
  }

  // Créer un post
  createPost(picture: Partial<Picture>) {
    return this.http.post<Picture>(
      `${environment.serverUrl}/api/picture`,
      picture,
      { withCredentials: true }
    );
  }

  // Récupérer les commentaires
  getComments(pictureId: number) {
    return this.http.get<Comment[]>(
      `${environment.serverUrl}/api/picture/${pictureId}/comment`,
      { withCredentials: true }
    );
  }

  // Poster un commentaire
  addComment(comment: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(
      `${environment.serverUrl}/api/comment`,
      comment,
      { withCredentials: true }
    );
  }

  // Toggle like
  toggleLike(pictureId: number) {
    return this.http.patch<Picture>(
      `${environment.serverUrl}/api/picture/${pictureId}/like`,
      {},
      { withCredentials: true }
    );
  }
}