import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  userid: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.userid, this.password).subscribe(
      (success: any) => {
        console.log('Login Success:', success);
        if (success) {
          localStorage.setItem('token', success.token)

          this.router.navigate(['app-home','app-dashboard']);


        } else {
          this.loginError = 'Invalid username or password';
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.loginError = 'An error occurred during login';
      }
    );
  }
  ;

}

