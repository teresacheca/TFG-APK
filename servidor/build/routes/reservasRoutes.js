"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservasController_1 = __importDefault(require("../controllers/reservasController"));
class ReservasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Rutas del administrador de la empresa (ver app-routing.component.css)
        this.router.get('/admi_empresa/:nombre_usuario/get', reservasController_1.default.getUsuarioNombre);
        this.router.get('/admi_empresa/:nombre_usuario/editar', reservasController_1.default.getDatosAdministradorEmpresa);
        this.router.put('/admi_empresa/:nombre_usuario/editar/guardar', reservasController_1.default.guardarCambiosUsuario);
        this.router.delete('/admi_empresa/:nombre_usuario/editar/eliminar', reservasController_1.default.eliminarCuentaAdmiEmpresaAe);
        this.router.delete('/admi_empresa/:nombre_usuario/:id_empresa/eliminar_reservas_usuario', reservasController_1.default.eliminarReservasUsuario);
        this.router.get('/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios', reservasController_1.default.getUsuariosEmpresaAe);
        this.router.post('/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/aniade/guardar', reservasController_1.default.AeaniadeUsuario);
        this.router.get('/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id', reservasController_1.default.getUsuarioId);
        this.router.put('/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id/editar', reservasController_1.default.guardarCambiosUsuarioAe);
        this.router.delete('/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id/eliminar', reservasController_1.default.eliminarCuentaUsuarioAe);
        this.router.delete('/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id_reserva/eliminar_reserva', reservasController_1.default.eliminaReserva);
        this.router.get('/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/get', reservasController_1.default.getRecursos);
        this.router.get('/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/:id_recursoservicio', reservasController_1.default.getDatosRecurso);
        this.router.put('/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/:id_reserva/actualizar', reservasController_1.default.actualizarReserva);
        this.router.put('/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/:id_recursoservicio/editar', reservasController_1.default.guardarCambiosRecursoAe);
        this.router.delete('/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/:id_recursoservicio/eliminar', reservasController_1.default.eliminarRescursoAe);
        this.router.post('/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/aniade/guardar', reservasController_1.default.AeaniadeRecurso);
        this.router.get('/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/get', reservasController_1.default.getReservasAe);
        this.router.get('/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/:id_reserva', reservasController_1.default.getReservaId);
        this.router.put('/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/:id_reserva/editar/guardar', reservasController_1.default.guardaCambiosReserva);
        this.router.delete('/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/:id_reserva/eliminar', reservasController_1.default.eliminaReserva);
        //Rutas del usuario (ver app-routing.component.css)
        this.router.get('/usuario/:nombre_usuario/editar', reservasController_1.default.getUsuario);
        this.router.put('/usuario/:nombre_usuario/editar/guardar', reservasController_1.default.guardarCambiosUsuarioUsu);
        this.router.delete('/usuario/:nombre_usuario/eliminar', reservasController_1.default.eliminarCuentaUsuarioUsu);
        this.router.get('/usuario/:nombre_usuario/reservas', reservasController_1.default.getReservasDelUsuario);
        this.router.get('/usuario/:nombre_usuario/reservas/:id_empresa', reservasController_1.default.getReservasEmpresa);
        this.router.get('/usuario/:nombre_usuario/reservas/ver/:id_reserva', reservasController_1.default.getReservaId);
        this.router.put('/usuario/:nombre_usuario/reservas/ver/:id_reserva/editar/guardar', reservasController_1.default.guardaCambiosReserva);
        this.router.delete('/usuario/:nombre_usuario/reservas/ver/:id_reserva/eliminar', reservasController_1.default.eliminaReserva);
        this.router.get('/usuario/:nombre_usuario/realiza_reserva/:id_empresa', reservasController_1.default.getRecursos);
        this.router.get('/usuario/:nombre_usuario/realiza_reserva/recurso/:id_recursoservicio/get', reservasController_1.default.getDatosRecurso);
        this.router.post('/usuario/:nombre_usuario/realiza_reserva/recurso/:id_recursoservicio/reserva', reservasController_1.default.crearReserva);
        //Rutas del administrador general (ver app-routing.component.css)
        this.router.get('/:nombre_usuario/empresas', reservasController_1.default.getEmpresas);
        this.router.put('/:nombre_usuario/empresas/cambiar/:id_empresa', reservasController_1.default.guardarCambios);
        this.router.get('/:nombre_usuario/empresas/:nombre_empresa', reservasController_1.default.getEmpresa);
        this.router.get('/:nombre_usuario/empresas/:id_empresa/id', reservasController_1.default.getEmpresaId);
        this.router.delete('/:nombre_usuario/empresas/eliminar/:id_empresa', reservasController_1.default.eliminarEmpresa);
        this.router.get('/:nombre_usuario/empresas/:id_empresa/lista_administradores', reservasController_1.default.getAdministradoresEmpresa);
        this.router.post('/:nombre_usuario/empresas/:id_empresa/lista_administradores/aniadir', reservasController_1.default.AgAniadeAdmi);
        this.router.get('/:nombre_usuario/empresas/:id_empresa/lista_administradores/:id', reservasController_1.default.getAdministradorEmpresa);
        this.router.delete('/:nombre_usuario/empresas/:id_empresa/lista_administradores/:id/eliminar', reservasController_1.default.eliminarCuentaAdmiEmpresa);
        this.router.put('/:nombre_usuario/empresas/:id_empresa/lista_administradores/:id', reservasController_1.default.guardarCambiosAdmiEmpresa);
        this.router.get('/:nombre_usuario/empresas/:id_empresa/lista_usuarios', reservasController_1.default.getUsuariosEmpresa);
        this.router.get('/:nombre_usuario/empresas/:id_empresa/lista_usuarios/:nombre_usuario', reservasController_1.default.getUsuarioNombre);
        this.router.get('/:nombre_usuario/lista_solicitudes', reservasController_1.default.getSolicitudes);
        this.router.get('/:nombre_usuario/lista_solicitudes/aceptadas', reservasController_1.default.getSolicitudesAceptadas);
        this.router.get('/:nombre_usuario/lista_solicitudes/rechazadas', reservasController_1.default.getSolicitudesRechazadas);
        this.router.get('/:nombre_usuario/lista_solicitudes/pendientes', reservasController_1.default.getSolicitudesPendientes);
        this.router.get('/:nombre_usuario/lista_solicitudes/:id_solicitud', reservasController_1.default.getSolicitud);
        this.router.put('/:nombre_usuario/lista_solicitudes/:id_solicitud/actualizar', reservasController_1.default.actualizarSolicitud);
        this.router.delete('/:nombre_usuario/lista_solicitudes/:id_solicitud/eliminar', reservasController_1.default.eliminarSolicitud);
        this.router.post('/:nombre_usuario/lista_solicitudes/:id_solicitud/:nombre_empresa', reservasController_1.default.nuevaEmpresa);
        this.router.get('/:nombre_usuario/lista_solicitudes', reservasController_1.default.getSolicitudes);
        //Rutas para comprobar las credenciales de los usuarios (ver app-routing.component.css)
        this.router.get('/:nombre/:contrasena', reservasController_1.default.getUsuarioLogin); //mostrar una reserva
        this.router.post('/:nombre_usuario/empresas/:nombre_empresa', reservasController_1.default.crearEmpresa);
    }
}
const reservasRoutes = new ReservasRoutes();
exports.default = reservasRoutes.router;
