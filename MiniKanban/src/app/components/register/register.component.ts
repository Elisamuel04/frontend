import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Register</h2>
    <form (ngSubmit)="register()">
      <input [(ngModel)]="username" name="username" placeholder="Username" />
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
    <p>{{message}}</p>
  `
})
export class RegisterComponent {
  username = '';
  password = '';
  message = '';

  constructor(private auth: AuthService) {}

  register() {
    this.auth.register(this.username, this.password).subscribe({
      next: (res) => {
        this.message = 'Registro exitoso!';
      },
      error: (err) => {
        this.message = err.error?.error || 'Error';
      }
    });
  }
}
