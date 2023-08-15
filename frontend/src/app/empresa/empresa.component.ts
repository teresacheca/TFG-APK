import { Component } from '@angular/core';
import {Empresa} from '../modelos/Empresas';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Objeto de tipo emrpesa donde guardaremos los datos de la empresa con el que estamos operando
  empresa: Empresa={
    nombre_empresa: '',
    datos_de_contacto: '',
    descripcion: '',
    logo: '',
    direccion: '',
    id_empresa: 0
  }

  nombre_admi: string =""
  aux: any = {  }

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]

    //Obtenemos los datos de la empresa a partir de su id (también necesitamos saber el nombre del administrador para usar la url correspondiente)
    this.reservaServices.getEmpresaId(this.nombre_admi, params["id_empresa"]).subscribe(
      res => {
        //Guardamos los datos de la empresa
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

  //Función que nos lleva a la ruta para ver la lista de los administradores de la empresa
  getAdministradoresEmpresa(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/'+ this.empresa.id_empresa + '/lista_administradores'
    this.router.navigate([ruta]);
  }

  //Función que nos lleva a la ruta para ver la lista de los usuario de la empresa
  getUsuariosEmpresa(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.empresa.id_empresa + '/lista_usuarios'
    this.router.navigate([ruta]);
  }

  //Función que nos lleva a la ruta para editar el perfil de la empresa
  editarPerfil(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/'+ this.empresa.id_empresa + '/editar_pefil'
    this.router.navigate([ruta]);
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que muestra la lista de las empresas
  volver(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/'
    this.router.navigate([ruta]);
  }

}
