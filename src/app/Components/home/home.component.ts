import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) { }

  listarMinicurso():void{
    if(){
      this.router.navigateByUrl('usuario/listar')
    }else{
      
    }
    
  }
  listarPalestra(): void{
    this.router.navigateByUrl('usuario/listar')
  }
  listarEvento():void{
    this.router.navigateByUrl('usuario/listar')
  }
  listarUsuario():void{
    this.router.navigateByUrl('usuario/listar')
  }
}
