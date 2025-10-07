import { Routes } from '@angular/router';
import { RegisterView } from './pages/register-view/register-view';
import { HomeView } from './pages/home-view/home-view';
import { LoginView } from './pages/login-view/login-view';
import { Feed } from './pages/feed/feed';

import { CreatePostView } from './components/create-post/create-post';
import { UserPicturesView } from './components/user-pictures/user-pictures';
import { PictureDetailView } from './components/picture-detail/picture-detail';

export const routes: Routes = [
    { path: '', component: HomeView },
    { path: 'register', component: RegisterView },
    { path: 'login', component: LoginView },
    { path: 'feed', component: Feed },
    { path: 'picture/:id', component: PictureDetailView },
    { path: 'create', component: CreatePostView },
    { path: 'user/:userId/pictures', component: UserPicturesView }
];
