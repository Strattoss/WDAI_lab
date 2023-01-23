import { Component } from '@angular/core';
import { FormBuilder, FormRecord, Validators } from '@angular/forms';
import { SignUpData } from 'src/assets/interfaces/signUpData';
import { FbAuthService } from '../services/fb-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../assets/styles/form.css']
})
export class RegisterComponent {

  passwordVisible = false;

  registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private fbAuth: FbAuthService) {}

  getEyePath() {
    return this.passwordVisible ? "../../assets/img/opened_eye.jpg" : "../../assets/img/closed_eye.jpg";
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    let formValues = this.registerForm.value;



    // values won't be null nor undefined, because we have validators

    let registeringUser: SignUpData = {
      firstName: formValues.firstName!,
      lastName: formValues.lastName!,
      email: formValues.email!,
    }

    this.fbAuth.signUpUser(registeringUser, formValues.password!);
    
    this.registerForm.reset();
  }
}
