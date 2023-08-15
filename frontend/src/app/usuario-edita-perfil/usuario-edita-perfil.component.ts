import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { Usuario } from 'src/app/modelos/Usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-edita-perfil',
  templateUrl: './usuario-edita-perfil.component.html',
  styleUrls: ['./usuario-edita-perfil.component.css']
})
export class UsuarioEditaPerfilComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute ){}

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

  //Resto de variables que usaremos en el código
  fecha_nacimiento: string = ""
  aux: any = []
  nombre: string = ""
  id_empresa: number = 0
  mostrarContrasena = false;

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.usuario.nombre_usuario = params["nombre_usuario"]

    //Obtenemos los datos del usuario de la empresa que queremos mostrar a partir de su nombre
    this.reservaServices.getUsuario(this.usuario.nombre_usuario).subscribe(
      res => {
        //Guardamos todos los datos del usuario
        this.aux = res
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.nombre = this.usuario.nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.id = this.aux[0].id
        this.usuario.empresa = this.aux[0].empresa   
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo 
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento  
        this.usuario.id_empresa = this.aux[0].id_empresa   
        this.usuario.foto = this.aux[0].foto      
        this.id_empresa = this.usuario.id_empresa
        this.fecha_nacimiento = moment(this.usuario.fecha_nacimiento).format('YYYY-MM-DD')
      },
      err => console.error(err)
    )
    
  }

  //Función que guarda los datos modificados del usuario
  guardarCambiosUsuario(nombre_usuario: string, nuevoUsuario: Usuario, fecha: string){
    //Copiamos en el nuevo usuario la nueva fecha de nacimiento para que no falle el formato
    nuevoUsuario.fecha_nacimiento = new Date(fecha)
    
    //Comprobamos que el nuevo nombre introducido no coincide con el de otro usuario
    //Tambiñen comprueba su antiguo nombre para que no haya error de que coincida si el nombre no se modifica
    //Llamamos a la función que nos devuelve todos los usuarios que haya con el nombre que le introducimos
    this.reservaServices.getUsuarioNombre(this.usuario.nombre_usuario).subscribe(
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
          this.reservaServices.getEmpresa(nombre_usuario, nuevoUsuario.empresa).subscribe(
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
                this.reservaServices.eliminarReservasUsuario(nuevoUsuario.nombre_usuario, this.id_empresa).subscribe(
                  res => {
                    //Actualizamos el identificador de la empresa
                    nuevoUsuario.id_empresa = this.aux[0].id_empresa
                   
                    //Una vez comprobado todo, ya podemos cambiar los datos del usuario
                    //Llamamos a la función que actualiza los datos de una usuario a partir de su nombre y los nuevo datos
                    this.reservaServices.guardarCambiosUsuario(nombre_usuario, nuevoUsuario).subscribe(
                      res => {
                        //Por último, nos movemos a la página que nos muestra la página principal de usuario
                        //Comprobamos el tipo de usuario por si ha cambiado, ya que deependidendo del tipo nos moveremos a una dirección o a otra
                        if(nuevoUsuario.tipo == 0){
                          let ruta = '/reservas/admi_general/' + nombre_usuario
                          this.router.navigate([ruta]);
                        }else if(nuevoUsuario.tipo == 1){
                          let ruta = '/reservas/admi_empresa/' + nombre_usuario
                          this.router.navigate([ruta]);
                        }else if(nuevoUsuario.tipo == 2){
                          let ruta = '/reservas/usuario/' + nombre_usuario
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
                this.reservaServices.guardarCambiosUsuario(nombre_usuario, nuevoUsuario).subscribe(
                  res => {
                    //Por último, nos movemos a la página que nos muestra la página principal de usuario
                    //Comprobamos el tipo de usuario por si ha cambiado, ya que deependidendo del tipo nos moveremos a una dirección o a otra
                    if(nuevoUsuario.tipo == 0){
                      let ruta = '/reservas/admi_general/' + nombre_usuario
                      this.router.navigate([ruta]);
                    }else if(nuevoUsuario.tipo == 1){
                      let ruta = '/reservas/admi_empresa/' + nombre_usuario
                      this.router.navigate([ruta]);
                    }else if(nuevoUsuario.tipo == 2){
                      let ruta = '/reservas/usuario/' + nombre_usuario
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

  //Función que llama a la función para borrar la cuenta del usuario
  eliminarCuentaUsuarioUsu(nombre_usuario: string){
    //Borramos la cuenta del usuario a partir de si nombre de usuario
    this.reservaServices.eliminarCuentaUsuarioUsu(nombre_usuario).subscribe(
      res => {
        //Por último nos movemos a la página inicial de login
        let ruta = '/reservas/login'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )

  }

  //Función que nos permite volver a la página anterior, es decir, a la página principal del usuario
  volver(){
    let ruta = '/reservas/usuario/' + this.nombre 
    this.router.navigate([ruta])
  }

  
  //Función que cambia el valor de mostrarContrasena (cada vez que pulsamos el botón de ver) que nos permite ver la contraseña o verla cifrada
  verContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

}
