import { Component } from '@angular/core';
import { Recurso} from '../modelos/Recursos';
import { Reserva} from '../modelos/Reservas';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ae-edita-recurso',
  templateUrl: './ae-edita-recurso.component.html',
  styleUrls: ['./ae-edita-recurso.component.css']
})
export class AeEditaRecursoComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Objeto de tipo recurso donde guardaremos los datos del recurso con el que estamos operando
  recurso: Recurso = {
    nombre_rs: '',
    descripcion: '',
    foto: '',
    datos: '',
    aforo: 0,
    nombre_empresa: '',
    id_recursoservicio: 0,
    id_empresa: 0
  }

  //Resto de variables que usaremos en el código
  empresa: number = 0
  admi: string = ''
  id: number = 0
  aux: any
  selectedFile: File | null = null;
  nombre_recurso: string = ""

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.admi = params["nombre_usuario"]
    this.id = params["id_recursoservicio"]

    //Obtenemos los datos del recurso que editar a partir de su identificador
    //Necesitamos el nombre del administrador y de la empresa para llamarlo en la url
    this.reservaServices.getDatosRecursoAe(this.admi, this.empresa, this.id).subscribe(
      res =>{
        //Guardamos los datos obtenidos en recurso
        this.aux = res
        this.recurso.nombre_rs = this.aux[0].nombre_rs
        this.recurso.descripcion = this.aux[0].descripcion
        this.recurso.foto = this.aux[0].foto
        this.recurso.datos = this.aux[0].datos
        this.recurso.aforo = this.aux[0].aforo
        this.recurso.nombre_empresa = this.aux[0].nombre_empresa
        this.recurso.id_recursoservicio = this.aux[0].id_recursoservicio
        this.recurso.id_empresa = this.aux[0].id_empresa
        //Guardamos a parte el nombre del recurso para saber el antiguo nombre si este se modifica
        this.nombre_recurso = this.recurso.nombre_rs
      },
      err => console.error(err)
    );
    
  }

  //Función que llama a la función para borrar la instancia del recurso
  eliminarRescursoAe(id_recursoservicio: number){
    //Antes de elimiar la instancia del recurso tenemos que eliminar todas las reservas que haya de este
    
    //Obtenemos todas las reservas que haya en la empresa
    this.reservaServices.getReservasAe(this.admi, this.empresa).subscribe(
      res => {
        this.aux = res
        //Creamos un vector de reservas que contendrá sólo las reservas del recurso que vamos a eliminar
        let reservas = []
        //Copiamos las resservas que son del recurso que vamos a eliminar en el vector reservas (fijándonos en su identificador)
        for(const reserva of this.aux){
          if (reserva.nombre_rs == this.nombre_recurso){
            reservas.push(reserva)
          }
        }
        //Recorremos el vector reservas y vamos borrando todas las reservas una por una
        for(const reserva of reservas){
          this.reservaServices.eliminarReservas(this.admi, this.empresa, reserva.id_reserva ).subscribe(
            res => {
              //No hacemos nada cuando se borran
            },
            err=> console.error(err)
          )
        }
        //Cuando hemos borrado todas las reservas, borramos la instancia del recurso de la base de datos
        this.reservaServices.eliminarRescursoAe(this.admi, this.empresa, id_recursoservicio).subscribe(
          res => {
            //Po último nos movemos a la página que nos muestra todos los recursos de la empresa
            let ruta = '/reservas/admi_empresa/' + this.admi + '/' + this.empresa + '/lista_recursos'
            this.router.navigate([ruta]);
          },
          err=> console.error(err)
        )
        
      },
      err=> console.error(err)
    )
  }
  
  //Función que guarda los datos modificados del recurso
  guardarCambiosRecursoAe(id_recursoservicio: number, recurso: Recurso){

    //Primero comprobamos que el nombre del recurso no coincida con el nombre de otro recurso (exceptiuando el suyo)

    //Para ello, obtenemos ltodos los recursos de la empresa
    this.reservaServices.getRecursos(this.admi, this.empresa).subscribe(
      res => {
        this.aux = res
        let encontrado = false
        //Comprobamos todos los nombre de los recursos para ver si alguno coincide (exceptuando que sea igual a su nombre anterior, es decir, que no se ha modificado el nombre)
        for(const nombre of this.aux){
          if(nombre.nombre_rs == recurso.nombre_rs && this.nombre_recurso != recurso.nombre_rs){
            encontrado = true
          }
        }
        //Si alguno coincide, mostramos un mensaje de error
        if(encontrado){
          confirm("Ya existe un recurso o servicio con ese nombre en la empresa");
        }else{
          //Si no, guardamos los cambios modificados del recurso

          //Antes de guardar los cambios, tendremos que modificar todas las reservas ya creadas de este recurso
          //siempre que se le haya cmabiado el nombre ya el resto de información no afecta a la reserva
          //Por ello, primero comprobamos si se ha modificado el nombre del recurso
          if(this.nombre_recurso != recurso.nombre_rs){
            //Luego obtenemos todas las reservas que haya en la empresa
            this.reservaServices.getReservasAe(this.admi, this.empresa).subscribe(
              res => {
                this.aux = res
                //Creamos un vector de reservas que contendrá sólo las reservas del recurso que vamos a eliminar
                let reservas = []
                //Copiamos las resservas que son del recurso que vamos a eliminar en el vector reservas (fijándonos en su identificador)
                for(const reserva of this.aux){
                  if (reserva.nombre_rs == this.nombre_recurso){
                    reservas.push(reserva)
                  }
                }
                //Recorremos el vector reservas y creamos una nueva reserva que tendrá 
                //los datos de la reserva anterior pero con el nombre del recurso modificado
                
                for(const reserva of reservas){
                  let nuevaReserva: Reserva = {
                    fecha: reserva.fecha,
                    hora: reserva.hora,
                    nombre_empresa: reserva.nombre_empresa, 
                    nombre_usuario: reserva.nombre_usuario,
                    nombre_rs: recurso.nombre_rs,
                    id_reserva: reserva.id_reserva,
                    id_recursoservicio: reserva.id_recursoservicio,
                    id_empresa: reserva.id_empresa
                  }
                  //Llamamos a la función que actualiza los datos de la reserva dándole el identificador de la reserva (que nunca varía)
                  //y los datos de la nueva reserva (también necesitamos el nombre del administrador y el identificador de la empresa, para poder usar la url correspondiente)
                  this.reservaServices.actualizarReserva(this.admi, this.empresa, reserva.id_reserva, nuevaReserva ).subscribe(
                    res => {
                      //No hacemos nada cuando se actualiza
                    },
                    err=> console.error(err)
                  )
                }
                
              },
              err=> console.error(err)
            )
          }
          //Una vez hayamos actualizados todas las reservas que tenía el recurso, actualizamos los datos del recurso
          this.reservaServices.guardarCambiosRecursoAe(this.admi, this.empresa, id_recursoservicio, recurso).subscribe(
            res => {
              //Por último nos movemos a la página que nos muestra la lista de recursos
              let ruta = '/reservas/admi_empresa/' + this.admi + '/' + this.empresa + '/lista_recursos'
              this.router.navigate([ruta]);
            },
            err=> console.error(err)
          )
        }
      },
      err=> console.error(err)
    )
   
  }


  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la lista de los recurso de la empresa
  volver(){
    let ruta = '/reservas/admi_empresa/' + this.admi + '/' + this.empresa + '/lista_recursos'
    this.router.navigate([ruta])
  }
}
