import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva} from 'src/app/modelos/Reservas';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-edita-reserva',
  templateUrl: './usuario-edita-reserva.component.html',
  styleUrls: ['./usuario-edita-reserva.component.css']
})
export class UsuarioEditaReservaComponent {

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

  //Resto de variables que usaremos en el código
  empresa: number = 0
  usuario: string = ''
  id: number = 0
  aux: any= []
  fecha: any
  id_reserva: number = 0
  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.usuario = params["nombre_usuario"]
    this.id = params["id_reserva"]

    //Obtenemos los datos de la reserva que editar a partir de su identificador
    //Necesitamos el nombre del usuario y el identificador de la empresa para llamarlo en la url
    this.reservasServices.getReservaIdUsu(this.usuario, this.id).subscribe(
      res =>{
        //Guardamos los datos obtenidos en reserva
        this.aux = res
        this.reserva.fecha = this.aux[0].fecha
        //Creamos una variable fecha con el formato que deseamos para que no nos de problemas el formato al modificarla
        this.fecha = moment(this.reserva.fecha).format('YYYY-MM-DD')
        this.reserva.hora = this.aux[0].hora
        this.reserva.nombre_empresa = this.aux[0].nombre_empresa
        this.reserva.nombre_usuario = this.aux[0].nombre_usuario
        this.reserva.nombre_rs = this.aux[0].nombre_rs
        this.reserva.id_reserva = this.aux[0].id_reserva
        this.reserva.id_recursoservicio = this.aux[0].id_recursoservicio
        this.reserva.id_empresa = this.aux[0].id_empresa
        this.id_reserva = this.reserva.id_reserva
      },
      err => console.error(err)
    );
  }

  //Función que guarda los datos modificados de la reserva
  guardaCambiosReservaUsu(id_reserva: number, nuevaReserva: Reserva, fecha:string){
    const faux = new Date(fecha)
   
    //Cogemos la fecha y la modificamos para que esté en el formato que queremos
    var straux = faux.toString();
    var mes_str_aux = straux.substring(4,7);
    var mesAux = ''
 
    //Añadimos el número del mes en función de las letras que leemos
    switch(mes_str_aux){
      case 'Jan':{
        mesAux = '01';
        break;
      }
      case 'Feb':{
        mesAux = '02';
        break;
      }
      case 'Mar':{
        mesAux = '03';
        break;
      }
      case 'Apr':{
        mesAux = '04';
        break;
      }
      case 'May':{
        mesAux = '05';
        break;
      }
      case 'Jun':{
        mesAux = '06';
        break;
      }
      case 'Jul':{
        mesAux = '07';
        break;
      }
      case 'Aug':{
        mesAux = '08';
        break;
      }
      case 'Sep':{
        mesAux = '09';
        break;
      }
      case 'Oct':{
        mesAux = '10';
        break;
      }
      case 'Nov':{
        mesAux = '11';
        break;
      }
      case 'Dec':{
        mesAux = '12';
        break;
      }
    }
    
    //Creamos una variable con la fecha en el formato que queremos
    var diaAux = straux.substring(8,10);
    var anioAux = straux.substring(11,15);
    var fechaAuxiliar = anioAux + '-' + mesAux + '-' + diaAux;

    let existe = false
    let coincide = false
    //Comprobamos que si se ha modificado el recurso, que este existe 
    this.reservasServices.getRecursos(this.usuario, this.reserva.id_empresa).subscribe(
      res =>{
        this.aux = res
        //Comparamos el nombre del nuevo recurso con el de todos los recursos de la emrpesa
        for(let i=0; i<this.aux.length; i++){
          if(nuevaReserva.nombre_rs == this.aux[i].nombre_rs){
            existe = true
          }
        }
        //Si el recurso no existe mostramos un mensaje de error
        if(existe == false){
          confirm("El recurso no existe");
        }else{
          //En caso contrario, obtenemos todas las reservas de la empresa para comprobar que no coincide con la que estamoa haciendo
          this.reservasServices.getReservasEmpresa(this.usuario, this.reserva.id_empresa).subscribe(
            res =>{
              this.aux = res
              //Cogemos todas las reservas y cambiamos el formato de la fecha al que nos interesa
              for(let i=0; i<this.aux.length; i++){
                var x = this.aux[i].fecha.toString().substring(0,10);
                const x2 = new Date(x)
               
                x2.setDate(x2.getDate()+1)

                var str = x2.toString();
                var mes_str = str.substring(4,7);
                var mes = '';
              
                switch(mes_str){
                  case 'Jan':{
                    mes = '01';
                    break;
                  }
                  case 'Feb':{
                    mes = '02';
                    break;
                  }
                  case 'Mar':{
                    mes = '03';
                    break;
                  }
                  case 'Apr':{
                    mes = '04';
                    break;
                  }
                  case 'May':{
                    mes = '05';
                    break;
                  }
                  case 'Jun':{
                    mes = '06';
                    break;
                  }
                  case 'Jul':{
                    mes = '07';
                    break;
                  }
                  case 'Aug':{
                    mes = '08';
                    break;
                  }
                  case 'Sep':{
                    mes = '09';
                    break;
                  }
                  case 'Oct':{
                    mes = '10';
                    break;
                  }
                  case 'Nov':{
                    mes = '11';
                    break;
                  }
                  case 'Dec':{
                    mes = '12';
                    break;
                  }
                }

                
                var dia = str.substring(8,10);
                var anio = str.substring(11,15);

                var nueva_fechax = anio + '-' + mes + '-' + dia;
                //Comprobamos si la nueva reserva coincide con alguna ya creada
                if(nuevaReserva.nombre_rs == this.aux[i].nombre_rs && fechaAuxiliar == nueva_fechax && nuevaReserva.hora == this.aux[i].hora  && this.aux[i].id_reserva != nuevaReserva.id_reserva ){
                  coincide = true
                }
              }
              //Si coincide mostramos un mensaje de erro ya que no puede haber dos reservas a la vez
              if(coincide){
                confirm("Ya existe una reserva en ese momento para dicho recurso");
              }else{
                //En caso contrario, guardamos los cambios de la reserva con la funcion "guardaCambiosReservaUsu"
                nuevaReserva.fecha = fechaAuxiliar
                this.reservasServices.guardaCambiosReservaUsu(this.usuario, id_reserva, nuevaReserva).subscribe(
                  res => {
                    //Por último nos movemos a la página que contiene la lista de las reservas
                    let ruta = '/reservas/usuario/' + this.usuario + '/reservas'
                    this.router.navigate([ruta]);
                  },
                  err=> console.error(err)
                )
                
              }
            },
            err => console.error(err)
          );          
        }
      },
      err => console.error(err)
    );

    
  }

  //Función que elimina la instacia de la reserva de la base de datos
  eliminaReservaUsu(id_reserva: number){
    //Eliminamos la función de la base de datos
    this.reservasServices.eliminaReservaUsu(this.usuario, id_reserva).subscribe(
      res => {
        //Por último nos movemos a la página que muestra la lista de las reservas
        let ruta = '/reservas/usuario/' + this.usuario + '/reservas'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la lista de las reservas
  volver(){
    let ruta = '/reservas/usuario/' + this.usuario + '/reservas'
    this.router.navigate([ruta])
  }
}
