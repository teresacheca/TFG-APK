import { Component } from '@angular/core';
import { Recurso} from '../modelos/Recursos';
import { Reserva} from '../modelos/Reservas';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-realiza-reserva-recurso',
  templateUrl: './usuario-realiza-reserva-recurso.component.html',
  styleUrls: ['./usuario-realiza-reserva-recurso.component.css']
})


export class UsuarioRealizaReservaRecursoComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute, private dialog: MatDialog){}

  currentMonth: any;
  weeks: number[][] = [];
  daysOfWeek: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  reservasExistente: string[] = [];
  horas: string[][] = [];
  i = 0
  resultado: any
  

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

  usuario: string = ''
  id: number = 0
  aux: any

  reserva: Reserva ={
    fecha: '',
    hora: '',
    nombre_empresa: '', 
    nombre_usuario: '',
    nombre_rs: '',
    id_reserva: 0,
    id_recursoservicio: 0,
    id_empresa: 0
  }

  ngOnInit(){
    this.currentMonth = moment();
    this.generateCalendar();
    const params = this.activeRoute.snapshot.params;
    this.usuario = params["nombre_usuario"]
    this.id = params["id_recursoservicio"]
    this.reservaServices.getDatosRecursoUsu(this.usuario, this.id).subscribe(
      res =>{
       this.aux = res
       this.recurso.nombre_rs = this.aux[0].nombre_rs
       this.recurso.descripcion = this.aux[0].descripcion
       this.recurso.foto = this.aux[0].foto
       this.recurso.datos = this.aux[0].datos
       this.recurso.aforo = this.aux[0].aforo
       this.recurso.nombre_empresa = this.aux[0].nombre_empresa
       this.recurso.id_recursoservicio = this.aux[0].id_recursoservicio
       this.recurso.id_empresa = this.aux[0].id_empresa

       this.reserva.nombre_empresa = this.recurso.nombre_empresa
       this.reserva.nombre_usuario = this.usuario
       this.reserva.nombre_rs = this.recurso.nombre_rs
       this.reserva.id_recursoservicio = this.recurso.id_recursoservicio
       this.reserva.id_empresa = this.recurso.id_empresa

       this.reservaServices.getReservasEmpresa(this.usuario, this.recurso.id_empresa).subscribe(
        res =>{
          this.aux = res;
          let fecha = '0000-00-00'
          for (const reserva of this.aux) {
            let last = new Array()
            if(reserva.id_recursoservicio == this.recurso.id_recursoservicio){
              if (fecha == reserva.fecha){
                last = last.concat(this.horas[this.horas.length-1])
                last = last.concat(reserva.hora)
                last.sort();
                this.horas[this.horas.length-1] = last
              }else{
                this.reservasExistente.push(reserva.fecha);
                last.push(reserva.hora)
                this.horas.push(last)
              }
              
              fecha = reserva.fecha
            }
          }
        },
        err => console.error(err)
      );

      },
      err => console.error(err)
    );
    
  }

  volver(){
    let ruta =  '/reservas/usuario/' + this.usuario
    this.router.navigate([ruta])
  }

  generarHorasDisponibles(): string[] {
    let horasDisponibles: string[] = [];
    let horaInicial = 8; // Hora inicial (8am)
    let horaFinal = 22; // Hora final (10pm)
  
    for (let hora = horaInicial; hora <= horaFinal; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        let horaFormateada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:00`;
        horasDisponibles.push(horaFormateada);
      }
    }
  
    return horasDisponibles;
  }

  getHoras(date: number, month: string){

    let first: any = []
    let fecha = "";
    if(date < 10){
      fecha = month + '-0' + date;
    }else{
      fecha = month + '-' + date;
    }

    let index = 0
    for (const fechaReserva of this.getFechasReservas()){
      if(fechaReserva == fecha){
        this.i = index
      }
      index++
    }
    first = this.horas[this.i]
    this.i++
    if(this.i >= this.horas.length){
      this.i = 0
    }
    let disponible = this.generarHorasDisponibles()
    this.resultado = disponible.filter((hora) => !first.includes(hora));

    return first
  }




  crearReserva(nuevaReserva: Reserva){


    const faux = new Date(nuevaReserva.fecha)
   
    var straux = faux.toString();
    var mes_str_aux = straux.substring(4,7);
    var mesAux = ''
 
    switch(mes_str_aux){
      case 'Jan':{
        mesAux = '01';
        break;
      }
      case 'Feb':{
        mesAux = '02';
        break;
      }
      case 'Mar':{
        mesAux = '03';
        break;
      }
      case 'Apr':{
        mesAux = '04';
        break;
      }
      case 'May':{
        mesAux = '05';
        break;
      }
      case 'Jun':{
        mesAux = '06';
        break;
      }
      case 'Jul':{
        mesAux = '07';
        break;
      }
      case 'Aug':{
        mesAux = '08';
        break;
      }
      case 'Sep':{
        mesAux = '09';
        break;
      }
      case 'Oct':{
        mesAux = '10';
        break;
      }
      case 'Nov':{
        mesAux = '11';
        break;
      }
      case 'Dec':{
        mesAux = '12';
        break;
      }
    }
    
    
    var diaAux = straux.substring(8,10);
    var anioAux = straux.substring(11,15);

    
    var fechaAuxiliar = anioAux + '-' + mesAux + '-' + diaAux;

    let existe = false
    let coincide = false
    this.reservaServices.getRecursos(this.usuario, this.recurso.id_empresa).subscribe(
      res =>{
        this.aux = res
        for(let i=0; i<this.aux.length; i++){
          if(nuevaReserva.nombre_rs == this.aux[i].nombre_rs){
            existe = true
          }
        }

        if(existe == false){
          confirm("El recurso no existe");
        }else{

          this.reservaServices.getReservasEmpresa(this.usuario, this.recurso.id_empresa).subscribe(
            res =>{
              this.aux = res
              
              for(let i=0; i<this.aux.length; i++){
                var x = this.aux[i].fecha.toString().substring(0,10);
                const x2 = new Date(x)
               
                x2.setDate(x2.getDate()+1)

                var str = x2.toString();
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

                var nueva_fechax = anio + '-' + mes + '-' + dia;

                if(nuevaReserva.nombre_rs == this.aux[i].nombre_rs && fechaAuxiliar == nueva_fechax && nuevaReserva.hora == this.aux[i].hora ){
                  coincide = true
                }
              }
              if(coincide){
                confirm("Ya existe una reserva en ese momento para dicho recurso");
              }else{
                nuevaReserva.fecha = fechaAuxiliar
                this.reservaServices.crearReserva(this.usuario, this.id, nuevaReserva).subscribe(
                  res =>{
                    /*let ruta= '/reservas/usuario/' + this.usuario + '/realiza_reserva'
                    this.router.navigate([ruta])*/
                    window.location.reload();
                  },
                  err => console.error(err)
                );
              }
            },
            err => console.error(err)
          );          
        }
      },
      err => console.error(err)
    );
  }


  get currentMonthDates(): number[] {
      const firstDayOfMonth = this.currentMonth.clone().startOf('month').day();
      const daysInMonth = this.currentMonth.daysInMonth();
      const dates = Array.from({ length: 42 }, (_, i) =>
        i >= firstDayOfMonth && i < firstDayOfMonth + daysInMonth
          ? i - firstDayOfMonth + 1
          : 0
      );
      return dates;
  }

  goToPreviousMonth() {
    this.currentMonth = this.currentMonth.clone().subtract(1, 'month');
    this.generateCalendar();
  }

  goToNextMonth() {
    this.currentMonth = this.currentMonth.clone().add(1, 'month');
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDayOfMonth = this.currentMonth.clone().startOf('month').day();
    const daysInMonth = this.currentMonth.daysInMonth();
    const weeks = [];

    let week = new Array(7).fill(0);

    let currentDay = 1;
    for (let i = firstDayOfMonth-1; i < 7; i++) {
      week[i] = currentDay;
      currentDay++;
    }

    weeks.push(week);

    while (currentDay <= daysInMonth) {
      week = new Array(7).fill(0);
      for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
        week[i] = currentDay;
        currentDay++;
      }
      weeks.push(week);
    }

    this.weeks = weeks;
  }

  getFormattedDate(day: number): string {
    const year = this.currentMonth.year();
    const month = this.currentMonth.month() + 1;
    const dayFormatted = day < 10 ? `0${day}` : `${day}`;
    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${dayFormatted}`;
  }

  getFechasReservas(): string[] {
    return this.reservasExistente.map(reserva => moment(reserva).format('YYYY-MM-DD'));
  }

  // Verificar si hay reservas en una fecha específica y devolver un booleano
  tieneReserva(date: number): boolean {
    const fecha = this.currentMonth.clone().date(date);
    const fechaFormateada = fecha.format('YYYY-MM-DD');
    return this.getFechasReservas().includes(fechaFormateada);
  }

  getFechasReservasConHora(): { fecha: string; hora: string }[] {
    return this.reservasExistente.map(reserva => ({
      fecha: moment(reserva).format('YYYY-MM-DD'),
      hora: moment(reserva).format('HH:mm:ss')
    }));
  }

  // Obtener la hora de la reserva en una fecha específica o cadena vacía si no hay reserva
  getHoraReserva(date: number): string {
    const fecha = this.currentMonth.clone().date(date);
    const fechaFormateada = fecha.format('YYYY-MM-DD');
    const reserva = this.getFechasReservasConHora().find(reserva => reserva.fecha === fechaFormateada);
    return reserva ? reserva.hora : '';
  }

  seleccionDia(date: any){
    
    
    const fecha = this.currentMonth.clone().date(date);
    const fechaFormateada = fecha.format('YYYY-MM-DD');
    let reservado: any = []
    if (this.tieneReserva(date)){
      let index = this.getFechasReservas().findIndex(reserva => reserva === fechaFormateada);
      reservado = this.horas[index]
    }

    let disponible = this.generarHorasDisponibles()
    let resultado: any= disponible.filter((hora) => !reservado.includes(hora));
    
    return resultado
  }

  hacerReserva(hora: string, date: number, month: string){
    let fecha = "";
    if(date < 10){
      fecha = month + '-0' + date;
    }else{
      fecha = month + '-' + date;
    }

    //const fechaFormateada = fecha.format('YYYY-MM-DD');
    let nuevaReserva: Reserva ={
      fecha: fecha,
      hora: hora,
      nombre_empresa: this.recurso.nombre_empresa, 
      nombre_usuario: this.usuario,
      nombre_rs: this.reserva.nombre_rs,
      id_reserva: 0,
      id_recursoservicio: this.recurso.id_recursoservicio,
      id_empresa: this.recurso.id_empresa
    }
    this.crearReserva(nuevaReserva)
  }

  
}
