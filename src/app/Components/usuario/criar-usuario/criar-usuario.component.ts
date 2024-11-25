import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../Model/usuario.model';
import { UsuarioService } from '../../../Services/usuario.service';


@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {
  class_validate = "needs-validation";
  usuario!: Usuario;
  idUsuario!: number;

  form_dados = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private usuarioService: UsuarioService) {
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state && state['idUsuario']) {
      const idUsuario = state['idUsuario'];
      if (idUsuario) {
        this.idUsuario = idUsuario;
      }
    }
  }

  ngOninit(): void {
    if (this.idUsuario) {
      this.usuarioService.buscarUsuario(this.idUsuario).subscribe({
        next: (usuario) => {
          if (usuario.nome) {
            this.usuario = usuario;
            this.preencheForm(usuario);
          }
        }, error: (erro) => {
          console.log(erro)
        }
      })
    }
  }

  get f_dados() { return this.form_dados.controls; }

  preencheForm(usuario: Usuario) {
    this.f_dados.nome.setValue(usuario.nome);
    this.f_dados.email.setValue(usuario.email);
    this.f_dados.cpf.setValue(usuario.cpf);
    this.f_dados.senha.setValue(usuario.senha);
  }

  valida_campos_dados(): boolean {
    if (this.form_dados.invalid) {
      this.class_validate = "was-validated"
      return false;
    } else {
      this.class_validate = "needs-validation"
      return true;
    }
  }

  salvar() {
    if (this.valida_campos_dados()) {
      let usuario_digitado = Object.assign(this.form_dados.value)
      if (this.idUsuario) {
        this.usuario.cpf = usuario_digitado.cpf;
        this.usuario.nome = usuario_digitado.nome;
        this.usuario.email = usuario_digitado.email;
        this.usuario.senha = usuario_digitado.senha;
        this.usuarioService.atualizaUsuario(this.usuario,this.idUsuario);
      } else {
        this.usuarioService.criarUsuario(this.usuario);
      }
      //TODO trocar para pagina home
      this.router.navigateByUrl('/contato/list');
    }
  }
}
