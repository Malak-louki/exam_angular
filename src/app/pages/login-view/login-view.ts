import { Component, inject, signal } from '@angular/core';
import { AuthApi } from '../../api/auth/auth-api';
import { LoginForm } from "../../components/login-form/login-form";
import { User } from '../../../../entities';

@Component({
  selector: 'hb-login-view',
  imports: [LoginForm],
  templateUrl: './login-view.html',
  styleUrl: './login-view.scss'
})
export class LoginView {


  private readonly authApi = inject(AuthApi);

  protected readonly serverError = signal('');


  login(formValue:{email:string, password:string}) {
    this.authApi.login(formValue).subscribe({
      next: () => console.log('login successfully'),
      error: (err) => this.serverError.set(err.error?.detail ?? 'Server unreachable')
    });
  }
}
