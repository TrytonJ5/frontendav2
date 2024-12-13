import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../Model/usuario.model';
import { UsuarioService } from '../../../Services/usuario.service';
import { AuthService } from '../../../Services/auth.service';

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
  atualiza = false;

  form_dados = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
  });


  constructor(private router: Router, private usuarioService: UsuarioService,private AuthService:AuthService) { }

  ngOnInit(){
    if(this.AuthService.isLoggedIn()){
      this.usuarioService.buscarPorToken().subscribe({
      next: (usuario) => {
        this.idUsuario = usuario.id;
        this.preencheForm(usuario)
        this.atualiza = true;
      },
      error: (erro) => {
        console.log(erro);
      }
    })
    }else{
      this.atualiza = false;
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
      let usuario = {
        "nome": this.form_dados.get('nome')?.value, 
        "cpf": this.form_dados.get('cpf')?.value,
        "email": this.form_dados.get('email')?.value,
        "senha": this.form_dados.get('senha')?.value
      };
      if (this.atualiza) {
        this.usuarioService.atualizaUsuario(usuario, this.idUsuario);
      } else {
        this.usuarioService.criarUsuario(usuario);
      }

      this.router.navigateByUrl('');
    }
  }

  voltar() {
    this.router.navigateByUrl('');
  }
}
