import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements AfterViewInit {
  username = '';
  password = '';
  message = '';

  @ViewChild('mainContent') mainContent!: ElementRef;

    ngAfterViewInit() {
    this.mainContent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } 

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.message = '✅ Login exitoso!';
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.message = err.error?.error || '❌ Error al iniciar sesión';
      }
    });
  }
}
