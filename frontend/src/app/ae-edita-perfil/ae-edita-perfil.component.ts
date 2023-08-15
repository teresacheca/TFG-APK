import { Component } from '@angular/core';
import { Usuario} from '../modelos/Usuarios';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-ae-edita-perfil',
  templateUrl: './ae-edita-perfil.component.html',
  styleUrls: ['./ae-edita-perfil.component.css']
})
export class AeEditaPerfilComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Objeto de tipo usuario donde guardaremos los datos del usuario con el que estamos operando
  admi_empresa: Usuario={
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
  fecha_nacimiento: any
  nombre: string = ""
  id_empresa: number = 0
  nombre_admi: string = ""
  aux: any = {  }
  mostrarContrasena = false;

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]

    //Obtenemos los datos del administrador de la empresa que queremos mostrar a partir de su id
    //Necesitamos su nombre para llamarlo en la url
    this.reservaServices.getDatosAdministradorEmpresa(params["nombre_usuario"], params["id_empresa"]).subscribe(
      res => {
        //Guardamos los datos obtenidos en admi_empresa
        this.aux = res
        this.admi_empresa.nombre_usuario = this.aux[0].nombre_usuario
        this.nombre = this.admi_empresa.nombre_usuario  //Guardamos el nombre de usuario para saber cuál es el antiguo si se modifica
        this.admi_empresa.contrasena = this.aux[0].contrasena
        this.admi_empresa.tipo = this.aux[0].tipo
        this.admi_empresa.fecha_nacimiento = this.aux[0].fecha_nacimiento
        this.admi_empresa.puesto_trabajo = this.aux[0].puesto_trabajo
        this.admi_empresa.empresa = this.aux[0].empresa
        this.admi_empresa.id = this.aux[0].id
        this.admi_empresa.id_empresa = this.aux[0].id_empresa
        this.admi_empresa.foto = this.aux[0].foto
        //Cambiamos el formato en el que vemos la fecha, para que no haya problemas al guardarlo y mostrarlo
        this.fecha_nacimiento = moment(this.admi_empresa.fecha_nacimiento).format('YYYY-MM-DD')
        //Guardamos a parte el identificador de la empresa para saber la anterior si el usuario la modifica
        this.id_empresa = this.admi_empresa.id_empresa

      },
      err=> console.error(err)
    )
  }

  //Función que llama a la función para borrar la cuenta del administrador
  eliminarCuentaAdmiEmpresaAe(nombre: string){
    //Borramos la cuenta del administrador a partir de si nombre de usuario
    this.reservaServices.eliminarCuentaAdmiEmpresaAe(nombre).subscribe(
      res => {
        //Por último nos movemos a la página inicial de login
        let ruta = '/reservas/login'
        this.router.navigate([ruta]);
      },
      err => console.error(err)
    )
  }

  //Función que guarda los datos modificados del usuario
  guardarCambiosAdmiEmpresaAe(nombre: string, nuevoUsuario: Usuario, fecha_nacimiento: any){
    //Copiamos en el nuevo usuario la nueva fecha de nacimiento para que no falle el formato
    nuevoUsuario.fecha_nacimiento = fecha_nacimiento;

    //Comprobamos que el nuevo nombre introducido no coincide con el de otro usuario
    //Tambiñen comprueba su antiguo nombre para que no haya error de que coincida si el nombre no se modifica
    //Llamamos a la función que nos devuelve todos los usuarios que haya con el nombre que le introducimos
    this.reservaServices.getUsuarioNombre(this.admi_empresa.nombre_usuario).subscribe(
      res => {
        this.aux = res
        //Comprueba que no haya otro usuario con ese nombre execepto el antiguo nombre de usuario
        if(this.aux.length > 0 && this.nombre != nuevoUsuario.nombre_usuario){
          //Si ya hay otro usuario con ese nombre, mostramos un mensaje de error
          confirm("Ese nombre ya está en uso");
        }else{
          //Si no, comprobamos el resto de datos

          //Comprobamos si se ha modificado la empresa, si esta nueva empresa existe
          //Llamamos a la función que nos devuelve los datos de la empresa en función del nombre que le pasemos
          this.reservaServices.getEmpresa(this.nombre_admi, nuevoUsuario.empresa).subscribe(
            res => {
             this.aux = res
             //Si la función no nos devuelve ninguna empresa, se entiende que el nombre introducido no corresponde con ninguna empresa
             //y por tanto, mostramos un mensaje de error
             if(this.aux.length == 0){
              confirm("La empresa seleccionada no existe")
             }else{
              //En caso contrario, comprobamos si la empresa nueva es distinta a la anterior

              //Si es distinta, entendemos que el usuario se ha cambiado de empresa y que por tanto tenemos que borrar 
              //toda la información que tenga en la empresa antigua
              if(this.id_empresa != this.aux[0].id_empresa){

                //Llamamos a la función que nos elimina todas las reservas del usuario en función de su nombre y el identificador de la empresa
                this.reservaServices.eliminarReservasUsuario(nombre, this.id_empresa).subscribe(
                  res => {
                    //Actualizamos el identificador de la empresa
                    nuevoUsuario.id_empresa = this.aux[0].id_empresa

                    //Una vez comprobado todo, ya podemos cambiar los datos del usuario
                    //Llamamos a la función que actualiza los datos de una usuario a partir de su nombre y los nuevo datos
                    this.reservaServices.guardarCambiosAdmiEmpresaAe(nombre, nuevoUsuario).subscribe(
                      res => {
                        //Por último, nos movemos a la página que nos muestra la página principal de usuario
                        //Comprobamos el tipo de usuario por si ha cambiado, ya que deependidendo del tipo nos moveremos a una dirección o a otra
                        if(nuevoUsuario.tipo == 0){
                          let ruta = '/reservas/admi_general/' + nombre
                          this.router.navigate([ruta]);
                        }else if(nuevoUsuario.tipo == 1){
                          let ruta = '/reservas/admi_empresa/' + nombre
                          this.router.navigate([ruta]);
                        }else if(nuevoUsuario.tipo == 2){
                          let ruta = '/reservas/usuario/' + nombre
                          this.router.navigate([ruta]);
                        }
                      },
                      err=> console.error(err)
                    )
                  },
                  err=> console.error(err)
                )
              }else{
                //Si no cambia la empresa, no tenemos que borrar el resto de datos y por tanto podemos actualizar directamente los 
                //datos del usuario llamando a la misma función 
                this.reservaServices.guardarCambiosAdmiEmpresaAe(nombre, nuevoUsuario).subscribe(
                  res => {
                    //Por último, nos movemos a la página que nos muestra la página principal de usuario
                    //Comprobamos el tipo de usuario por si ha cambiado, ya que deependidendo del tipo nos moveremos a una dirección o a otra
                    if(nuevoUsuario.tipo == 0){
                      let ruta = '/reservas/admi_general/' + nombre
                      this.router.navigate([ruta]);
                    }else if(nuevoUsuario.tipo == 1){
                      let ruta = '/reservas/admi_empresa/' + nombre
                      this.router.navigate([ruta]);
                    }else if(nuevoUsuario.tipo == 2){
                      let ruta = '/reservas/usuario/' + nombre
                      this.router.navigate([ruta]);
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
          
        },
      err => console.error(err)
    )
    
  }
  
  //Función que nos permite volver a la página anterior, es decir, a la página principal del administrador de la empresa
  volver(){
    let ruta = '/reservas/admi_empresa/' + this.nombre_admi
    this.router.navigate([ruta])
  }

  
  //Función que cambia el valor de mostrarContrasena (cada vez que pulsamos el botón de ver) que nos permite ver la contraseña o verla cifrada
  verContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}
