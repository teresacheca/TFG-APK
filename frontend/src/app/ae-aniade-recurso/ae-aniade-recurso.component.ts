import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ReservasService} from '../services/reservas.service';
import {Recurso} from '../modelos/Recursos'

@Component({
  selector: 'app-ae-aniade-recurso',
  templateUrl: './ae-aniade-recurso.component.html',
  styleUrls: ['./ae-aniade-recurso.component.css']
})
export class AeAniadeRecursoComponent {
  constructor(private router: Router, private activeRoute: ActivatedRoute, private reservasServices: ReservasService){}
  
  //Objeto de tipo recurso donde guardaremos los datos del recurso con el que estamos operando
  recurso: Recurso ={
    nombre_rs: '',
    descripcion: '',
    foto: '',
    datos: '',
    aforo: 0,
    nombre_empresa: '',
    id_recursoservicio: 0,
    id_empresa: 0
  }

  //Resto de variables que usaremos en el código
  aux: any = []
  nombre_empresa: string = ""
  id_empresa: number = 0
  nombre_admi: string = ''

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.id_empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]

    //Obtenemos los datos de la empresa a partir de su id (también necesitamos saber el nombre del administrador)
    this.reservasServices.getEmpresaId(this.nombre_admi, this.id_empresa).subscribe(
      res => {
        //Guardamos los datos que nos devuelve la función y que nos interasan para el resto del código
        this.aux =res
        this.nombre_empresa = this.aux[0].nombre_empresa
      },
      err=> console.error(err)
    )
  }

  //Función que coge los datos introducidos y crea el rescurso dentro de la empresa.
  //También comprueba que no sea un recurso con el nombre repetido
  AeaniadeRecurso(nombre_rs: string, descripcion: string, foto: string, datos: string, aforo: string){
    //Si no metemos todos los datos necesarios para crear el recurso nos salta un mensaje de error
    if(nombre_rs=='' || descripcion=='' || foto==''|| datos==''|| aforo==''){
      confirm("Faltan parámetros");
    }else{
      //Guardamos los datos obtenidos en el objeto recurso que tenemos inicializado
      this.recurso.nombre_rs = nombre_rs
      this.recurso.descripcion = descripcion
      this.recurso.foto = foto
      this.recurso.datos = datos
      this.recurso.aforo = Number(aforo);
      this.recurso.id_empresa = this.id_empresa
      this.recurso.nombre_empresa = this.nombre_empresa
      //Obtenemos todos los recursos que haya en esta empresa para comprobar que no está repetido
      this.reservasServices.getRecursos(this.nombre_admi, this.id_empresa).subscribe(
        res => {
          this.aux = res
          let encontrado = false
          //Comprobamos si el nombre del nuevo recursos coincide con el de algún recurso ya creado
          for(const nombre of this.aux){
            if(nombre.nombre_rs == nombre_rs){
              encontrado = true
            }
          }
          //Si coincide mostramos un mensaje de error
          if(encontrado){
            confirm("Ya existe un recurso o servicio con ese nombre en la empresa");
          }else{
            //Si no coincide, añadimos este nuevo recurso a la lista de recursos de la empresa
            this.reservasServices.AeaniadeRecurso(this.recurso, this.nombre_admi, this.id_empresa).subscribe(
              res => {
                //Una vez creado, volvemos a la página que muestra la lista de recursos
                let ruta = "/reservas/admi_empresa/" + this.nombre_admi + '/' + this.id_empresa + '/lista_recursos'
                this.router.navigate([ruta]);
              },
              err => console.error(err)
            )
          }
        },
        err=> console.error(err)
      )
    }
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que muestra la lista de recursos
  volver(){
    let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.id_empresa + '/lista_recursos'
    this.router.navigate([ruta])
  }

}
