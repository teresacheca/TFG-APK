import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdmiGeneralComponent } from './admi-general/admi-general.component';
import { AdmiEmpresaComponent } from './admi-empresa/admi-empresa.component';
import { ListaSolicitudesComponent } from './lista-solicitudes/lista-solicitudes.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { ListaAdmiEmpresaComponent } from './lista-admi-empresa/lista-admi-empresa.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { AgEditaAdmiEmpresaComponent } from './ag-edita-admi-empresa/ag-edita-admi-empresa.component';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';
import { AgVeUsuarioComponent } from './ag-ve-usuario/ag-ve-usuario.component';
import { AeEditaPerfilComponent } from './ae-edita-perfil/ae-edita-perfil.component';
import { AeListaUsuariosComponent } from './ae-lista-usuarios/ae-lista-usuarios.component';
import { AeEditaUsuarioComponent } from './ae-edita-usuario/ae-edita-usuario.component';
import { AeAniadeUsuarioComponent } from './ae-aniade-usuario/ae-aniade-usuario.component';
import { AeListaRecursosComponent } from './ae-lista-recursos/ae-lista-recursos.component';
import { AeDatosRecursoComponent } from './ae-datos-recurso/ae-datos-recurso.component';
import { AeEditaRecursoComponent } from './ae-edita-recurso/ae-edita-recurso.component';
import { AeAniadeRecursoComponent } from './ae-aniade-recurso/ae-aniade-recurso.component';
import { AeListaReservasComponent } from './ae-lista-reservas/ae-lista-reservas.component';
import { AeVeReservaComponent } from './ae-ve-reserva/ae-ve-reserva.component';
import { AeEditaReservaComponent } from './ae-edita-reserva/ae-edita-reserva.component';
import { UsuarioEditaPerfilComponent } from './usuario-edita-perfil/usuario-edita-perfil.component';
import { UsuarioVeReservasComponent } from './usuario-ve-reservas/usuario-ve-reservas.component';
import { UsuarioRealizaReservaComponent } from './usuario-realiza-reserva/usuario-realiza-reserva.component';
import { UsuarioInfoReservaComponent } from './usuario-info-reserva/usuario-info-reserva.component';
import { UsuarioEditaReservaComponent } from './usuario-edita-reserva/usuario-edita-reserva.component';
import { UsuarioRealizaReservaRecursoComponent } from './usuario-realiza-reserva-recurso/usuario-realiza-reserva-recurso.component';
import { UsuarioVeTodasReservasComponent } from './usuario-ve-todas-reservas/usuario-ve-todas-reservas.component';
import { AgAniadeAdmiEmpresaComponent } from './ag-aniade-admi-empresa/ag-aniade-admi-empresa.component';
//rutas para rederigir dentro de la página
const routes: Routes = [
  {
    path: '',
    redirectTo: '/reservas/login',
    pathMatch: 'full'
  },
  //Rutas inicial del login
  {
    path: 'reservas/login',
    component: LoginComponent
  },
  //Ruta para crear la solicitud de la empresa
  {
    path: 'reservas/solicitud',
    component: SolicitudComponent
  },

  //ACCIONES DEL ADMINISTRADOR GENERAL

  //Ruta que muestra la lista de solicitudes
  {
    path: 'reservas/:nombre_usuario/lista_solicitudes',
    component: ListaSolicitudesComponent
  },
  //Ruta para obtener las solicitudes aceptadas
  {
    path: 'reservas/:nombre_usuario/lista_solicitudes/aceptadas',
    component: ListaSolicitudesComponent
  },
  //Ruta para obtener las solicitudes rechazadas
  {
    path: 'reservas/:nombre_usuario/lista_solicitudes/rechazadas',
    component: ListaSolicitudesComponent
  },
  //Ruta para obtener las solicitudes pendientes
  {
    path: 'reservas/:nombre_usuario/lista_solicitudes/pendientes',
    component: ListaSolicitudesComponent
  },
  //Ruta que muestra la información de una solicitud
  {
    path: 'reservas/:nombre_usuario/lista_solicitudes/:id_solicitud',
    component: VerSolicitudComponent
  },
  //Ruta que actualiza la información de la solicitud
  {
    path: 'reservas/:nombre_usuario/lista_solicitudes/:id_solicitud/actualizar',
    component: VerSolicitudComponent
  },
  //Ruta para eliminar una solicitud
  {
    path: 'reservas/:nombre_usuario/lista_solicitudes/:id_solicitud/eliminar',
    component: VerSolicitudComponent
  },
  //Ruta para ver la información de una solicitud en concreto
  {
    path: 'reservas/:nombre_usuario/lista_solicitudes/:id_solicitud/:nombre_empresa',
    component: VerSolicitudComponent
  },
  //Ruta que muestra la lista de empresas
  {
    path: 'reservas/:nombre_usuario/empresas',
    component: EmpresasComponent
  },
  //Rutas que va al perfil de una empresa por su identificador o por su nombre
  {
    path: 'reservas/:nombre_usuario/empresas/:id_empresa',
    component: EmpresaComponent
  },
  {
    path: 'reservas/:nombre_usuario/empresas/:nombre_empresa',
    component: EmpresaComponent
  },
  //Ruta que devuelve la información de una empresa
  {
    path: 'reservas/:nombre_usuario/empresas/:id_empresa/id',
    component: EmpresaComponent
  },
  //Ruta que elimina el perfil de una empresa
  {
    path: 'reservas/:nombre_usuario/empresas/eliminar/:id_empresa',
    component: EmpresaComponent
  },
  //Ruta que actualiza los cambios en los datos del perfil de la empresa
  {
    path: 'reservas/:nombre_usuario/empresas/cambiar/:id_empresa',
    component: EmpresaComponent
  },
  //Ruta que muestra la lista de administradores de una empresa
  {
    path: 'reservas/:nombre_usuario/empresas/:id_empresa/lista_administradores',
    component: ListaAdmiEmpresaComponent
  },
  //Ruta para añadir a un nuevo administrador de la empresa
  {
    path: 'reservas/:nombre_usuario/empresas/:id_empresa/lista_administradores/aniadir',
    component: AgAniadeAdmiEmpresaComponent
  },
  //Ruta para ver la información de un administrador de la empresa
  {
    path: 'reservas/:nombre_usuario/empresas/:id_empresa/lista_administradores/:id',
    component: AgEditaAdmiEmpresaComponent
  },
  //Ruta para eliminar la cuenta de un administrador de la empresa
  {
    path: 'reservas/:nombre_usuario/empresas/:id_empresa/lista_administradores/:id/eliminar',
    component: AgEditaAdmiEmpresaComponent
  },
  //Ruta que muestra la lista de usuarios de la empresa para el administrador general
  {
    path: 'reservas/:nombre_usuario/empresas/:id_empresa/lista_usuarios',
    component: ListaUsuariosComponent
  },
  //Ruta que muestra la información de un sólo usuario
  {
    path: 'reservas/:nombre_usuario/empresas/:id_empresa/lista_usuarios/:id',
    component: AgVeUsuarioComponent
  },
  //Ruta para editar el perfil de la empresa
  {
    path: 'reservas/:nombre_usuario/empresas/:id_empresa/editar_pefil',
    component: EditarEmpresaComponent
  },
  //Ruta que muestra la página principal del perfil del administrador general
  {
    path: 'reservas/admi_general/:nombre_usuario',
    component: AdmiGeneralComponent
  },

  //ACCIONES DEL ADMINISTRADOR DE LA EMPRESA

  //Ruta que muestra la página principal del perfil del administrador de la empresa
  {
    path: 'reservas/admi_empresa/:nombre_usuario',
    component: AdmiEmpresaComponent
  },
  //Ruta para editar los datos del perfil del adminsitrador de la empresa
  {
    path: 'reservas/admi_empresa/:nombre_usuario/editar',
    component: AeEditaPerfilComponent
  },
  //Ruta para guardar los datos modificados del perfil del administrador de la empresa
  {
    path: 'reservas/admi_empresa/:nombre_usuario/editar/guardar',
    component: AeEditaPerfilComponent
  },
  //Ruta para que el administrador de la empresa elimine su propia cuenta
  {
    path: 'reservas/admi_empresa/:nombre_usuario/editar/eliminar',
    component: AeEditaPerfilComponent
  },
  //Ruta en la que se muestra la lista de usuarios de la empresa
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios',
    component: AeListaUsuariosComponent
  },
  //Ruta para eliminar las reservas de un usuario
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/eliminar_reservas_usuario',
    component: AeListaUsuariosComponent
  },
  //Ruta para añadir a un nuevo usuario a la empresa
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/aniade',
    component: AeAniadeUsuarioComponent
  },
  //Ruta para guardar los datos del nuevo usuario de la empresa
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/aniade/guardar',
    component: AeAniadeUsuarioComponent
  },
  //Ruta para ver la información de u usuario de la empresa
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id',
    component: AeEditaUsuarioComponent
  },
  //Ruta para editar la información de un usuario
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id/editar',
    component: AeEditaUsuarioComponent
  },
  //Ruta para eliminar la cuenta del usuario
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id/eliminar',
    component: AeEditaUsuarioComponent
  },
  //Ruta para eliminar una reserva de un usuario
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id_reserva/eliminar_reserva',
    component: AeEditaUsuarioComponent
  },
  //Ruta que muestra la lista de recursos
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos',
    component: AeListaRecursosComponent
  },
  //Ruta que nos devuelve todos los recursos de la empresa
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/get',
    component: AeListaRecursosComponent
  },
  //Ruta para añadir un nuevo recurso a la empresa
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/aniade',
    component: AeAniadeRecursoComponent
  },
  //Ruta para guardar la información del nuevo recurso
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/aniade/guardar',
    component: AeAniadeRecursoComponent
  },
  //Ruta para ver la información de un recurso 
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/:id_recursoservicio',
    component: AeDatosRecursoComponent
  },
  //Ruta para actualizar la información de una reserva
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/:id_reserva/actualizar',
    component: AeDatosRecursoComponent
  },
  //Ruta para editar la información de un recurso
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/:id_recursoservicio/editar',
    component: AeEditaRecursoComponent
  },
  //Ruta para eliminar un recurso
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/:id_recursoservicio/eliminar',
    component: AeEditaRecursoComponent
  },
  //Ruta que muestra la lista de reservas
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas',
    component: AeListaReservasComponent
  },
  //Ruta para obtener todas las reservas de una empresa
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/get',
    component: AeListaReservasComponent
  }, 
  //Ruta que muestra la información de una reserva
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/:id_reserva',
    component: AeVeReservaComponent
  },
  //Ruta para editar la información de una reserva
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/:id_reserva/editar',
    component: AeEditaReservaComponent
  },
  //Ruta para guardar los cambios de la reserva
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/:id_reserva/editar/guardar',
    component: AeEditaReservaComponent
  },
  //Ruta para elimianr la reserva
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/:id_reserva/eliminar',
    component: AeEditaReservaComponent
  },

  //ACCIONES DE LOS USUARIOS

  //Ruta que muestra la pantalla principal del perfil del usuario
  {
    path: 'reservas/usuario/:nombre_usuario',
    component: UsuariosComponent
  },
  //Ruta para editar los datos del perfil del usuario
  {
    path: 'reservas/usuario/:nombre_usuario/editar',
    component: UsuarioEditaPerfilComponent
  },
  //Ruta para guardar los cambios del perfil del usuario
  {
    path: 'reservas/usuario/:nombre_usuario/editar/guardar',
    component: UsuarioEditaPerfilComponent
  },
  //Ruta para eliminar la cuenta del usuario
  {
    path: 'reservas/usuario/:nombre_usuario/eliminar',
    component: UsuarioEditaPerfilComponent
  },
  //Ruta que muestra la lista de las reservas
  {
    path: 'reservas/usuario/:nombre_usuario/reservas',
    component: UsuarioVeReservasComponent
  },
  //Ruta que muestra la información de una reserva
  {
    path: 'reservas/usuario/:nombre_usuario/reservas/ver/:id_reserva',
    component: UsuarioInfoReservaComponent
  },
  //Ruta para editar una reserva
  {
    path: 'reservas/usuario/:nombre_usuario/reservas/ver/:id_reserva/editar',
    component: UsuarioEditaReservaComponent
  },
  //Ruta para guardar los cambios en los datos de la reserva
  {
    path: 'reservas/usuario/:nombre_usuario/reservas/ver/:id_reserva/editar/guardar',
    component: UsuarioEditaReservaComponent
  },
  //Ruta para eliminar una reserva
  {
    path: 'reservas/usuario/:nombre_usuario/reservas/ver/:id_reserva/eliminar',
    component: UsuarioEditaReservaComponent
  },
  //Ruta para obtener todas las reservas de una empresa
  {
    path: 'reservas/usuario/:nombre_usuario/reservas/:id_empresa',
    component: UsuarioVeReservasComponent
  }, 
  //Ruta que nos lleva a ver la lista de todas las reservas de la empresa
  {
    path: 'reservas/usuario/:nombre_usuario/todas_reservas',
    component: UsuarioVeTodasReservasComponent
  }, 
  //Ruta que lleva al usuario a la página para elegir un recurso para realizar una reserva
  {
    path: 'reservas/usuario/:nombre_usuario/realiza_reserva',
    component: UsuarioRealizaReservaComponent
  }, 
  //Ruta que lleva al usuario a hacer una reserva
  {
    path: 'reservas/usuario/:nombre_usuario/realiza_reserva/recurso/:id_recursoservicio',
    component: UsuarioRealizaReservaRecursoComponent
  },
  //Ruta que devuevelve los datos de un recurso
  {
    path: 'reservas/usuario/:nombre_usuario/realiza_reserva/recurso/:id_recursoservicio/get',
    component: UsuarioRealizaReservaRecursoComponent
  },
  //Ruta para reservas un recurso
  {
    path: 'reservas/usuario/:nombre_usuario/realiza_reserva/recurso/:id_recursoservicio/reserva',
    component: UsuarioRealizaReservaRecursoComponent
  },
  //Ruta para obtener los datos de la empresa
  {
    path: 'reservas/usuario/:nombre_usuario/realiza_reserva/:id_empresa',
    component: UsuarioRealizaReservaComponent
  }, 
  //Ruta que muestra todas las empresas al administrador general
  {
    path: 'reservas/admi_general/:nombre_usuario/:nombre_usuario/empresas',
    component: AdmiGeneralComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
