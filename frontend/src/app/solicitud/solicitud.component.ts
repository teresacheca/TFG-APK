import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ReservasService} from '../services/reservas.service';
import {Empresa} from '../modelos/Empresas' ///importar la interfaz

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
  constructor(private router: Router, private activeRoute: ActivatedRoute, private reservasServices: ReservasService){}

  //Objeto de tipo empresa donde guardaremos los datos de la empresa con el que estamos operando
  empresa: Empresa = {
    nombre_empresa: '',
    logo: '',
    datos_de_contacto: '',
    descripcion: '',
    direccion: '',
    id_empresa: 0
  }

  //Función que crea la solicitud para que el administrador general pueda verla
  crearSolicitud(nombre: any, datos_de_contacto: any, descripcion: any, logo: any){
    //Si falta algún dato de la empresa, mostramos un mensaje de error
    if(nombre=='' || logo==''|| datos_de_contacto==''|| descripcion==''){
      confirm("Faltan parámetros");
    }else{
      //Si no, guardamos los datos en el objeto empresa
      this.empresa.nombre_empresa = nombre;
      this.empresa.logo = logo;
      this.empresa.datos_de_contacto = datos_de_contacto;
      this.empresa.descripcion = descripcion;
      //Llamamos a la función "crearSolicitud" que creará una solicitud y lo añadirá en la base de datos
      this.reservasServices.crearSolicitud("usuario", this.empresa).subscribe(
        res => {
          //Por último nos movemos a la pantalla de login
          this.router.navigate(['/reservas/login']);
        },
        err => console.error(err)
      )
    }
    
  }
}
