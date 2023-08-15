import { Component } from '@angular/core';
import { Usuario} from 'src/app/modelos/Usuarios';
import {OnInit, HostBinding } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-admi-empresa',
  templateUrl: './lista-admi-empresa.component.html',
  styleUrls: ['./lista-admi-empresa.component.css']
})
export class ListaAdmiEmpresaComponent {

  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Variables que usaremos en el resto del código
  administradores: any = []
  vacio = false
  empresa: number = 0
  nombre_admi: string = ""

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]

    //Obtenemos todos los administradores de la empresa a partir del identificador de la empresa usando la función getAdministradoresEmpresa
    //necesitaremos también el nombre del administrador para poder acceder a la url correspondiente
    this.reservasServices.getAdministradoresEmpresa(this.nombre_admi, this.empresa).subscribe(
      res =>{
        this.administradores = res;
        //Si no devuelve ningún administrador es porque esa empresa no tiene administradores 
        //de forma que indicaremos que la lista de administradores está vacía
        if(this.administradores.length == 0){
          this.vacio = true
        }
      },
      err => console.error(err)
    );
  }

  //Función que nos permite ir a la página donde podremos editar los datos del administrador
  editarAdministradorEmpresa(admi: Usuario){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + admi.id_empresa + '/lista_administradores/' + admi.id;
    this.router.navigate([ruta]);
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la pantalla inicial del perfil del administrador general
  volver(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.empresa 
    this.router.navigate([ruta]);
  }

  //Función que nos permite ir a la página donde podremos añadir un nuevo administrador a la empresa
  aniadir(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.empresa + '/lista_administradores/aniadir'
    this.router.navigate([ruta]);
  }
}
