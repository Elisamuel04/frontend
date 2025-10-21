import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {
  registerForm!: FormGroup;
  message = '';


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
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
    });
  }

  register() {
    const { username, password, repeatPassword } = this.registerForm.value;
    // ✅ Validar contraseñas
    if (password !== repeatPassword) {
      this.message = '❌ Las contraseñas no coinciden';
      return;
    }

    // ✅ Validar campos vacíos
    if (!username || !password) {
      this.message = '⚠️ Debes llenar todos los campos';
      return;
    }

    // ✅ Llamar al backend
    this.auth.register(username, password).subscribe({
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
