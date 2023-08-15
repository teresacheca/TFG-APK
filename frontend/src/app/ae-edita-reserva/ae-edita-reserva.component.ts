import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva} from 'src/app/modelos/Reservas';
import * as moment from 'moment';

@Component({
  selector: 'app-ae-edita-reserva',
  templateUrl: './ae-edita-reserva.component.html',
  styleUrls: ['./ae-edita-reserva.component.css']
})
export class AeEditaReservaComponent {

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
  nombre_admi: string = ''
  id: number = 0
  aux: any= []
  fecha: string = ""
  nombre_recurso: string = ""

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
    this.id = params["id_reserva"]
    
    //Obtenemos los datos de la reserva que editar a partir de su identificador
    //Necesitamos el nombre del administrador y el identificador de la empresa para llamarlo en la url
    this.reservasServices.getReservaId(this.nombre_admi, this.empresa, this.id).subscribe(
      res =>{
        //Guardamos los datos obtenidos en reserva
        this.aux = res
        this.reserva.fecha = this.aux[0].fecha
        this.reserva.hora = this.aux[0].hora
        this.reserva.nombre_empresa = this.aux[0].nombre_empresa
        this.reserva.nombre_usuario = this.aux[0].nombre_usuario
        this.reserva.nombre_rs = this.aux[0].nombre_rs
        this.reserva.id_reserva = this.aux[0].id_reserva
        this.reserva.id_recursoservicio = this.aux[0].id_recursoservicio
        this.reserva.id_empresa = this.aux[0].id_empresa
        //Creamos una variable fecha con el formato que deseamos para que no nos de problemas el formato al modificarla
        this.fecha = moment(this.reserva.fecha).format('YYYY-MM-DD')

      },
      err => console.error(err)
    );
  }

  //Función que guarda los datos modificados de la reserva
  AeguardaCambiosReserva(id_reserva: number, nuevaReserva: Reserva, fecha: string){
    nuevaReserva.fecha = fecha

    //Primero tenemos que comprobar que el nombre modificado del usuario que ha hecho la reserva 
    //pertenece a un usuario que existe, por lo que llamamos a la función que nos devuelve los datos 
    //del usuario en función de su nombre
    this.reservasServices.getUsuarioNombre(nuevaReserva.nombre_usuario).subscribe(
      res => {
        this.aux = res
        //Si no nos devuelve nada, entendemos que no existe ese usuario y mostramos un mensaje de error
        if(this.aux.length == 0){
          confirm("Ese usuario no existe")
        }else{
          //En caso contrario, comprobamos que el usuario perteneca a la misma empresa que el recurso, si no, mostramos un mensaje de error
          if(this.aux[0].id_empresa != nuevaReserva.id_empresa){
            confirm("El usuario no pertenece a esta empresa")
          }else{
            //En caso contrario, comprobamos que el nombre del recurso existe en la empresa
            this.reservasServices.getRecursos(this.nombre_admi, this.empresa).subscribe(
              res => {
                this.aux = res
                let encontrado = false
                for(const nombre of this.aux){
                  if(nombre.nombre_rs == nuevaReserva.nombre_rs){
                    encontrado = true
                  }
                }

                //Si el recurso no existe, mostramos un mensaje de error
                if(encontrado == false){
                  confirm("El recurso no existe");
                }else{
                  //En caso contrario, ya hemos comprobado todo, y podremos actualizar los datos de la reserva
                  this.reservasServices.AeguardaCambiosReserva(this.nombre_admi, this.empresa, id_reserva, nuevaReserva).subscribe(
                    res => {
                      //Por último, nos movemos a la página que nos muestra las listas de las reservas
                      let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_reservas'
                      this.router.navigate([ruta]);
                    },
                    err=> console.error(err)
                  )
                }
              },
              err=> console.error(err)
            )
          }
          
        }
      },
      err=> console.error(err)
    )
    
  }

  //Función que llama a la función para borrar la instancia de la reserva
  AeEliminaReserva(id_reserva: number){
    //Borramos la reserva de la base de datos
    this.reservasServices.AeEliminaReserva(this.nombre_admi, this.empresa, id_reserva).subscribe(
      res => {
        //Nos movemos a la página que muestra la lista de las reservas
        let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_reservas'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }
  
  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la lista de las reservas de la empresa
  volver(){
    let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' +  this.empresa + '/lista_reservas'
    this.router.navigate([ruta])
  }

}
