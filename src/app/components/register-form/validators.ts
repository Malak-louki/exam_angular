import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (control:AbstractControl): ValidationErrors|null =>  {
    if(control.value.password === control.value.repeatPassword) {
        return null;
    } 
    return {PasswordNoRepeat:true};
}