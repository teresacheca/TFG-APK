import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ReservasService} from '../services/reservas.service';
import {Usuario} from '../modelos/Usuarios'

@Component({
  selector: 'app-ae-aniade-usuario',
  templateUrl: './ae-aniade-usuario.component.html',
  styleUrls: ['./ae-aniade-usuario.component.css']
})
export class AeAniadeUsuarioComponent {

  constructor(private router: Router, private activeRoute: ActivatedRoute, private reservasServices: ReservasService){}
  
  //Objeto de tipo usuario donde guardaremos los datos del usuario con el que estamos operando
  usuario: Usuario={
    nombre_usuario: '',
    contrasena: '',
    tipo: 2,
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    empresa: '',
    id: 0,
    foto: "",
    id_empresa: 0
  }

  //Resto de variables que usaremos en el código
  nombre_empresa: string = ""
  aux: any = []
  empresa: number = 0
  nombre_admi: string = ''
  mostrarContrasena = false;

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]

    //Obtenemos los datos de la empresa a partir de su id (también necesitamos saber el nombre del administrador)
    this.reservasServices.getEmpresaId(this.nombre_admi, this.empresa).subscribe(
      res => {
        //Guardamos los datos que nos devuelve la función y que nos interasan para el resto del código
        this.aux = res
        this.usuario.empresa = this.aux[0].nombre_empresa
      },
      err => console.error(err)
    )
    
  }

  //Función que coge los datos introducidos y crea al usuario dentro de la empresa.
  //También comprueba que no sea un usuario con el nombre repetido
  AeaniadeUsuario(nombre_usuario: any, fecha_nacimiento: any, puesto_trabajo: any){
    //Si no metemos todos los datos necesarios para crear el usuario nos salta un mensaje de error
    if(nombre_usuario=='' || puesto_trabajo=='' || this.usuario.contrasena ==''){
      confirm("Faltan parámetros");
    }else{
      //Guardamos los datos obtenidos en el objeto usuario que tenemos inicializado
      this.usuario.nombre_usuario = nombre_usuario
      this.usuario.fecha_nacimiento = fecha_nacimiento
      this.usuario.puesto_trabajo = puesto_trabajo
      this.usuario.id_empresa = this.empresa
      //Obtenemos una lista con los usuarios que coincidan con el nombre del usuario que hemos introducido
      //Si la función nos devuelve alguno, no podremos crear al usuario y tendremos que elegir otro nombre
      this.reservasServices.getUsuarioNombre(this.usuario.nombre_usuario).subscribe(
        res => {
          this.aux = res
          //Si la función devuelve un usuario nos saldrá un mensaje de error
          if(this.aux.length > 0){
            confirm("Ese nombre ya está en uso");
          }else{
            //Si no devuelve ninguno, se supone que no hay más usuario con ese nombre, y creará al usuario
            this.reservasServices.AeaniadeUsuario(this.usuario, this.nombre_admi, this.empresa).subscribe(
              res => {
                //Por último nos moveremos a la página que nos muestra la lista de todos los usuarios de la empresa
                let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_usuarios'
                this.router.navigate([ruta]);
              },
              err => console.error(err)
            )
          }
        },
        err => console.error(err)
      )
      
    }
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que muestra la lista de usuarios de la empresa
  volver(){
    let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_usuarios'
    this.router.navigate([ruta])
  }

  
  //Función que cambia el valor de mostrarContrasena (cada vez que pulsamos el botón de ver) que nos permite ver la contraseña o verla cifrada
  verContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
  
}
