import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'hb-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {

  private readonly fb = inject(FormBuilder);
  protected readonly form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password:['',  Validators.required]
  });

  readonly submitForm = output<{email:string,password:string}>();


  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      
      return
    }
    this.submitForm.emit({
      email: this.form.value.email!,
      password: this.form.value.password!
    });
    
  }

}
