import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  password = '';
  repeatPassword = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    // ✅ Validar contraseñas
    if (this.password !== this.repeatPassword) {
      this.message = '❌ Las contraseñas no coinciden';
      return;
    }

    // ✅ Validar campos vacíos
    if (!this.username || !this.password) {
      this.message = '⚠️ Debes llenar todos los campos';
      return;
    }

    // ✅ Llamar al backend
    this.auth.register(this.username, this.password).subscribe({
      next: (res) => {
        this.message = '✅ Registro exitoso!';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = err.error?.error || '❌ Error en el registro';
      }
    });
  }
}
