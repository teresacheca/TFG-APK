import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { Usuario } from 'src/app/modelos/Usuarios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admi-empresa',
  templateUrl: './admi-empresa.component.html',
  styleUrls: ['./admi-empresa.component.css']
})
export class AdmiEmpresaComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute ){}

  //Objeto de tipo usuario donde guardaremos los datos del usuario con el que estamos operando
  admi_empresa: Usuario = {
    nombre_usuario: '',
    contrasena: '',
    tipo: 1,
    empresa: '',
    id: 0,
    foto: "",
    id_empresa: 0
  }
  aux: any = {}


  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    
    //Comprobamos que el usuario haya iniciado sesión
    this.reservaServices.getLogin(params["nombre_usuario"], params["contrasena"]).subscribe(
      res => {
        //Guardamos los datos que nos interesan del usuario
        this.admi_empresa.nombre_usuario = params["nombre_usuario"]
        this.admi_empresa.contrasena = params["contrasena"]
        this.admi_empresa.id_empresa = params["id_empresa"]
        //Obtenemos todos los datos del usuario para poder operar con estos a partir de su nombre
        this.reservaServices.getUsuarioNombre(this.admi_empresa.nombre_usuario).subscribe(
          res => {
            //Copiamos todos los datos que nos devuelve la función en un objeto de tipo usuario que hemos llamado admi_empresa
            this.aux = res
            this.admi_empresa.nombre_usuario = this.aux[0].nombre_usuario
            this.admi_empresa.contrasena = this.aux[0].contrasena
            this.admi_empresa.tipo = this.aux[0].tipo
            this.admi_empresa.fecha_nacimiento = this.aux[0].fecha_nacimiento
            this.admi_empresa.puesto_trabajo = this.aux[0].puesto_trabajo
            this.admi_empresa.empresa = this.aux[0].empresa
            this.admi_empresa.id = this.aux[0].id
            this.admi_empresa.id_empresa = this.aux[0].id_empresa
            this.admi_empresa.foto = this.aux[0].foto

          },
          err=> console.error(err)
        )
      },
      err=> console.error(err)
    )
    
  }

  //Función que nos lleva a la ruta para editar el perfil del administrador de la empresa
  editarPerfil(){
    let ruta = this.router.url + '/editar'
    this.router.navigate([ruta])
  }

  //Función que nos lleva a la ruta que nos muestra la lista de usuarios de la empresa 
  verUsuarios(){
    let ruta = this.router.url + '/' + this.admi_empresa.id_empresa + '/lista_usuarios'
    this.router.navigate([ruta])
  }

  //Función que nos lleva a la ruta que nos muestra la lista de recursos y servicios que hay en la empresa
  verListaRecurosAe(){
    let ruta = this.router.url + '/' + this.admi_empresa.id_empresa + '/lista_recursos'
    this.router.navigate([ruta])
  }

  //Función que nos lleva a la ruta que nos muestra la lista de reservas que han hecho los usuarios de la empresa
  verReservasAe(){
    let ruta = this.router.url + '/' + this.admi_empresa.id_empresa + '/lista_reservas'
    this.router.navigate([ruta])
  }

  
}