import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {
  
  constructor(private router: Router, private activeRoute: ActivatedRoute, private reservasServices: ReservasService){}

  //Variables que usaremos en el resto del código
  empresas: any = []
  nombre_admi: string = ""

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]

    //Obtenemos todas las emrpesas con la función getEmpresas 
    //necesitaremos también el nombre del administrador para poder acceder a la url correspondiente
    this.reservasServices.getEmpresas(this.nombre_admi).subscribe(
      res =>{
        //Guardamos la información de todas las empresas
        this.empresas = res;
      },
      err => console.error(err)
    );
  }

  //Función que nos permite ir a la página donde podremos ver el perfil de la empresa
  verEmpresa(id_empresa: string){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + id_empresa
    this.router.navigate([ruta]);
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la pantalla inicial del perfil del administrador general
  volver(){
    let ruta = "reservas/admi_general/" + this.nombre_admi
    this.router.navigate([ruta])
  }
}
