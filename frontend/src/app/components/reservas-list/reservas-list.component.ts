import {ReservasService} from '../../services/reservas.service';
import { Reserva } from 'src/app/modelos/Reservas';
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent  {
  @HostBinding('class') classes = 'row'

  reservas: any = []

  constructor(private reservasServices: ReservasService){

  }

  ngOnInit(){
    this.reservasServices.getReservas().subscribe(
      res =>{
        this.reservas = res;
      },
      err => console.error(err)
    );
  }

  getReservas(){
    this.reservasServices.getReservas().subscribe(
      res => {
        this.reservas = res;
      },
      err => console.error(err)
    )
  }

  deleteReserva(fecha: string){
    this.reservasServices.deleteReserva(fecha).subscribe(
      res =>{
        this.getReservas();
      },
      err => console.error(err)
    )
  }

}
