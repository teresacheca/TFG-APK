import { Component } from '@angular/core';
import { Empresa} from '../modelos/Empresas';
import {Solicitud} from '../modelos/Solicitud';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Objeto de tipo empresa donde guardaremos los datos de la empresa con el que estamos operando
  empresa: Empresa={
    nombre_empresa: '',
    datos_de_contacto: '',
    descripcion: '',
    logo: '',
    direccion: '',
    id_empresa: 0
  }

  //Objeto de tipo solicitud donde guardaremos los datos de la solicitud con el que estamos operando
  solicitud: Solicitud={
    nombre_empresa: '',
    datos_de_contacto: '',
    descripcion: '',
    logo: '',
    direccion: '',
    id_empresa: 0,
    estado: '',
    id_solicitud: '',
    nombre_usuario: ''
  }

  //Inicializamos el resto de variables que usaremos
  pendiente = false
  nombre_admi: string = ""
  aux: any = {  }

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]

    //Obtenemos todo los datos de la solicitud a partir de su identificador
    //También necesitaremos el nombre del usuario para acceder a la url correspondiente
    this.reservaServices.getSolicitud(params["nombre_usuario"], params["id_solicitud"]).subscribe(
      res => {
        //Guardamos los datos de la empresa
        this.aux = res
        this.empresa.nombre_empresa = this.aux[0].nombre_empresa
        this.empresa.datos_de_contacto = this.aux[0].datos_de_contacto
        this.empresa.descripcion = this.aux[0].descripcion
        this.empresa.logo = this.aux[0].logo
        this.empresa.direccion = this.aux[0].direccion
        this.empresa.id_empresa = this.aux[0].id_empresa

        //Guardamos los datos de la solicitud de la empresa
        this.solicitud.nombre_empresa = this.aux[0].nombre_empresa
        this.solicitud.datos_de_contacto = this.aux[0].datos_de_contacto
        this.solicitud.descripcion = this.aux[0].descripcion
        this.solicitud.logo = this.aux[0].logo
        this.solicitud.direccion = this.aux[0].direccion
        this.solicitud.id_empresa = this.aux[0].id_empresa
        this.solicitud.estado = this.aux[0].estado
        this.solicitud.id_solicitud = this.aux[0].id_solicitud
        this.solicitud.nombre_usuario = this.aux[0].nombre_usuario
        //Establecemos que está en estado pendiente
        if(this.solicitud.estado == 'Pendiente'){
          this.pendiente = true
        }

      },
      err=> console.error(err)
    )
      
  }
  
  //Función a la que llamamos cuando aceptamos la solicitud,
  //esta crea una nueva instancia de la empresa y modifica la solicitud poniéndole de estado "aceptada"
  aceptarSolicitud(){
    //Creamos la nueva empresa
    this.reservaServices.nuevaEmpresa(this.nombre_admi, this.aux[0].id_solicitud, this.empresa.nombre_empresa, this.empresa).subscribe(
      res => {
        //Modificamos el estado de la solicitud
        this.solicitud.estado = 'Aceptada'
        this.reservaServices.actualizarSolicitud(this.nombre_admi,this.aux[0].id_solicitud, this.solicitud).subscribe( //borrar la solicitud cunado se ejecuta una accion
          res => {
            //Nos movemos a la página que nos muestra la lista de las solicitudes
            let ruta = '/reservas/' + this.nombre_admi + '/lista_solicitudes'
            this.router.navigate([ruta]);
          },
          err=> console.error(err)
        )
      },
      err=> console.error(err)
    )
  }

  //Función a la que llamamos cuando rechazamos la solicitud,
  //esta modifica la solicitud poniéndole de estado "aceptada"
  rechazarSolicitud(){
    this.solicitud.estado = 'rechazada'
        this.reservaServices.actualizarSolicitud(this.nombre_admi,this.aux[0].id_solicitud, this.solicitud).subscribe(
      res => {
        //Nos movemos a la página que nos muestra la lista de solicitudes
        let ruta = '/reservas/' + this.nombre_admi + '/lista_solicitudes'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }
  

  volver(){
    let ruta = '/reservas/' + this.nombre_admi + '/lista_solicitudes'
    this.router.navigate([ruta])
  }
}
