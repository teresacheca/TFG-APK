import { Component } from '@angular/core';
import { Recurso} from 'src/app/modelos/Recursos';
import {OnInit, HostBinding } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-ae-lista-recursos',
  templateUrl: './ae-lista-recursos.component.html',
  styleUrls: ['./ae-lista-recursos.component.css']
})
export class AeListaRecursosComponent {
  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Variables que usaremos en el código
  recursos: any = []
  empresa: number = 0
  admi: string = ''

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.admi = params["nombre_usuario"]

    //Obtenemos todos los recursos que hay en la empresa con la siguiente función
    //a partir del identificador de la empresa
    //(también necesitamos el nombre del administrador àra usar la url correspondiente)
    this.reservasServices.getRecursosAe(this.admi, this.empresa).subscribe(
      res =>{
        //Guardamos todos los recursos en un vector que llamamos "recursos"
       this.recursos = res
      },
      err => console.error(err)
    );
  }

  //Función que nos permite ir a la página donde veremos los datos del recurso seleccionado
  AeVeRecurso(id_recursoservicio: number){
    let ruta = this.router.url + '/' + id_recursoservicio
    this.router.navigate([ruta]);
  }

  //Función que nos permite ir a la página donde podremos editar los datos del recurso
  AeEditaRecurso(id_recursoservicio: number){
    let ruta = this.router.url + '/' + id_recursoservicio + '/editar'
    this.router.navigate([ruta]);
  }

  //Función que nos permite ir a la página donde podremos añadir un nuevo recurso
  AeAnidadeRecurso(){
    let ruta = this.router.url + '/aniade'
    this.router.navigate([ruta]);
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la pantalla inicial del perfil del administrador de la empresa
  volver(){
    let ruta = '/reservas/admi_empresa/' + this.admi
    this.router.navigate([ruta])
  }
}
