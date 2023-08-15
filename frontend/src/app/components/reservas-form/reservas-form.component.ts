import { parseHostBindings } from '@angular/compiler';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Reserva} from '../../modelos/Reservas'
import {ReservasService} from '../../services/reservas.service'


@Component({
  selector: 'app-reservas-form',
  templateUrl: './reservas-form.component.html',
  styleUrls: ['./reservas-form.component.css']
})
export class ReservasFormComponent {
  @HostBinding('class') classes='row'

  //Definir un objeto reserva para poder guardarlo
  reserva: Reserva = {
    fecha: "2023-01-01",
    hora: "00:00:00",
    nombre_empresa: '', 
    nombre_usuario: '',
    nombre_rs: '',
    id_reserva: 0,
    id_recursoservicio: 0,
    id_empresa: 0
  };
  
  edit: boolean = false;

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute ){}

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    if (params["fecha"] != null){
      this.reservaServices.getReserva(params["fecha"]).subscribe(
        res => {
          //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
          this.reserva.fecha = params["fecha"]
          this.reserva.hora = params["hora"]
          this.edit = true;
        },
        err=> console.error(err)
      )
    }
  }

  guardarNuevaReserva(){
    //Al principio es un string, lo pasamos a tipo fecha, le añadimos un día, lo pasamos a tipo string
    const f = new Date(this.reserva.fecha)
    f.setDate(f.getDate()+1)
    //cosas para tener 2023-01-23
    var str = f.toString();
    var mes_str = str.substring(4,7);
    var mes = '';
   
    switch(mes_str){
      case 'Jan':{
        mes = '01';
        break;
      }
      case 'Feb':{
        mes = '02';
        break;
      }
      case 'Mar':{
        mes = '03';
        break;
      }
      case 'Apr':{
        mes = '04';
        break;
      }
      case 'May':{
        mes = '05';
        break;
      }
      case 'Jun':{
        mes = '06';
        break;
      }
      case 'Jul':{
        mes = '07';
        break;
      }
      case 'Aug':{
        mes = '08';
        break;
      }
      case 'Sep':{
        mes = '09';
        break;
      }
      case 'Oct':{
        mes = '10';
        break;
      }
      case 'Nov':{
        mes = '11';
        break;
      }
      case 'Dec':{
        mes = '12';
        break;
      }
    }

    var dia = str.substring(8,10);
    var anio = str.substring(11,15);

    var nueva_fecha = anio + '-' + mes + '-' + dia;
    //this.reserva.fecha = nueva_fecha;

    let nueva_reserva:Reserva = {
      fecha: nueva_fecha,
      hora: this.reserva.hora,
      nombre_empresa: '', 
      nombre_usuario: '',
      nombre_rs: '',
      id_reserva: 0,
      id_recursoservicio:0 ,
      id_empresa: 0
    };

    this.reservaServices.saveReserva(nueva_reserva).subscribe(
      res => {
        this.router.navigate(['/reservas']);
      },
      err =>console.error(err)
    )
  }

  updateReserva(){
    /*this.reservaServices.updateReserva(this.reserva["fecha"], this.reserva).subscribe(
      res=> {
        this.router.navigate(['/reservas']) //no funciona -> no se actualiza
      },
      err => console.error(err)
    )*/
  }
}
