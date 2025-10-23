import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit {
  loginForm!: FormGroup;
  message = '';
  loading = false;

  @ViewChild('mainContent') mainContent!: ElementRef;

    ngAfterViewInit() {
    this.mainContent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } 

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

      ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  login() {

    if (this.loginForm.invalid || this.loading) return;

    this.loading = true;
    this.message = '⏳ Iniciando sesión...';

    const { username, password } = this.loginForm.value;
    
    this.auth.login(username, password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.message = '✅ Login exitoso!';
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: (err) => {
        this.message = err.error?.error || '❌ Error al iniciar sesión';
        this.loading = false;
      },
    });
  }
}
