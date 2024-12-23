import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  class_validate = "needs-validation";
  mensagem = "";

  form_login = new FormGroup({
    cpf: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private authService: AuthService) {
  }

  valida_campos_dados(): boolean {
    if (this.form_login.invalid) {
      this.class_validate = "was-validated";
      return false;
    } else {
      this.class_validate = "needs-validation";
      return true;
    }
  }

  logar() {
    if (this.valida_campos_dados()) {
      let user = {
        "cpf": this.form_login.get('cpf')?.value, 
        "password": this.form_login.get('password')?.value
      };
      if (!this.authService.isLoggedIn()) {
        this.authService.login(user).subscribe({
          next: token => {
            if (token) {
              this.authService.setToken(token['token_jwt']);
              this.router.navigateByUrl('');
            }
          },
          error: error => {
            this.mensagem = error.error.msg;
          }
        });
      } else {
        this.router.navigateByUrl('');
      }
    }
  }

  novo_cadastro() {
    this.router.navigateByUrl('usuario/criar')
  }
}