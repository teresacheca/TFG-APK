import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuarios';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-ve-reservas',
  templateUrl: './usuario-ve-reservas.component.html',
  styleUrls: ['./usuario-ve-reservas.component.css']
})
export class UsuarioVeReservasComponent {

  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  //Variables que usaremos en el código
  mis_reservas: any = []
  mis_fechas: string[] = [];
  mis_horas: string[][] = [];
  recurso: string[] = []
  vacio = false
  currentMonth: any;
  semanas: number[][] = [];
  diasDeLaSemana: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  aux: any = []
  
  //Objeto de tipo usuario que usaremos para manipular la información del usuario
  usuario: Usuario = {
    nombre_usuario: '',
    contrasena: '',
    tipo: 2,
    id: 0,
    empresa: '',
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    foto: "",
    id_empresa: 0
  }


  ngOnInit(){
    //Inicializaremos la variable usando momento, que nos dará el mes actual
    this.currentMonth = moment();

    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.usuario.nombre_usuario = params["nombre_usuario"]

    //Obtenemos los datos del usuario actual a partir de su nombre de usuario con la función getUsuario
    this.reservasServices.getUsuario(params["nombre_usuario"]).subscribe(
      res =>{
        //Guardamos los datos del usuario
        this.aux = res
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.id = this.aux[0].id
        this.usuario.empresa = this.aux[0].empresa   
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo 
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento  
        this.usuario.id_empresa = this.aux[0].id_empresa 
        this.usuario.foto = this.aux[0].foto  
        //Llamamos a la función que nos da las reservas del usuario
        this.getReservasUsuario();
        //Llamamos a la función que genera el calendario
        this.generateCalendar();
      },
      err => console.error(err)
    );
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la pantalla inicial del perfil del usuario
  volver(){
    let ruta =  '/reservas/usuario/' + this.usuario.nombre_usuario
    this.router.navigate([ruta])
  }

  //Función que obtiene las reservas del usuario y las pone en el formato que queremos
  getReservasUsuario(){
    this.reservasServices.getReservasDelUsuario(this.usuario.nombre_usuario).subscribe(
      res =>{
        this.mis_reservas = res

        //Guardamos todas las fechas de las reservas para poder manipularla 
        let fecha = '0000-00-00'

        //Comprobaremos las fechas de todas las reservas y guardaremos el recurso y la hora en un vector de vectores llamado "horas"
        //cada elemento o fila representa una fecha y cada columna son los recursos más las horas a las que se ha reservado dicho día        //No siemrpe
        //Las fechas se encuentran en orden, ya que la función nos las devuelve ya ordenadas
        //de esta forma, sabremos a qué fechas corresponde cada hora y recurso cuando leamos el vector
        for(const reserva of this.mis_reservas){
          let last = new Array()
          //Si es la misma fecha que la anterior (ya que están en orden), guardamos 
          //la hora y el recurso en la misma fila que la reserva anterior
          if (fecha == reserva.fecha){
            //Guardamos en otro vector, el recurso y la hora de la reserva 
            //para poder mostrarlas en el formato que queremos
            let s = reserva.nombre_rs + "<br>" + reserva.hora;
            last = last.concat(this.mis_horas[this.mis_horas.length-1])
            last = last.concat(s)
            last.sort();
            this.mis_horas[this.mis_horas.length-1] = last
          }else{
            //Si no, añadimos un nuevo elemento al vector de vectores
            this.mis_fechas.push(reserva.fecha);
            let s = reserva.nombre_rs + "<br>" + reserva.hora;
            last.push(s)
            this.mis_horas.push(last)
          }
          //Actializamos la fecha para comparar la última leída
          fecha = reserva.fecha
        }

      },
      err => console.error(err)
    );
  }

  //Función que lleva a la página donde se nos muestran los datos de la reserva seleccionada
  verReserva(date: number, hora: string, month: string){  
    //Primero cogemos la fecha y le ponemos el formato que necesitamos
    let fecha = "";
    if(date < 10){
      fecha = month + '-0' + date;
    }else{
      fecha = month + '-' + date;
    }
    //Dividimos la hora para obtener los valores que queremos, ya que esta contiene el nombre del recurso y la hora de la reserva
    let partes = hora.split(">")
    let id = 0
    //Recorremos el vector de reservas y comprobamos si hay una reserva para el recurso
    //a la hora que tenemos guardada
    //De esta forma, podremos buscar la reserva y obtener su identificador
    for(const reserva of this.mis_reservas){
      const fechaFormateadaActual =  moment(reserva.fecha).format('YYYY-MM-DD')
      //Si encontramos una que coincida en fecha y hora, guardamos el identificador
      if(fechaFormateadaActual == fecha && reserva.hora == partes[1]){
        id = reserva.id_reserva
      }
    }
    let ruta = this.router.url + '/ver/' + id
    this.router.navigate([ruta])
  }

  //Esta fucnión nos permite obtener el mes actual y la cantidad de días que tiene
  get currentMonthDates(): number[] {
    const primerDia = this.currentMonth.clone().startOf('month').day();
    const diasDelMes = this.currentMonth.daysInMonth();
    const dates = Array.from({ length: 42 }, (_, i) =>
      i >= primerDia && i < primerDia + diasDelMes
        ? i - primerDia + 1
        : 0
    );
    return dates;
  }

  //Obtenemos el valor del mes anterior al que se nos muestra en pantalla y llamamos a la 
  //función generateCalendar para que se genere el calendario de dicho mes
  mesAnterior() {
    this.currentMonth = this.currentMonth.clone().subtract(1, 'month');
    this.generateCalendar();
  }
  
  //Esta función hace lo mismo que la anterior pero para el mes siguiete al actual:
  //Obtenemos el valor del mes siguiente al que se nos muestra en pantalla y llamamos a la 
  //función generateCalendar para que se genere el calendario de dicho mes
  siguienteMes() {
    this.currentMonth = this.currentMonth.clone().add(1, 'month');
    this.generateCalendar();
  }

//Función que genera el calendario del mes seleccionado, es decir, obtiene los días del mes
//Esta función guarda en una matriz los días del mes, en el que las filas representan la semanas y las columnas los días
generateCalendar() {
  //Obtenemos el primer días del mes, es decir, de 1 a 7 en función del día de Lunes a Domingo
  const primerDia = this.currentMonth.clone().startOf('month').day();
  //Obtenemos la cantidad de días que tiene el mes
  const diasDelMes = this.currentMonth.daysInMonth();
  //El vector semenas será la matriz que contendrá las semanas con los días
  const semenas = [];
  
  //Llenamos un vector con siete 0s que será nuestra primera semana, donde los 0s significa que no existe el día
  let semana = new Array(7).fill(0);
  
  //Indicamos que el primer día del mes es el día 1, inicializando la variable diaActual a 1
  //Emprezamos a rellenar en orden numérico los huecos del vector a partir del primer día del mes hasta completar 7
  let diaActual = 1;
  for (let i = primerDia-1; i < 7; i++) {
    semana[i] = diaActual;
    diaActual++;
  }
  
  //Añadimos la primera semana ya creada enla matriz "semanas"
  semenas.push(semana);
  
  //Iremos avanzandodías hasta llegar al último días del mes
  while (diaActual <= diasDelMes) {
    //Crearemos un vector de tamaño 7 relleno de 0s
    semana = new Array(7).fill(0);
    //Introduciremos el valor del día correspondiente hasta rellenar el vector
    for (let i = 0; i < 7 && diaActual <= diasDelMes; i++) {
      semana[i] = diaActual;
      diaActual++;
    }
    //Añadiremos este vector a la matriz "semanas"
    semenas.push(semana);
    //Se repetirá esto hasta llegar al último día del mes
  }
  
  //Copiaremos la matriz en una variable externa para poder manipularla fuera de la función
  this.semanas = semenas;

}

  //Función que cambia el formato de todas las fechas
  getFechasReservas(fechas: string[]): string[] {
    return fechas.map(reserva => moment(reserva).format('YYYY-MM-DD'));
  }
  
  // Verificar si hay reservas en una fecha específica y devuelve un booleano
  //Usaremos esta función para saber qué fechas tienen reserva y cuales no
  tengoReserva(date: number): boolean {
    const fecha = this.currentMonth.clone().date(date);
    const fechaFormateada = fecha.format('YYYY-MM-DD');
    return this.getFechasReservas(this.mis_fechas).includes(fechaFormateada);
  }


i: number = 0

//Esta función nos devuelve la hora en función de la fecha
  //La usaremos para poder pintar el nombre del recurso y la hora en el calendario
getMisHoras(date: number, month: string){
  //Ponemos la fecha en el formato correcto para trabajar con ella
  let fecha = "";
  if (date < 10) {
    fecha = month + '-0' + date;
  } else {
    fecha = month + '-' + date;
  }

  let index = 0;
  //Recorremos el vector de fechas en el formato correcto para encontrar el índice donde está guardada la fecha
  for (const fechaReserva of this.getFechasReservas(this.mis_fechas)) {
    if (fechaReserva == fecha) {
      this.i = index;
    }
    index++;
  }
  //Devolvemos la hora y el recurso que se encuentra en el vector "horas" en el mismo índice que la fecha (ya que deben coincidir)
  return this.mis_horas[this.i];
}

//Función que nos permite recergar la página para actualizar las reservas
irAmisReservas(){
  window.location.reload();
}

//Función que nos permite ir a la página que nos muestra las reservas que pertenecen a todos los usuarios de la empresa
verTodasLasReservas(){
  let ruta = 'reservas/usuario/' + this.usuario.nombre_usuario + '/todas_reservas'
  this.router.navigate([ruta])
}
}
