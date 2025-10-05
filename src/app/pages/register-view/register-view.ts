import { Component, inject, signal } from '@angular/core';
import { RegisterForm } from "../../components/register-form/register-form";

import { User } from '../../../../entities.js';
import { AuthApi } from '../../api/auth/auth-api';

@Component({
  selector: 'hb-register-view',
  imports: [RegisterForm],
  templateUrl: './register-view.html',
  styleUrl: './register-view.scss'
})
export class RegisterView {

  private readonly authApi = inject(AuthApi);

  protected readonly serverError = signal('');

  register(formValue:User) {
    this.authApi.register(formValue).subscribe({
      next: () => console.log('registered successfully'),
      error: (err) => this.serverError.set(err.error?.detail ?? 'Server unreachable')
    });
  }

}
