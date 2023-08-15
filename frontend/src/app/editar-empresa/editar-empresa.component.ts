import { Component } from '@angular/core';
import {Empresa} from '../modelos/Empresas';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Objeto de tipo empresa donde guardaremos los datos de la empresa con el que estamos operando
  empresa: Empresa={
    nombre_empresa: '',
    datos_de_contacto: '',
    descripcion: '',
    logo: '',
    direccion: '',
    id_empresa: 0
  }

  //Resto de variables que usaremos en el código
  id_empresa: number = 0
  nombre_admi:string = ""
  aux: any = {  }

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.id_empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]

    //Obtenemos los datos de la empresa que editar a partir de su identificador
    //Necesitamos el nombre del administrador para llamarlo en la url
    this.reservaServices.getEmpresaId(this.nombre_admi, params["id_empresa"]).subscribe(
      res => {
        //Guardamos los datos obtenidos en empresa
        this.aux = res
        this.empresa.nombre_empresa = this.aux[0].nombre_empresa
        this.empresa.datos_de_contacto = this.aux[0].datos_de_contacto
        this.empresa.descripcion = this.aux[0].descripcion
        this.empresa.logo = this.aux[0].logo
        this.empresa.direccion = this.aux[0].direccion
        this.empresa.id_empresa = this.aux[0].id_empresa
      },
      err=> console.error(err)
    )
  }

  //Función que llama a la función para borrar la instancia de la empresa de la base de datos
  eliminarCuentaEmpresa(id_empresa: number){
    //Borramos la empresa de la base de datos
    this.reservaServices.eliminarEmpresa(this.nombre_admi, id_empresa).subscribe(
      res => {
        //Nos movemos a la página que muestra la lista de las empresas
        let ruta = '/reservas/' + this.nombre_admi + '/empresas/'
        this.router.navigate([ruta]);
      },
      err => console.error(err)
    )
  }

  //Función que guarda los datos modificados de la empresa
  guardarCambios(id_empresa: number, empresa : Empresa){
    this.reservaServices.guardarCambios(this.nombre_admi, id_empresa, empresa).subscribe(
      res => {
        //Nos movemos a la página que muestra la pantalla principal de la empresa
        let ruta = '/reservas/' + this.nombre_admi + '/empresas/'+ this.empresa.id_empresa
        this.router.navigate([ruta ]);

      },
      err=> console.error(err)
    )
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la lista de las empresas
  volver(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.id_empresa 
    this.router.navigate([ruta])
  }
}
