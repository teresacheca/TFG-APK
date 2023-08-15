import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva} from 'src/app/modelos/Reservas';
import * as moment from 'moment';

@Component({
  selector: 'app-ae-ve-reserva',
  templateUrl: './ae-ve-reserva.component.html',
  styleUrls: ['./ae-ve-reserva.component.css']
})
export class AeVeReservaComponent {
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
  nombre_admi: string = ''
  id: number = 0
  aux: any= []
  fecha: string = ""

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
    this.id = params["id_reserva"]
    
    //Obtenemos la reserva a partir del identificador de la reserva usando la función getReservaId
    //necesitaremos el nombre del administrador y el identificador de la empresa para poder acceder a la url correspondiente
    this.reservasServices.getReservaId(this.nombre_admi, this.empresa, this.id).subscribe(
      res =>{
        //Copiamos todos los datos que nos devuelve la función en el objeto reserva
        this.aux = res
        this.reserva.fecha = this.aux[0].fecha
        this.reserva.hora = this.aux[0].hora
        this.reserva.nombre_empresa = this.aux[0].nombre_empresa
        this.reserva.nombre_usuario = this.aux[0].nombre_usuario
        this.reserva.nombre_rs = this.aux[0].nombre_rs
        this.reserva.id_recursoservicio = this.aux[0].id_recursoservicio
        this.reserva.id_empresa = this.aux[0].id_empresa

        //Guardamos la fecha de la reserva con el formato que mejor nos convenga
        this.fecha = moment(this.reserva.fecha).format('YYYY-MM-DD')

      },
      err => console.error(err)
    );
  }

  //Función que mos permite movernos a la página donde podremos editar los datos de la reserva
  editarReserva(){
    let ruta = this.router.url + '/editar'
    this.router.navigate([ruta])
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que muestra la lista de reservas de la empresa
  volver(){
    let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' +  this.empresa + '/lista_reservas'
    this.router.navigate([ruta])
  }
}
