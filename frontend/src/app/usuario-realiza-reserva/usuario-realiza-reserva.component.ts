import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuarios';

@Component({
  selector: 'app-usuario-realiza-reserva',
  templateUrl: './usuario-realiza-reserva.component.html',
  styleUrls: ['./usuario-realiza-reserva.component.css']
})
export class UsuarioRealizaReservaComponent {

  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Objeto de tipo usuario donde guardaremos los datos del usuario con el que estamos operando
  usuario: Usuario = {
    nombre_usuario: '',
    contrasena: '',
    tipo: 2,
    id: 0,
    empresa: '',
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    foto: "",
    id_empresa: 0
  }

  //Cogemos los parámetros que se leen en la url
  aux: any = []
  recursos: any = []

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.usuario.nombre_usuario = params["nombre_usuario"]

    //Obtenemos los datos del usuario con la siguiente función a partir de su nombre de usuario
    this.reservasServices.getUsuario(params["nombre_usuario"]).subscribe(
      res =>{
        //Guardamos los datos del usuario
        this.aux = res
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.id = this.aux[0].id
        this.usuario.empresa = this.aux[0].empresa   
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo 
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento   
        this.usuario.id_empresa = this.aux[0].id_empresa
        this.usuario.foto = this.aux[0].foto
        //Llamamos a la función que nos devolverá todas los recursos de la empresa del usuario
        this.getRecursos(this.usuario.nombre_usuario)
      },
      err => console.error(err)
    );
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la pantalla inicial del perfil del usuario
  volver(){
    let ruta =  '/reservas/usuario/' + this.usuario.nombre_usuario
    this.router.navigate([ruta])
  }

  //Función que nos devuelve todos los recursos de la empresa del usuario
  getRecursos(nombre_usuario: string){
    this.reservasServices.getRecursos(nombre_usuario, this.usuario.id_empresa).subscribe(
      res =>{
        //Guardamos los datos de los recursos
        this.recursos = res
      },
      err => console.error(err)
    );
  }

  //Función que nos permite movernos a la página que donde el usuario puede hacer una reserva del recurso seleccionada
  reservarRecurso(id_recursoservicio: number){
    let ruta = this.router.url + '/recurso/' + id_recursoservicio
    this.router.navigate([ruta])
  }
}
