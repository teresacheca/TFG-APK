import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; //para hacer peticiones http

import {Reserva} from '../modelos/Reservas' ///importar la interfaz
import {Empresa} from '../modelos/Empresas' ///importar la interfaz
import {Usuario} from '../modelos/Usuarios' ///importar la interfaz
import {Recurso} from '../modelos/Recursos'
import {Solicitud} from '../modelos/Solicitud'

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http:HttpClient) { }

  //getLogin: función que nos lleva a la ruta adecuada para comprobar las credenciales del usuario
  getLogin(nombre: string, contrasena: string){  
    return this.http.get(`${this.API_URI}/reservas/${nombre}/${contrasena}`);
  }

  //getReservas: función que nos lleva a la ruta adecuada para obtener las reservas
  getReservas(){ 
    return this.http.get(`${this.API_URI}/reservas`)
  }

  //getReserva: función que nos lleva a la ruta adecuada para obtener una reserva en funciñon de su fecha
  getReserva(fecha: string){ 
    return this.http.get(`${this.API_URI}/reservas/${fecha}`);
  }

  //saveReserva: función que nos lleva a la ruta adecuada para guardar una reserva
  saveReserva(reserva: Reserva){  
    return this.http.post(`${this.API_URI}/reservas`, reserva);
  }

  //deleteReserva: función que nos lleva a la ruta adecuada para eliminar una reserva
  deleteReserva(fecha: string){
    return this.http.delete(`${this.API_URI}/reservas/${fecha}`);
  }

  //updateReserva: función que nos lleva a la ruta adecuada para acutializar una reserva
  updateReserva(fecha: string|number, updatedReserva: Reserva){
    return this.http.put(`${this.API_URI}/reservas/${fecha}`, updatedReserva);
  }

  //crearSolicitud: función que nos lleva a la ruta adecuada para crear una nueva solicitud
  crearSolicitud(nombre_usuario: string, empresa: Empresa){  
    return this.http.post(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${empresa.nombre_empresa}`, empresa);
  }

  //getEmpresas: función que nos lleva a la ruta adecuada para obtener las empresas que hay en la base de datos
  getEmpresas(nombre_usuario: string){ 
    console.log(nombre_usuario)
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas`);
  }

  //getSolicitudes: función que nos lleva a la ruta adecuada para obtener todas las solicitudes de las empresas
  getSolicitudes(nombre_usuario: string){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes`); 
  }

  //getSolicitudesAceptadas: función que nos lleva a la ruta adecuada para obtener todas las solicitudes aceptadas de las empresas
  getSolicitudesAceptadas(nombre_usuario: string){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/aceptadas`); 
  }

  //getSolicitudesRechazadas: función que nos lleva a la ruta adecuada para obtener todas las solicitudes rechazadas de las empresas
  getSolicitudesRechazadas(nombre_usuario: string){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/rechazadas`); 
  }

  //getSolicitudesPendientes: función que nos lleva a la ruta adecuada para obtener todas las solicitudes pendientes de las empresas
  getSolicitudesPendientes(nombre_usuario: string){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/pendientes`); 
  }

  //getEmpresa: función que nos lleva a la ruta adecuada para obtener los datos de una empresa dado su nombre
  getEmpresa(nombre_usuario: string, empresa : string){
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${empresa}`);
  }
  
  //getEmpresaId: función que nos lleva a la ruta adecuada para obtener los datos de una empresa dado su identificador
  getEmpresaId(nombre_usuario: string,id_empresa : number){
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/id`);
  }
  
  //eliminarEmpresa: función que nos lleva a la ruta adecuada para eliminar la instancia de una empresa
  eliminarEmpresa(nombre_usuario: string,id_empresa : number){ 
    return this.http.delete(`${this.API_URI}/reservas/${nombre_usuario}/empresas/eliminar/${id_empresa}`);
  }

  //guardarCambios: función que nos lleva a la ruta adecuada para actualizar los cambios en los datos de una empresa
  guardarCambios(nombre_usuario: string, id_empresa : number, nueva: Empresa){
    return this.http.put(`${this.API_URI}/reservas/${nombre_usuario}/empresas/cambiar/${id_empresa}`, nueva);
  }
  
  //getAdministradoresEmpresa: función que nos lleva a la ruta adecuada para obtener a todos los administradores de una empresa
  getAdministradoresEmpresa(nombre_usuario: string,id_empresa: number){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_administradores`)
  }

  //getUsuariosEmpresa: función que nos lleva a la ruta adecuada para obtener a todos los usuarios de una empresa
  getUsuariosEmpresa(nombre_usuario: string, id_empresa: number){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_usuarios`)
  }

  //getAdministradorEmpresa: función que nos lleva a la ruta adecuada para obtener los datos de un administrador de una empresa
  getAdministradorEmpresa(nombre_usuario: string, id: number, id_empresa: number){
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_administradores/${id}`)
  }
  
  //eliminarCuentaAdmiEmpresa: función que nos lleva a la ruta adecuada para eliminar la cuenta de una administrador de una empresa
  eliminarCuentaAdmiEmpresa(nombre_usuario: string, id: number, id_empresa: number){ 
    return this.http.delete(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_administradores/${id}/eliminar`)
  }

  //guardarCambiosAdmiEmpresa: función que nos lleva a la ruta adecuada para actualizar los datos de un administrador de una empresa
  guardarCambiosAdmiEmpresa(nombre_usuario: string, id: number, id_empresa: number, nuevoAdmi: Usuario){ 
    return this.http.put(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_administradores/${id}`, nuevoAdmi)
  }
  
  //getSolicitud: función que nos lleva a la ruta adecuada para obtener una solicitud dado su identificador
  getSolicitud(nombre_usuario: string,id: number){
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/${id}`);
  }

  //nuevaEmpresa: función que nos lleva a la ruta adecuada para crear una nueva instancia de una empresa
  nuevaEmpresa(nombre_usuario: string,id_solicitud: number, nombre_empresa: string, empresa: Empresa){  
    return this.http.post(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/${id_solicitud}/${nombre_empresa}`, empresa);
  }

  //eliminarSolicitud: función que nos lleva a la ruta adecuada para eliminar una solicitud de la base de datos
  eliminarSolicitud(nombre_usuario: string,id_solicitud: number){  
    return this.http.delete(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/${id_solicitud}/eliminar`);
  }

  //actualizarSolicitud: función que nos lleva a la ruta adecuada para actualizar los datos de una solicitud
  actualizarSolicitud(nombre_usuario: string,id_solicitud: number, nuevaSolicitud: Solicitud){  
    return this.http.put(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/${id_solicitud}/actualizar`, nuevaSolicitud);
  }

  //getUsuarioag: función que nos lleva a la ruta adecuada para obtener los datos de un usuario
  getUsuarioag(id_empresa: number, id:number, nombre_usuario: string){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_usuarios/${id}`);
  }
  
  //getUsuarioNombre: función que nos lleva a la ruta adecuada para obtener los datos de un usuario dado su nombre
  getUsuarioNombre(nombre: string){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre}/get`)
  }

  //getDatosAdministradorEmpresa: función que nos lleva a la ruta adecuada para editar los datos de un administrador de una empresa
  getDatosAdministradorEmpresa(nombre_usuario: string, id_empresa: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/editar`)
  }

  
  //guardarCambiosAdmiEmpresaAe: función que nos lleva a la ruta adecuada para actualizar la informaci´`on de un administrador de una empresa
  guardarCambiosAdmiEmpresaAe(nombre_usuario: string, nuevoAdmi: Usuario){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/editar/guardar`, nuevoAdmi)
  }

  //eliminarCuentaAdmiEmpresaAe: función que nos lleva a la ruta adecuada para eliminar la cuenta de un administrador de una empresa
  eliminarCuentaAdmiEmpresaAe(nombre_usuario: string){ 
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/editar/eliminar`)
  }

  //getUsuariosEmpresaAe: función que nos lleva a la ruta adecuada para obtener a los usuarios de una empresa
  getUsuariosEmpresaAe(nombre_usuario: string, id_empresa: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/${id_empresa}/lista_usuarios`)
  }

  //getUsuarioId: función que nos lleva a la ruta adecuada para obtener los datos de un usuario dado su identificador
  getUsuarioId(nombre_usuario: string, id_empresa: number, id: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/${id_empresa}/lista_usuarios/${id}`)
  }

  //guardarCambiosUsuarioAe: función que nos lleva a la ruta adecuada para actualizar los datos de un usuario
  guardarCambiosUsuarioAe(nombre_admi: string, id_empresa: number, id: number, nuevoUsuario: Usuario){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_usuarios/${id}/editar`, nuevoUsuario)
  }

  //eliminarCuentaUsuarioAe: función que nos lleva a la ruta adecuada para eliminar la cuenta de un usuario
  eliminarCuentaUsuarioAe(nombre_admi: string, id_empresa: number, id: number){
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_usuarios/${id}/eliminar`)
  }

  //actualizarReserva: función que nos lleva a la ruta adecuada paraactualizar los datos de una reserva
  actualizarReserva(nombre_admi: string, id_empresa: number, id_reserva:number, nuevaReserva: Reserva){
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_recursos/${id_reserva}/actualizar`, nuevaReserva)
  }

  //eliminarReservas: función que nos lleva a la ruta adecuada para eliminar una reserva
  eliminarReservas(nombre_admi: string, id_empresa: number, id_reserva:number){
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_usuarios/${id_reserva}/eliminar_reserva`)
  }

  //eliminarReservasUsuario: función que nos lleva a la ruta adecuada para eliminar todas las reservas de un usuario
  eliminarReservasUsuario(nombre_usuario: string, id_empresa: number){
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/${id_empresa}/eliminar_reservas_usuario`)
  }

  //AeaniadeUsuario: función que nos lleva a la ruta adecuada para añadir un nuevo usuario a una empresa
  AeaniadeUsuario(usuario: Usuario, nombre_admi: string, id_empresa: number){
    return this.http.post(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_usuarios/aniade/guardar`, usuario)
  }

  //AgAniadeAdmi: función que nos lleva a la ruta adecuada para añadir un nuevo administrador a una empresa
  AgAniadeAdmi(usuario: Usuario, nombre_admi: string, id_empresa: number){
    return this.http.post(`${this.API_URI}/reservas/${nombre_admi}/empresas/${id_empresa}/lista_administradores/aniadir`, usuario)
  }

  //getRecursosAe: función que nos lleva a la ruta adecuada para obtener todos los recursos de una empresa
  getRecursosAe(nombre_admi: string, id_empresa: number){
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_recursos/get`)
  }
  
  //getDatosRecursoAe: función que nos lleva a la ruta adecuada para obtener los datos de un recurso
  getDatosRecursoAe(nombre_admi: string, id_empresa: number, id_recursoservicio: number){
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_recursos/${id_recursoservicio}`)
  }

  //guardarCambiosRecursoAe: función que nos lleva a la ruta adecuada para actualizar los datos de un recurso
  guardarCambiosRecursoAe(nombre_admi: string, id_empresa: number, id_recursoservicio: number, nuevoRecurso: Recurso){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_recursos/${id_recursoservicio}/editar`, nuevoRecurso)
  }

  //eliminarRescursoAe: función que nos lleva a la ruta adecuada para eliminar un recurso de una empresa
  eliminarRescursoAe(nombre_admi: string, id_empresa: number, id_recursoservicio: number){ 
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_recursos/${id_recursoservicio}/eliminar`)
  }

  //AeaniadeRecurso: función que nos lleva a la ruta adecuada para añadir un recurso a una empresa
  AeaniadeRecurso(nuevoRecurso: Recurso, nombre_admi: string, id_empresa: number){ 
    return this.http.post(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_recursos/aniade/guardar`, nuevoRecurso)
  }

  //getReservasAe: función que nos lleva a la ruta adecuada para obtener todas las reservas de una empresa
  getReservasAe(nombre_admi: string, id_empresa: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_reservas/get`)
  }

  //getReservaId: función que nos lleva a la ruta adecuada para obtener la información de una reserva dado su identificador
  getReservaId(nombre_admi: string, id_empresa: number, id_reserva: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_reservas/${id_reserva}`)
  }

  //AeguardaCambiosReserva: función que nos lleva a la ruta adecuada para actualizar los cambios en una reserva
  AeguardaCambiosReserva(nombre_admi: string, id_empresa: number, id_reserva: number, nuevaReserva: Reserva){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_reservas/${id_reserva}/editar/guardar`, nuevaReserva)
  }

  //AeEliminaReserva: función que nos lleva a la ruta adecuada para eliminar una reserva
  AeEliminaReserva(nombre_admi: string, id_empresa: number, id_reserva: number){ 
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_reservas/${id_reserva}/eliminar`)
  }

  //getUsuario: función que nos lleva a la ruta adecuada para dar la posibilidad de editar los datos del perfil de un usuario
  getUsuario(nombre_usuario: string){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/editar`)
  }

  //guardarCambiosUsuario: función que nos lleva a la ruta adecuada para actualizaar los datos de un usuario
  guardarCambiosUsuario(nombre_usuario: string, nuevoUsuario: Usuario){
    return this.http.put(`${this.API_URI}/reservas/usuario/${nombre_usuario}/editar/guardar`, nuevoUsuario)
  }

  //eliminarCuentaUsuarioUsu: función que nos lleva a la ruta adecuada paraeliminar la cuenta de un usuario
  eliminarCuentaUsuarioUsu(nombre_usuario: string){
    return this.http.delete(`${this.API_URI}/reservas/usuario/${nombre_usuario}/eliminar`)
  }

  //getReservasDelUsuario: función que nos lleva a la ruta adecuada para obtener las reserva de un usuario dado su nombre
  getReservasDelUsuario(nombre_usuario: string){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/reservas`)
  }

  //getReservasEmpresa: función que nos lleva a la ruta adecuada para obtener las reservas de una empresa
  getReservasEmpresa(nombre_usuario: string, id_empresa: number){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/reservas/${id_empresa}`)
  }

  //getReservaIdUsu: función que nos lleva a la ruta adecuada para obtener las reservas de un usuario dado su identificador
  getReservaIdUsu(nombre_usuario: string, id_reserva: number){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/reservas/ver/${id_reserva}`)
  }

  //guardaCambiosReservaUsu: función que nos lleva a la ruta adecuada para actualizar los datos en una reserva de un usuario
  guardaCambiosReservaUsu(nombre_usuario: string, id_reserva: number, nuevaReserva: Reserva){
    return this.http.put(`${this.API_URI}/reservas/usuario/${nombre_usuario}/reservas/ver/${id_reserva}/editar/guardar`, nuevaReserva)
  }

  //eliminaReservaUsu: función que nos lleva a la ruta adecuada para eliminar una reserva de un usuario
  eliminaReservaUsu(nombre_usuario: string, id_reserva: number){
    return this.http.delete(`${this.API_URI}/reservas/usuario/${nombre_usuario}/reservas/ver/${id_reserva}/eliminar`)
  }

  //getRecursos: función que nos lleva a la ruta adecuada para obtener todos los recursos de una empresa antes de realizar una reserva de ellos
  getRecursos(nombre_usuario: string, id_empresa: number){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/realiza_reserva/${id_empresa}`)
  }

  //getDatosRecursoUsu: función que nos lleva a la ruta adecuada para obtener los datos de un recurso
  getDatosRecursoUsu(nombre_usuario: string, id_recursoservicio: number){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/realiza_reserva/recurso/${id_recursoservicio}/get`)
  }

  //crearReserva: función que nos lleva a la ruta adecuada para crear una nueva reserva de un recurso
  crearReserva(nombre_usuario: string, id_recursoservicio: number, nuevaReserva: Reserva){
    return this.http.post(`${this.API_URI}/reservas/usuario/${nombre_usuario}/realiza_reserva/recurso/${id_recursoservicio}/reserva`, nuevaReserva)
  }



}
