import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { Usuario } from 'src/app/modelos/Usuarios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admi-general',
  templateUrl: './admi-general.component.html',
  styleUrls: ['./admi-general.component.css']
})
export class AdmiGeneralComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute ){}

  //Objeto de tipo usuario donde guardaremos los datos del usuario con el que estamos operando
  admi_general: Usuario = {
    nombre_usuario: '',
    contrasena: '',
    tipo: 0,
    id: 0,
    empresa: '',
    foto: "",
    id_empresa: 0
  }

  empresas: any = []
  nombre_admi: string = ""
  aux: any = []

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]

    //Comprobamos que el usuario haya iniciado sesión
    this.reservaServices.getLogin(params["nombre_usuario"], params["contrasena"]).subscribe(
      res => {
        //Guardamos los datos que nos interesan del usuario
        this.admi_general.nombre_usuario = params["nombre_usuario"]
        this.admi_general.contrasena = params["contrasena"]
        this.admi_general.id = params["id"]
        this.admi_general.empresa = params["empresa"]
        //Obtenemos todos los datos del usuario para poder operar con estos a partir de su nombre
        this.reservaServices.getUsuarioNombre(this.admi_general.nombre_usuario).subscribe(
          res => {
            //Copiamos todos los datos que nos devuelve la función en un objeto de tipo usuario que hemos llamado admi_general
            this.aux = res
            this.admi_general.nombre_usuario = this.aux[0].nombre_usuario
            this.admi_general.contrasena = this.aux[0].contrasena
            this.admi_general.tipo = this.aux[0].tipo
            this.admi_general.fecha_nacimiento = this.aux[0].fecha_nacimiento
            this.admi_general.puesto_trabajo = this.aux[0].puesto_trabajo
            this.admi_general.empresa = this.aux[0].empresa
            this.admi_general.id = this.aux[0].id
            this.admi_general.foto = this.aux[0].foto
          },
          err=> console.error(err)
        )
      },
      err=> console.error(err)
    )
    
  }

  //Función que nos lleva a la ruta que nos muestra la lista de las empresas dadas ya de alta en la aplicación
  mostrarEmpresas(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas'
    this.router.navigate([ruta]);
  }

  //Función que nos lleva a la ruta que nos muestra la lista de todas las solicitudes
  mostrarSolicitudes(){
    let ruta = '/reservas/' + this.nombre_admi + '/lista_solicitudes'
    this.router.navigate([ruta]);
  }

  
}
