import { Component } from '@angular/core';
import { Usuario} from '../modelos/Usuarios';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-ag-edita-admi-empresa',
  templateUrl: './ag-edita-admi-empresa.component.html',
  styleUrls: ['./ag-edita-admi-empresa.component.css']
})
export class AgEditaAdmiEmpresaComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Objeto de tipo usuario donde guardaremos los datos del usuario con el que estamos operando
  usuario: Usuario={
    nombre_usuario: '',
    contrasena: '',
    tipo: 1,
    id: 0,
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    empresa: '',
    foto: "",
    id_empresa: 0
  }

  //Resto de variables que usaremos en el código
  fecha_nacimiento: string = ""
  nombre: string = ""
  id_empresa: number = 0
  nombre_admi_general: string = ""
  aux: any = {  }
  mostrarContrasena = false;

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.id_empresa = params["id_empresa"]
    this.nombre_admi_general = params["nombre_usuario"]

    //Obtenemos los datos del admisnitrador que queremos modificar a apartir de su identificador
    //necesitamos el nombre del administrador general y el identificador de la emrpesa para poder usar la url correspondiente
    this.reservaServices.getAdministradorEmpresa(this.nombre_admi_general, params["id"], params["id_emrpesa"]).subscribe(
      res => {
        //Guardamos los datos que nos devuelve la función y que nos interasan para el resto del código
        this.aux = res
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.nombre = this.usuario.nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.id = this.aux[0].id
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo
        this.usuario.empresa = this.aux[0].empresa
        this.usuario.foto = this.aux[0].foto
        this.usuario.id_empresa = this.aux[0].id_empresa
        //Copiamos la fecha con el formato que queremos para que no de problemas el formato
        this.fecha_nacimiento = moment(this.usuario.fecha_nacimiento).format('YYYY-MM-DD')
      },
      err=> console.error(err)
    )
  }


  //Función que elimina la cuenta del administrador de la empresa
  eliminarCuentaAdmiEmpresa(id: number, id_empresa: number){
    //Eliminamos la cuenta de usuario
    this.reservaServices.eliminarCuentaAdmiEmpresa(this.nombre_admi_general,id, id_empresa).subscribe(
      res => {
        //Nos movemos a la página dónde se muestra la lista de los adminsitradores de la empresa
        let ruta = '/reservas/' + this.nombre_admi_general + '/empresas/' + id_empresa + '/lista_administradores'
        this.router.navigate([ruta]);
      },
      err => console.error(err)
    )
  }

  //Función que guarda los datos modificados del admisnitrador
  guardarCambiosAdmiEmpresa(id: number, id_empresa: number, nuevoUsuario: Usuario, fecha: string){
    nuevoUsuario.fecha_nacimiento = new Date(fecha)

    //Comprobamos que el nuevo nombre no cincide con ningún otro nombre de los que hay (excepto con el suyo anterior)
    this.reservaServices.getUsuarioNombre(this.usuario.nombre_usuario).subscribe(
      res => {
        this.aux = res
        //Si agún nombre coincide, mostramos un mensaje de error
        if(this.aux.length > 0 && this.nombre != nuevoUsuario.nombre_usuario){
          confirm("Ese nombre ya está en uso");
        }else{
          //En caso contrario, comprobamos que el nuevo nombre de la empresa corresponde con una empresa que existe
          this.reservaServices.getEmpresa(this.nombre_admi_general, nuevoUsuario.empresa).subscribe(
            res => {
             this.aux = res
             //Si no nos devuelve ninguna empresa, es porque no hay ninguna empresa con ese identificador y por tanto, no existe y mostramos un mensaje de error
             if(this.aux.length == 0){
              confirm("La empresa seleccionada no existe")
             }else{
              //En caso contrario, acrtualizaremos los datos del administraddor llamando la función guardarCambiosAdmiEmpresa
              nuevoUsuario.id_empresa = this.aux[0].id_empresa
              this.reservaServices.guardarCambiosAdmiEmpresa(this.nombre_admi_general, id, id_empresa, nuevoUsuario).subscribe(
                res => {
                  //Nos moveremos a la página que muestra la lista de los administradores de la empresa
                  let ruta = '/reservas/' + this.nombre_admi_general + '/empresas/' + id_empresa + '/lista_administradores'
                  this.router.navigate([ruta]);
                },
                err=> console.error(err)
              )
             }
            },
            err=> console.error(err)
          )
          
        }
      },
      err => console.error(err)
    )
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la lista de los usuarios de la empresa
  volver(){
    let ruta = '/reservas/' + this.nombre_admi_general + '/empresas/'+ this.id_empresa + '/lista_administradores'
    this.router.navigate([ruta])
  }

  //Función que cambia el valor de mostrarContrasena (cada vez que pulsamos el botón de ver) que nos permite ver la contraseña o verla cifrada
  verContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

}
