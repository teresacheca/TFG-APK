import { Component } from '@angular/core';
import { Usuario} from '../modelos/Usuarios';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-ag-ve-usuario',
  templateUrl: './ag-ve-usuario.component.html',
  styleUrls: ['./ag-ve-usuario.component.css']
})
export class AgVeUsuarioComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Objeto de tipo usuario donde guardaremos los datos del usuario con el que estamos operando
  usuario: Usuario={
    nombre_usuario: '',
    contrasena: '',
    tipo: 1,
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    empresa: '',
    id: 0,
    foto: "",
    id_empresa: 0
  }

  //Inicializamos el resto de variables que usaremos
  empresa: number = 0
  fecha_nacimiento: string = ""
  nombre_admi: string = ""
  aux: any = {  }

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
    
    //Obtenemos la información del usuario a partir su identificador usando la función getUsuarioId
    //necesitaremos el nombre del administrador y el identificador de la empresa para poder acceder a la url correspondiente
    this.reservaServices.getUsuarioId(params["nombre_usuario"], this.empresa, params["id"] ).subscribe(
      res => {
       //Copiamos todos los datos que nos devuelve la función en el objeto usuario
        this.aux = res
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo
        this.usuario.empresa = this.aux[0].empresa
        this.usuario.id = this.aux[0].id
        this.usuario.foto = this.aux[0].foto
        //Guardamos la fecha de la reserva con el formato que mejor nos convenga
        this.fecha_nacimiento = moment(this.usuario.fecha_nacimiento).format('YYYY-MM-DD')
      },
      err=> console.error(err)
    )
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que muestra la lista de reservas de la empresa
  volver(){
    console.log(this.empresa)
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/'+ this.empresa + '/lista_usuarios'
    this.router.navigate([ruta])
  }

}
