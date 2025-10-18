import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="username" name="username" placeholder="Username" />
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p>{{message}}</p>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.message = 'Login exitoso!';
      },
      error: (err) => {
        this.message = err.error?.error || 'Error';
      }
    });
  }
}
