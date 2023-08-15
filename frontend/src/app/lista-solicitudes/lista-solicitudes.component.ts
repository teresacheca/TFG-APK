import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Variables que usaremos en el resto del código
  solicitudes: any = []
  aceptadas: any = []
  rechazadas: any = []
  pendientes: any = []
  vacioAceptadas = false
  vacioRechazadas = false
  vacioPendientes= false
  vacio = false
  nombre_admi: string = ""

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]

    //Obtenemos todas las solicitudes aceptadas de las empresas con la función "getSolicitudesAceptadas"
    //necesitaremos el nombre del administrador para poder acceder a la url correspondiente
    this.reservaServices.getSolicitudesAceptadas(this.nombre_admi).subscribe(
      res =>{
        //Guardamos las solicitudes aceptadas en el vector "aceptadas"
        this.aceptadas = res;
        //Si este esta vacío es porque no hay solicitudes aceptadas y por tanto indicaremos que el vector está vacío
        if(this.aceptadas.length == 0){
          this.vacioAceptadas = true
        }
      },
      err => console.error(err)
    );

    //Obtenemos todas las solicitudes rechazadas de las empresas con la función "getSolicitudesRechazadas"
    //necesitaremos el nombre del administrador para poder acceder a la url correspondiente
    this.reservaServices.getSolicitudesRechazadas(this.nombre_admi).subscribe(
      res =>{
        //Guardamos las solicitudes aceptadas en el vector "rechazadas"
        this.rechazadas = res;
        //Si este esta vacío es porque no hay solicitudes rechazadas y por tanto indicaremos que el vector está vacío
        if(this.rechazadas.length == 0){
          this.vacioRechazadas = true
        }
        
      },
      err => console.error(err)
    );

    //Obtenemos todas las solicitudes pendientes de las empresas con la función "getSolicitudesPendientes"
    //necesitaremos el nombre del administrador para poder acceder a la url correspondiente
    this.reservaServices.getSolicitudesPendientes(this.nombre_admi).subscribe(
      res =>{
        //Guardamos las solicitudes pendientes en el vector "rechazadas"
        this.pendientes = res;
        //Si este esta vacío es porque no hay solicitudes pendientes y por tanto indicaremos que el vector está vacío
        if(this.pendientes.length == 0){
          this.vacioPendientes = true
        }
      },
      err => console.error(err)
    );
    
  }

  //Función que nos permite ir a la página donde podremos ver los datos de la solicitud
  verSolicitud(id: number){
    let ruta = this.router.url + '/' + id
    this.router.navigate([ruta]);
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la pantalla inicial del perfil del administrador general
  volver(){
    let ruta = "reservas/admi_general/" + this.nombre_admi
    this.router.navigate([ruta])
  }
  
}
