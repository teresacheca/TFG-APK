"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basedatos_1 = __importDefault(require("../basedatos"));
class ReservasController {
    //getUsuarioLogin: compueba que el nombre de usuario y contraseña exista en la base de datos para un usuario
    getUsuarioLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ? and contrasena = ?', [req.params.nombre, req.params.contrasena]);
            return res.json(usuario[0]);
        });
    }
    //crearEmpresa: crea la instancia una nueva solicitud de una empresa
    crearEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            basedatos_1.default.query('INSERT INTO solicitud (nombre_empresa, datos_de_contacto, descripcion, logo, direccion, estado) VALUES (?, ?, ?, ?, ?, ?)', [req.body.nombre_empresa, req.body.datos_de_contacto, req.body.descripcion, req.body.logo, req.body.direccion, 'Pendiente']);
            res.json({ message: 'la empresa se ha creado' });
        });
    }
    //getEmpresas: devuelve todas las empresas de la base de datos
    getEmpresas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empresas = yield basedatos_1.default.promise().query('SELECT * FROM Empresas');
            const rows = empresas[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getSolicitudes: devuelve todas las solicitudes que hay en la base de datos
    getSolicitudes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitudes = yield basedatos_1.default.promise().query('SELECT * FROM solicitud');
            const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getSolicitudesAceptadas: devuelve todas las solicitudes aceptadas que hay en la base de datos
    getSolicitudesAceptadas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitudes = yield basedatos_1.default.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["aceptada"]);
            const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getSolicitudesRechazadas: devuelve todas las solicitudes rechazadas que hay en la base de datos
    getSolicitudesRechazadas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitudes = yield basedatos_1.default.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["rechazada"]);
            const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getSolicitudesPendientes: devuelve todas las solicitudes pendientes que hay en la base de datos
    getSolicitudesPendientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitudes = yield basedatos_1.default.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["pendiente"]);
            const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getEmpresa: devuelve los datos de una empresa en función de su nombre
    getEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empresa = yield basedatos_1.default.promise().query('SELECT * FROM Empresas WHERE nombre_empresa = ?', [req.params.nombre_empresa]);
            const rows = empresa[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getEmpresaId:  devuelve los datos de la empresa en función de su identificador
    getEmpresaId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empresa = yield basedatos_1.default.promise().query('SELECT * FROM Empresas WHERE id_empresa = ?', [req.params.id_empresa]);
            const rows = empresa[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //eliminarEmpresa: elimina la instancia de una empresa
    eliminarEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Empresas WHERE id_empresa = ?', [req.params.id_empresa]);
            res.json({ message: 'la reserva fue eliminada' });
        });
    }
    //eliminarReservasUsuario: elimina las reservas de una usuario según su nombre de usuario
    eliminarReservasUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Reservas WHERE id_empresa = ? and nombre_usuario=?', [req.params.id_empresa, req.params.nombre_usuario]);
            res.json({ message: 'la reserva fue eliminada' });
        });
    }
    //guardarCambios: guarda los cambios en los datos de la instacia de una emrpesa
    guardarCambios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Empresas set ? WHERE id_empresa = ?', [req.body, req.params.id_empresa]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    //getAdministradoresEmpresa: devuelve los administradores de una empresa en función del identificador de la empresa
    getAdministradoresEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const administradores = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id_empresa = ? and tipo = 1', [req.params.id_empresa]);
            const rows = administradores[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getUsuariosEmpresa: devuelve los usuarios de una empresa en función de su identificador
    getUsuariosEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id_empresa = ? and tipo = 2', [req.params.id_empresa]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getAdministradorEmpresa:  devuelve los datos de un sólo administrador en función de su identificador
    getAdministradorEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //eliminarCuentaAdmiEmpresa:  elimina la cuenta de un administrador de la empresa en fucnión de si identificador
    eliminarCuentaAdmiEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Usuarios WHERE id = ?', [req.params.id]);
            res.json({ message: 'el usuario fue eliminado' });
        });
    }
    //guardarCambiosAdmiEmpresa: actualiza los datos de un administrador de una empresa 
    guardarCambiosAdmiEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Usuarios set ? WHERE id = ?', [req.body, req.params.id]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    //getSolicitud: devuelve los datos de una solicitud en función de su identificador
    getSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitud = yield basedatos_1.default.promise().query('SELECT * FROM solicitud WHERE id_solicitud = ?', [req.params.id_solicitud]);
            const rows = solicitud[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //nuevaEmpresa: crea una instancia de una nueva empresa
    nuevaEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            basedatos_1.default.query('INSERT INTO Empresas (nombre_empresa, datos_de_contacto, descripcion, logo, direccion) VALUES (?, ?, ?, ?, ?)', [req.body.nombre_empresa, req.body.datos_de_contacto, req.body.descripcion, req.body.logo, req.body.direccion]);
            res.json({ message: 'la empresa se ha creado' });
        });
    }
    //actualizarSolicitud: actualiza los datos de una solicitud dado su identificador
    actualizarSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Solicitud set ? WHERE id_solicitud = ?', [req.body, req.params.id_solicitud]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    //eliminarSolicitud: elimina una solicitud dado su identificador
    eliminarSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Solicitud WHERE id_solicitud = ?', [req.params.id_solicitud]);
            res.json({ message: 'el usuario fue eliminada' });
        });
    }
    //getUsuarioNombre: obtiene los datos de un usuario dado su nombre
    getUsuarioNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield basedatos_1.default.promise().query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
            const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getDatosAdministradorEmpresa: obtine los daots de un administrador de una empresa dado su nombre
    getDatosAdministradorEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //guardarCambiosUsuario: guarda los cambios en los datods de un usuario dado su nombre
    guardarCambiosUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Usuarios set ? WHERE nombre_usuario = ?', [req.body, req.params.nombre_usuario]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    //eliminarCuentaAdmiEmpresaAe: elimina la cuenta de un administrador de una empresa dado su nombre
    eliminarCuentaAdmiEmpresaAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Usuarios WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
            res.json({ message: 'la reserva fue eliminada' });
        });
    }
    //getUsuariosEmpresaAe: obtiene los usuario de una empresa dado el identificador de la empresa
    getUsuariosEmpresaAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id_empresa = ? and tipo = 2', [req.params.id_empresa]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getUsuarioId: obtiene los datos de un usuario dado su identificador
    getUsuarioId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //guardarCambiosUsuarioAe: actualiza la información de un usuario dado su identificador
    guardarCambiosUsuarioAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Usuarios set ? WHERE id = ?', [req.body, req.params.id]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    //eliminarCuentaUsuarioAe: elimina la cuenta de un usuario dado su identificador
    eliminarCuentaUsuarioAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
            yield basedatos_1.default.promise().query('DELETE FROM Usuarios WHERE id= ?', [req.params.id]);
            res.json(usuario[0]);
        });
    }
    //AeaniadeUsuario: añade un nuevo usuario a la empresa
    AeaniadeUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            basedatos_1.default.query('INSERT INTO Usuarios (nombre_usuario, contrasena, fecha_nacimiento, puesto_trabajo, empresa, tipo, id_empresa, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [req.body.nombre_usuario, req.body.contrasena, req.body.fecha_nacimiento, req.body.puesto_trabajo, req.body.empresa, 2, req.body.id_empresa, req.body.foto]);
            res.json({ message: 'el usuario se ha creado' });
        });
    }
    //AgAniadeAdmi: añade un nuevo administrador a una empresa
    AgAniadeAdmi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            basedatos_1.default.query('INSERT INTO Usuarios (nombre_usuario, contrasena, fecha_nacimiento, puesto_trabajo, empresa, tipo, id_empresa, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [req.body.nombre_usuario, req.body.contrasena, req.body.fecha_nacimiento, req.body.puesto_trabajo, req.body.empresa, 1, req.body.id_empresa, req.body.foto]);
            res.json({ message: 'el usuario se ha creado' });
        });
    }
    //getRecursos: devuelve los recursos de una empresa dado el identificador de la empresa
    getRecursos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recursos = yield basedatos_1.default.promise().query('SELECT * FROM RecursoServicio WHERE id_empresa = ?', [req.params.id_empresa]);
            const rows = recursos[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getDatosRecurso: devuelve los datos de un recurso dado su identificador
    getDatosRecurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recurso = yield basedatos_1.default.promise().query('SELECT * FROM RecursoServicio WHERE id_recursoservicio = ?', [req.params.id_recursoservicio]);
            const rows = recurso[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //guardarCambiosRecursoAe: actualiza los datos de un recurso dado su identificador
    guardarCambiosRecursoAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE RecursoServicio set ? WHERE id_recursoservicio = ?', [req.body, req.params.id_recursoservicio]);
            res.json({ message: 'El recurso fue actualizada' });
        });
    }
    //actualizarReserva: actualiza los datos de una reserva dado su identificador
    actualizarReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Reservas set ? WHERE id_reserva = ?', [req.body, req.params.id_reserva]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    //eliminarRescursoAe: elimina un recurso de la base de datos
    eliminarRescursoAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM RecursoServicio WHERE id_recursoservicio= ?', [req.params.id_recursoservicio]);
            yield basedatos_1.default.promise().query('DELETE FROM Reservas WHERE id_recursoservicio= ?', [req.params.id_recursoservicio]);
            res.json({ message: 'El recurso fue eliminada' });
        });
    }
    //AeaniadeRecurso: añade un recurso a una empresa
    AeaniadeRecurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            basedatos_1.default.query('INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.body.nombre_rs, req.body.descripcion, req.body.foto, req.body.datos, req.body.aforo, req.body.nombre_empresa, req.body.id_empresa]);
            res.json({ message: 'el recurso o servicio se ha creado' });
        });
    }
    //getReservasAe: devuelve las reservas de una empresa dado el identificador de la empresa
    getReservasAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = yield basedatos_1.default.promise().query('SELECT * FROM reservas WHERE id_empresa = ?', [req.params.id_empresa]);
            const rows = reservas[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getReservaId: devuelve los datos de una reserva dado el identificador de esta
    getReservaId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Reservas WHERE id_reserva = ?', [req.params.id_reserva]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //guardaCambiosReserva: actualiza los cambios de una reserva dado su identificador
    guardaCambiosReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Reservas set ? WHERE id_reserva = ?', [req.body, req.params.id_reserva]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    //eliminaReserva: elimina una reserva de la base de datos
    eliminaReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Reservas WHERE id_reserva= ?', [req.params.id_reserva]);
            res.json({ message: 'La reserva fue eliminada' });
        });
    }
    //getUsuario: devuelve los datos de un usaurio dado su nombre
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
            const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //guardarCambiosUsuarioUsu: guarda los cambios en el perfil del usuario dado su nombre
    guardarCambiosUsuarioUsu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Usuarios set ? WHERE nombre_usuario = ?', [req.body, req.params.nombre_usuario]);
            res.json({ message: 'El usuario fue actualizada' });
        });
    }
    //eliminarCuentaUsuarioUsu: elimina la cuenta de un usuario junto a las reservas que este tenía hechas
    eliminarCuentaUsuarioUsu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Usuarios WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
            yield basedatos_1.default.promise().query('DELETE FROM Reservas WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
            res.json({ message: 'el usuario fue eliminada' });
        });
    }
    //getReservasDelUsuario: devuelve las reservas de un usuario dado el nombre del usuario
    getReservasDelUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield basedatos_1.default.promise().query('SELECT * FROM Reservas WHERE nombre_usuario = ? order by fecha', [req.params.nombre_usuario]);
            const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //getReservasEmpresa: devuelve las reservas de una empresa dado su identificador
    getReservasEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = yield basedatos_1.default.promise().query('SELECT * FROM Reservas WHERE id_empresa = ? order by fecha', [req.params.id_empresa]);
            const rows = reservas[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    //crearReserva: crea una nueva reserva
    crearReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let fecha = new Date(req.body.fecha);
            basedatos_1.default.query('INSERT INTO Reservas (nombre_rs, nombre_usuario, nombre_empresa, fecha, hora, id_recursoservicio, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.body.nombre_rs, req.params.nombre_usuario, req.body.nombre_empresa, fecha, req.body.hora, req.params.id_recursoservicio, req.body.id_empresa]);
            res.json({ message: 'la reserva se ha creado' });
        });
    }
}
const reservasController = new ReservasController();
exports.default = reservasController;
