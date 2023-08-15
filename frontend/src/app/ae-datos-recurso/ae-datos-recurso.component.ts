import { Component } from '@angular/core';
import { Recurso} from 'src/app/modelos/Recursos';
import {OnInit, HostBinding } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ae-datos-recurso',
  templateUrl: './ae-datos-recurso.component.html',
  styleUrls: ['./ae-datos-recurso.component.css']
})
export class AeDatosRecursoComponent {
  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

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

  //Inicialización de las variables que usaremos para el resto del código
  empresa: number = 0
  admi: string = ''
  id: number = 0
  aux: any

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.admi = params["nombre_usuario"]
    this.id = params["id_recursoservicio"]

    //Obtenemos todos los datos del recurso a partir de su id que obtenemos en la url
    //Necesitamos saber también la empresa y el administrador
    this.reservasServices.getDatosRecursoAe(this.admi, this.empresa, this.id).subscribe(
      res =>{
        //Copiamos todos los datos que nos devuelve la función en un objeto de tipo recurso que hemos llamado recurso
       this.aux = res
       this.recurso.nombre_rs = this.aux[0].nombre_rs
       this.recurso.descripcion = this.aux[0].descripcion
       this.recurso.foto = this.aux[0].foto
       this.recurso.datos = this.aux[0].datos
       this.recurso.aforo = this.aux[0].aforo
       this.recurso.nombre_empresa = this.aux[0].nombre_empresa
       this.recurso.id_recursoservicio = this.aux[0].id_recursoservicio
       this.recurso.id_empresa = this.aux[0].id_empresa
      },
      err => console.error(err)
    );
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que muestra la lista de recursos de la empresa
  volver(){
    let ruta = '/reservas/admi_empresa/' + this.admi + '/' + this.empresa + '/lista_recursos'
    this.router.navigate([ruta])
  }

}
