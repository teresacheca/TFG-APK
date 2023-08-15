import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { ReservasFormComponent } from './components/reservas-form/reservas-form.component';
import { ReservasListComponent } from './components/reservas-list/reservas-list.component';

import {ReservasService} from './services/reservas.service';
import {FormsModule} from '@angular/forms';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule  } from '@angular/material/dialog';
import { UsuarioVeTodasReservasComponent } from './usuario-ve-todas-reservas/usuario-ve-todas-reservas.component';
import { AgAniadeAdmiEmpresaComponent } from './ag-aniade-admi-empresa/ag-aniade-admi-empresa.component';


@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    ReservasFormComponent,
    ReservasListComponent,
    LoginComponent,
    SolicitudComponent,
    EmpresasComponent,
    UsuariosComponent,
    AdmiGeneralComponent,
    AdmiEmpresaComponent,
    ListaSolicitudesComponent,
    EmpresaComponent,
    ListaAdmiEmpresaComponent,
    ListaUsuariosComponent,
    EditarEmpresaComponent,
    AgEditaAdmiEmpresaComponent,
    VerSolicitudComponent,
    AgVeUsuarioComponent,
    AeEditaPerfilComponent,
    AeListaUsuariosComponent,
    AeEditaUsuarioComponent,
    AeAniadeUsuarioComponent,
    AeListaRecursosComponent,
    AeDatosRecursoComponent,
    AeEditaRecursoComponent,
    AeAniadeRecursoComponent,
    AeListaReservasComponent,
    AeVeReservaComponent,
    AeEditaReservaComponent,
    UsuarioEditaPerfilComponent,
    UsuarioVeReservasComponent,
    UsuarioRealizaReservaComponent,
    UsuarioInfoReservaComponent,
    UsuarioEditaReservaComponent,
    UsuarioRealizaReservaRecursoComponent,
    UsuarioVeTodasReservasComponent,
    AgAniadeAdmiEmpresaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, 
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatDialogModule 
  ],
  providers: [ReservasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
