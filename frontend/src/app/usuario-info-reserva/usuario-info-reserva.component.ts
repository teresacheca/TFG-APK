import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva} from 'src/app/modelos/Reservas';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-info-reserva',
  templateUrl: './usuario-info-reserva.component.html',
  styleUrls: ['./usuario-info-reserva.component.css']
})
export class UsuarioInfoReservaComponent {

  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Objeto de tipo reserva donde guardaremos los datos de la reserva con el que estamos operando
  reserva: Reserva = {
    fecha: '',
    hora: '',
    nombre_empresa: '', 
    nombre_usuario: '',
    nombre_rs: '',
    id_reserva: 0,
    id_recursoservicio: 0,
    id_empresa: 0
  }

  //Inicialización de las variables que usaremos para el resto del código
  empresa: number = 0
  usuario: string = ''
  id: number = 0
  aux: any= []
  mia = false
  fecha: any
  
  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_emrpesa"]
    this.usuario = params["nombre_usuario"]
    this.id = params["id_reserva"]
    
    //Obtenemos la reserva a partir del identificador de la reserva usando la función getReservaIdUsu
    //necesitaremos el nombre del administrador y el identificador de la empresa para poder acceder a la url correspondiente
    this.reservasServices.getReservaIdUsu(this.usuario, this.id).subscribe(
      res =>{
        //Copiamos todos los datos que nos devuelve la función en el objeto reserva
        this.aux = res
        this.reserva.fecha = this.aux[0].fecha
        //Guardamos la fecha de la reserva con el formato que mejor nos convenga
        this.fecha = moment(this.reserva.fecha).format('YYYY-MM-DD')
        this.reserva.hora = this.aux[0].hora
        this.reserva.nombre_empresa = this.aux[0].nombre_empresa
        this.reserva.nombre_usuario = this.aux[0].nombre_usuario
        this.reserva.nombre_rs = this.aux[0].nombre_rs
        this.reserva.id_recursoservicio = this.aux[0].id_recursoservicio
        this.reserva.id_empresa = this.aux[0].id_empresa
        //Comprobamos si la reserva pertenece al usuario que la está viendo o a otro usuario
        if (this.reserva.nombre_usuario == this.usuario){
          this.mia = true
        }
      },
      err => console.error(err)
    );
  }

  //Función que mos permite movernos a la página donde podremos editar los datos de la reserva
  editarReserva(){
    let ruta = this.router.url + '/editar'
    this.router.navigate([ruta])
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que muestra la lista de reservas
  volver(tipo: number = 0){
    
    //Si estamo viendo todas las reservas, volveremos a la página que nos muestra todas las reservas
    //si el usuario está viendo sólo sus reservas, volverá a la página que le muestra sólo sus reservas
    let ruta = ""
    if(tipo == 0){
      ruta = '/reservas/usuario/' + this.usuario + '/reservas'
    }else{
      ruta = '/reservas/usuario/' + this.usuario + '/todas_reservas'
    }
      
    this.router.navigate([ruta])
  }
}
