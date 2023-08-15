import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ReservasService} from '../services/reservas.service';
import {Usuario} from 'src/app/modelos/Usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private activeRoute: ActivatedRoute, private reservasServices: ReservasService){}

  //Variables que usaremos en el resto del código
  usuario: any = {}

  //Función que nos permite ir a la página donde podremos hacer una nueva solicutd de una emrpesa
  irNuevaSolicitud(){
    this.router.navigate(['/reservas/solicitud'])
  }

  //Función que comprobará el nombre de usuario y la contraseña y nos moverá a una patalla de perfil
  //dependiendo del tipo que sea el usuario
  inicioSesion(nombreUsuario: any, contrasenaUsuario: any){
    //Si el nombre usuario o la contraseña están vacios saltará un mensaje de error
    if(nombreUsuario==''){
      confirm("Faltan parámetros");
    }else if(contrasenaUsuario==''){
      confirm("Faltan parámetros");
    }else{
      //En caso contrario comprobaremos que el usuario y la contraseña existen y pertenecen a un usuario
      //con la función getLogin
      this.reservasServices.getLogin(nombreUsuario, contrasenaUsuario).subscribe(
        res => {
          this.usuario = res;
          //Dependiendo del tipo de usuario iremos a un perfil u otro
          if(this.usuario[0]!=null){
            if(this.usuario[0].tipo == '0'){
              this.router.navigate(['/reservas/admi_general', this.usuario[0].nombre_usuario]);
            }else if(this.usuario[0].tipo == '1'){
              this.router.navigate(['/reservas/admi_empresa', this.usuario[0].nombre_usuario]);
            }else if(this.usuario[0].tipo == '2'){
              this.router.navigate(['/reservas/usuario', this.usuario[0].nombre_usuario]);
            }
            
          }else{
            //Si el usuario y la contraseña no coinciden ni pertenecen aun usuario, mostrará un mensaje de error
            confirm("Error en login");
          }
        },
        err => console.error(err)
      )
    }
  }
}
