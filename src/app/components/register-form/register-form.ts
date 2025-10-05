import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../entities'
import { confirmPasswordValidator } from '../register-form/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'hb-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss'
})
export class RegisterForm {

  private readonly fb = inject(FormBuilder);
  protected readonly form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    displayName:['',  Validators.required],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    repeatPassword: ['', [Validators.required]]
  },
    {
      validators: confirmPasswordValidator
    });
  readonly submitForm = output<User>();

  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return
    }
    this.submitForm.emit({
      email: this.form.value.email!,
      displayName:this.form.value.displayName!,
      password: this.form.value.password!
    });
    
  }

}
