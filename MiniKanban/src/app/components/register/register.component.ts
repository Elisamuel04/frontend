import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html'
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
