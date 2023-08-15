import { Component } from '@angular/core';
import { Usuario} from 'src/app/modelos/Usuarios';
import {OnInit, HostBinding } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {

  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Variables que usaremos en el resto del código
  empresa: number = 0
  nombre_admi: string = ""
  usuarios: any = []
  vacio = false

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]

    //Obtenemos todos los usuarios de la empresa a partir de su identificador con la función getUsuariosEmpresa 
    //necesitaremos también el nombre del administrador para poder acceder a la url correspondiente
    this.reservasServices.getUsuariosEmpresa(this.nombre_admi, this.empresa).subscribe(
      res =>{
        this.usuarios = res;
        //Si no devuelve ningún usuario es porque esa empresa no tiene usuarios 
        //de forma que indicaremos que la lista de usuarios está vacía
        if(this.usuarios.length == 0){
          this.vacio = true
        }
      },
      err => console.error(err)
    );
  }

  //Función que nos permite ir a la página donde podremos ver los datos del usuario
  verUsuario(id: number){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.empresa + '/lista_usuarios/' + id
    this.router.navigate([ruta]);
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la pantalla inicial del perfil del administrador general
  volver(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.empresa 
    this.router.navigate([ruta])
  }
}
