import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PictureApi } from '../../api/picture/picture-api';
import { AuthApi } from '../../api/auth/auth-api';

@Component({
  selector: 'hb-create-post',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss'
})
export class CreatePostView {
  private readonly pictureApi = inject(PictureApi);
  private readonly authApi = inject(AuthApi);
  private readonly router = inject(Router);

  readonly currentUser = this.authApi.user;
  readonly title = signal<string>('');
  readonly description = signal<string>('');
  readonly selectedFile = signal<File | null>(null);
  readonly previewUrl = signal<string | null>(null);
  readonly isUploading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        this.error.set('Veuillez sélectionner une image valide');
        return;
      }

      // Vérifier la taille (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.error.set('L\'image ne doit pas dépasser 10MB');
        return;
      }

      this.selectedFile.set(file);
      this.error.set(null);

      // Créer une preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile() {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
  }

  async submitPost() {
    const file = this.selectedFile();
    const titleValue = this.title().trim();
    const desc = this.description().trim();

    if (!file) {
      this.error.set('Veuillez sélectionner une image');
      return;
    }

    if (!titleValue) {
      this.error.set('Le titre est obligatoire');
      return;
    }

    if (!desc) {
      this.error.set('La description est obligatoire');
      return;
    }

    if (!this.currentUser()) {
      this.error.set('Vous devez être connecté pour poster');
      return;
    }

    this.isUploading.set(true);
    this.error.set(null);

    // Étape 1: Upload de l'image
    this.pictureApi.uploadImage(file).subscribe({
      next: (response) => {
        // Le backend retourne {filename: "uuid.jpg"}
        const filename = response.filename;

        // Étape 2: Créer le post avec le nom du fichier
        const picture = {
          image: filename,
          title: titleValue,
          description: desc
        };

        this.pictureApi.createPost(picture).subscribe({
          next: (createdPicture) => {
            this.isUploading.set(false);
            // Rediriger vers le détail du post
            this.router.navigate(['/picture', createdPicture.id]);
          },
          error: (err) => {
            console.error('Error creating post:', err);
            this.error.set('Erreur lors de la création du post');
            this.isUploading.set(false);
          }
        });
      },
      error: (err) => {
        console.error('Error uploading image:', err);
        this.error.set('Erreur lors de l\'upload de l\'image');
        this.isUploading.set(false);
      }
    });
  }
}