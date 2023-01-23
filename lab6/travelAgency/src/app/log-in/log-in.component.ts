import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FbAuthService } from '../services/fb-auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css', '../../assets/styles/form.css']
})
export class LogInComponent {

  passwordVisible = false;

  loginForm = this.fb.group({
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
    let formValues = this.loginForm.value;

    // values won't be null nor undefined, because we have validators
    this.fbAuth.logInUser(formValues.email!, formValues.password!);

    this.loginForm.reset();
  }
}
