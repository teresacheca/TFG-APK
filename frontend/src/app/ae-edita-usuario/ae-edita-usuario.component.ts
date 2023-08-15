import { Component } from '@angular/core';
import { Usuario} from '../modelos/Usuarios';
import { Reserva} from '../modelos/Reservas';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-ae-edita-usuario',
  templateUrl: './ae-edita-usuario.component.html',
  styleUrls: ['./ae-edita-usuario.component.css']
})
export class AeEditaUsuarioComponent {
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

  //Resto de variables que usaremos en el código
  aux: any = {  }
  nombre_admi: string = ''
  empresa: number = 0
  fecha_nacimiento: any
  nombre: string = ""
  mostrarContrasena = false;

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]
    this.empresa = params["id_empresa"]

    //Obtenemos los datos del usuario que queremos modificar a apartir de su identificador
    //necesitamos el nombre del administrador y el identificador de la emrpesa para poder usar la url correspondiente
    this.reservaServices.getUsuarioId(params["nombre_usuario"], params["id_empresa"], params["id"]).subscribe(
      res => {
        //Guardamos los datos que nos devuelve la función y que nos interasan para el resto del código
        this.aux = res
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.nombre = this.usuario.nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo
        this.usuario.empresa = this.aux[0].empresa
        this.usuario.id = this.aux[0].id
        this.usuario.id_empresa = this.aux[0].id_empresa
        this.usuario.foto = this.aux[0].foto
        //Copiamos la fecha con el formato que queremos para que no de problemas el formato
        this.fecha_nacimiento = moment(this.usuario.fecha_nacimiento).format('YYYY-MM-DD')
      },
      err=> console.error(err)
    )
  }

  //Función que guarda los datos modificados del usuario
  guardarCambiosUsuarioAe(id: number, nuevoUsuario: Usuario, fecha_nacimiento: any){
    nuevoUsuario.fecha_nacimiento = fecha_nacimiento;
    
    //Comprobamos que el nuevo nombre no cincide con ningún otro nombre de los que hay (excepto con el suyo anterior)
    this.reservaServices.getUsuarioNombre(this.usuario.nombre_usuario).subscribe(
      res => {
        this.aux = res
        //Si agún nombre coincide, mostramos un mensaje de error
        if(this.aux.length > 0 && this.nombre != nuevoUsuario.nombre_usuario){
          confirm("Ese nombre ya está en uso");
        }else{
          //En caso contrario, comprobamos que el nuevo nombre de la empresa corresponde con una empresa que existe
          this.reservaServices.getEmpresa(this.nombre_admi, nuevoUsuario.empresa).subscribe(
            res => {
             this.aux = res
             //Si no nos devuelve ninguna empresa, es porque no hay ninguna empresa con ese identificador y por tanto, no existe y mostramos un mensaje de error
             if(this.aux.length == 0){
              confirm("La empresa seleccionada no existe")
             }else{
              //En caso contrario, comprobamos si se ha modificado la empresa
              //Si la empresa ha cambiado, eliminamos todas las antiguas resercas del usuario en la anterior empresa
              if(this.empresa != this.aux[0].id_empresa){
                //Eliminamos todas las reservas
                this.reservaServices.eliminarReservasUsuario(nuevoUsuario.nombre_usuario, this.empresa).subscribe(
                  res => {
                    nuevoUsuario.id_empresa = this.aux[0].id_empresa
                    //Guardamos los nuevos datos del usuario
                    this.reservaServices.guardarCambiosUsuarioAe(this.nombre_admi, this.empresa, id, nuevoUsuario).subscribe(
                      res => {
                        //Y por último nos movemos a la página que muestra la lista de usuarios
                        let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_usuarios'
                        this.router.navigate([ruta]);
                      },
                      err=> console.error(err)
                    )
                  },
                  err=> console.error(err)
                )
                //En caso de que la empresa no haya cmabiado
              }else{
                //Si ha cambiado el nombre de usuario, tendremos que modificar todas sus reservas
                if(this.nombre != nuevoUsuario.nombre_usuario){
                  //Para ello, obtenemos todas las reservas que haya en la empresa
                  this.reservaServices.getReservasAe(this.nombre_admi, this.empresa).subscribe(
                    res => {
                      this.aux = res
                      //Creamos un vector de reservas que contendrá sólo las reservas del recurso que vamos a eliminar
                      let reservas = []
                      //Copiamos las resservas que son del recurso que vamos a eliminar en el vector reservas (fijándonos en su identificador)
                      for(const reserva of this.aux){
                        if (reserva.nombre_usuario == this.nombre){
                          reservas.push(reserva)
                        }
                      }
                      //Recorremos el vector reservas y creamos una nueva reserva que tendrá 
                      //los datos de la reserva anterior pero con el nombre del usuario modificado
                      
                      for(const reserva of reservas){
                        let nuevaReserva: Reserva = {
                          fecha: reserva.fecha,
                          hora: reserva.hora,
                          nombre_empresa: reserva.nombre_empresa, 
                          nombre_usuario: nuevoUsuario.nombre_usuario,
                          nombre_rs: reserva.nombre_rs,
                          id_reserva: reserva.id_reserva,
                          id_recursoservicio: reserva.id_recursoservicio,
                          id_empresa: reserva.id_empresa
                        }
                        //Llamamos a la función que actualiza los datos de la reserva dándole el identificador de la reserva (que nunca varía)
                        //y los datos de la nueva reserva (también necesitamos el nombre del administrador y el identificador de la empresa, para poder usar la url correspondiente)
                        this.reservaServices.actualizarReserva(this.nombre_admi, this.empresa, reserva.id_reserva, nuevaReserva ).subscribe(
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
                //Una vez modificadas las reservas, actializamos los datos del usuario
                this.reservaServices.guardarCambiosUsuarioAe(this.nombre_admi, this.empresa, id, nuevoUsuario).subscribe(
                  res => {
                    //Por último nos movemos a la página que muestra la lista de usuarios
                    let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_usuarios'
                    this.router.navigate([ruta]);
                  },
                  err=> console.error(err)
                )
              }
              
             }
            },
            err=> console.error(err)
          )
        }
      },
      err => console.error(err)
    )
   
  }

  //Función que elimina la cuenta del usuario
  eliminarCuentaUsuarioAe(id: number){
    //Eliminamos la cuenta de usuario
    this.reservaServices.eliminarCuentaUsuarioAe(this.nombre_admi, this.empresa, id).subscribe(
      res => {
        //Nos movemos a la página que mustra la lista de usuarios
        let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_usuarios'
        this.router.navigate([ruta]);
        this.aux = res
        //También tenemos que borrar todas las reservas del usuario
        //Obtenemos todas las reservas del usuario a partir de su nombre
        this.reservaServices.getReservasDelUsuario(this.aux[0].nombre_usuario).subscribe(
          res => {
            this.aux = res      
            //Recorremos todas las reservas y las vamos eliminando una por una      
            for(let i = 0 ; i < this.aux.length ; i++){
              this.reservaServices.eliminarReservas(this.nombre_admi, this.empresa, this.aux[i].id_reserva).subscribe(
                res => {
                  this.aux = res
                },
                err=> console.error(err)
              )
            }

          },
          err=> console.error(err)
        )
      },
      err=> console.error(err)
    )
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la lista de los usuarios de la empresa
  volver(){
    let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_usuarios'
    this.router.navigate([ruta])
  }

  
  //Función que cambia el valor de mostrarContrasena (cada vez que pulsamos el botón de ver) que nos permite ver la contraseña o verla cifrada
  verContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }


}
