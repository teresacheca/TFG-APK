import {Request, Response } from 'express';
import pool from '../basedatos'

class ReservasController{
    
    //getUsuarioLogin: compueba que el nombre de usuario y contraseña exista en la base de datos para un usuario
    public async getUsuarioLogin(req: Request, res: Response){
        const usuario = await pool.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ? and contrasena = ?', [req.params.nombre, req.params.contrasena]);
        return res.json(usuario[0])
    }

    //crearEmpresa: crea la instancia una nueva solicitud de una empresa
    public async crearEmpresa(req: Request, res: Response){
        pool.query('INSERT INTO solicitud (nombre_empresa, datos_de_contacto, descripcion, logo, direccion, estado) VALUES (?, ?, ?, ?, ?, ?)', [req.body.nombre_empresa, req.body.datos_de_contacto, req.body.descripcion, req.body.logo, req.body.direccion,'Pendiente'])
        res.json({message: 'la empresa se ha creado'});
    }

    //getEmpresas: devuelve todas las empresas de la base de datos
    public async getEmpresas(req: Request, res: Response) { 
        const empresas = await pool.promise().query('SELECT * FROM Empresas');
        const rows = empresas[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    } 

    //getSolicitudes: devuelve todas las solicitudes que hay en la base de datos
    public async getSolicitudes(req: Request, res: Response) { 
        const solicitudes = await pool.promise().query('SELECT * FROM solicitud');
        const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    } 

    //getSolicitudesAceptadas: devuelve todas las solicitudes aceptadas que hay en la base de datos
    public async getSolicitudesAceptadas(req: Request, res: Response) { 
        const solicitudes = await pool.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["aceptada"]);
        const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //getSolicitudesRechazadas: devuelve todas las solicitudes rechazadas que hay en la base de datos
    public async getSolicitudesRechazadas(req: Request, res: Response) { 
        const solicitudes = await pool.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["rechazada"]);
        const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //getSolicitudesPendientes: devuelve todas las solicitudes pendientes que hay en la base de datos
    public async getSolicitudesPendientes(req: Request, res: Response) { 
        const solicitudes = await pool.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["pendiente"]);
        const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //getEmpresa: devuelve los datos de una empresa en función de su nombre
    public async getEmpresa(req: Request, res: Response) { 
        const empresa = await pool.promise().query('SELECT * FROM Empresas WHERE nombre_empresa = ?', [req.params.nombre_empresa]);
        const rows = empresa[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    } 

    //getEmpresaId:  devuelve los datos de la empresa en función de su identificador
    public async getEmpresaId(req: Request, res: Response) { 
        const empresa = await pool.promise().query('SELECT * FROM Empresas WHERE id_empresa = ?', [req.params.id_empresa]);
        const rows = empresa[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //eliminarEmpresa: elimina la instancia de una empresa
    public async eliminarEmpresa(req: Request, res: Response){
        const aux = await pool.promise().query('DELETE FROM Empresas WHERE id_empresa = ?', [req.params.id_empresa]);
        res.json({message: 'la reserva fue eliminada'}) 
    }

    //eliminarReservasUsuario: elimina las reservas de una usuario según su nombre de usuario
    public async eliminarReservasUsuario(req: Request, res: Response){
        const aux = await pool.promise().query('DELETE FROM Reservas WHERE id_empresa = ? and nombre_usuario=?', [req.params.id_empresa, req.params.nombre_usuario]);
        res.json({message: 'la reserva fue eliminada'}) 
    }

    //guardarCambios: guarda los cambios en los datos de la instacia de una emrpesa
    public async guardarCambios(req: Request, res: Response){
        await pool.promise().query('UPDATE Empresas set ? WHERE id_empresa = ?', [req.body, req.params.id_empresa]);
        res.json({message: 'La reserva fue actualizada'})
    }

    //getAdministradoresEmpresa: devuelve los administradores de una empresa en función del identificador de la empresa
    public async getAdministradoresEmpresa(req: Request, res: Response) { 
        const administradores = await pool.promise().query('SELECT * FROM Usuarios WHERE id_empresa = ? and tipo = 1', [req.params.id_empresa]);
        const rows = administradores[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    } 

    //getUsuariosEmpresa: devuelve los usuarios de una empresa en función de su identificador
    public async getUsuariosEmpresa(req: Request, res: Response) { 
        const usuarios = await pool.promise().query('SELECT * FROM Usuarios WHERE id_empresa = ? and tipo = 2', [req.params.id_empresa]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //getAdministradorEmpresa:  devuelve los datos de un sólo administrador en función de su identificador
    public async getAdministradorEmpresa(req: Request, res: Response) { 
        const usuarios = await pool.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //eliminarCuentaAdmiEmpresa:  elimina la cuenta de un administrador de la empresa en fucnión de si identificador
    public async eliminarCuentaAdmiEmpresa(req: Request, res: Response) { 
        const aux = await pool.promise().query('DELETE FROM Usuarios WHERE id = ?', [req.params.id]);
        res.json({message: 'el usuario fue eliminado'})
    }

    //guardarCambiosAdmiEmpresa: actualiza los datos de un administrador de una empresa 
    public async guardarCambiosAdmiEmpresa(req: Request, res: Response) { 
        await pool.promise().query('UPDATE Usuarios set ? WHERE id = ?', [req.body, req.params.id]);
        res.json({message: 'La reserva fue actualizada'})
    }

    //getSolicitud: devuelve los datos de una solicitud en función de su identificador
    public async getSolicitud(req: Request, res: Response) { 
        const solicitud = await pool.promise().query('SELECT * FROM solicitud WHERE id_solicitud = ?', [req.params.id_solicitud]);
        const rows = solicitud[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //nuevaEmpresa: crea una instancia de una nueva empresa
    public async nuevaEmpresa(req: Request, res: Response) { 
        pool.query('INSERT INTO Empresas (nombre_empresa, datos_de_contacto, descripcion, logo, direccion) VALUES (?, ?, ?, ?, ?)', [req.body.nombre_empresa, req.body.datos_de_contacto, req.body.descripcion, req.body.logo, req.body.direccion]);
        res.json({message: 'la empresa se ha creado'});
    }

    //actualizarSolicitud: actualiza los datos de una solicitud dado su identificador
    public async actualizarSolicitud(req: Request, res: Response) { 
        await pool.promise().query('UPDATE Solicitud set ? WHERE id_solicitud = ?', [req.body, req.params.id_solicitud]);
        res.json({message: 'La reserva fue actualizada'})
    }
    
    //eliminarSolicitud: elimina una solicitud dado su identificador
    public async eliminarSolicitud(req: Request, res: Response) { 
        const aux = await pool.promise().query('DELETE FROM Solicitud WHERE id_solicitud = ?', [req.params.id_solicitud]);
        res.json({message: 'el usuario fue eliminada'})
    }

    //getUsuarioNombre: obtiene los datos de un usuario dado su nombre
    public async getUsuarioNombre(req: Request, res: Response) { 
        const usuario = await pool.promise().query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
        const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //getDatosAdministradorEmpresa: obtine los daots de un administrador de una empresa dado su nombre
    public async getDatosAdministradorEmpresa(req: Request, res: Response) { 
        const usuarios = await pool.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //guardarCambiosUsuario: guarda los cambios en los datods de un usuario dado su nombre
    public async guardarCambiosUsuario(req: Request, res: Response) { 
        await pool.promise().query('UPDATE Usuarios set ? WHERE nombre_usuario = ?', [req.body, req.params.nombre_usuario]);
        res.json({message: 'La reserva fue actualizada'})
    }

    //eliminarCuentaAdmiEmpresaAe: elimina la cuenta de un administrador de una empresa dado su nombre
    public async eliminarCuentaAdmiEmpresaAe(req: Request, res: Response){
        const aux = await pool.promise().query('DELETE FROM Usuarios WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
        res.json({message: 'la reserva fue eliminada'}) 
    }

    //getUsuariosEmpresaAe: obtiene los usuario de una empresa dado el identificador de la empresa
    public async getUsuariosEmpresaAe(req: Request, res: Response) { 
        const usuarios = await pool.promise().query('SELECT * FROM Usuarios WHERE id_empresa = ? and tipo = 2', [req.params.id_empresa]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //getUsuarioId: obtiene los datos de un usuario dado su identificador
    public async getUsuarioId(req: Request, res: Response) { 
        const usuarios = await pool.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //guardarCambiosUsuarioAe: actualiza la información de un usuario dado su identificador
    public async guardarCambiosUsuarioAe(req: Request, res: Response) { 
        await pool.promise().query('UPDATE Usuarios set ? WHERE id = ?', [req.body, req.params.id]);
        res.json({message: 'La reserva fue actualizada'})
    }

    //eliminarCuentaUsuarioAe: elimina la cuenta de un usuario dado su identificador
    public async eliminarCuentaUsuarioAe(req: Request, res: Response){
        const usuario = await pool.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
        await pool.promise().query('DELETE FROM Usuarios WHERE id= ?', [req.params.id]);
        res.json(usuario[0]);
    }

    //AeaniadeUsuario: añade un nuevo usuario a la empresa
    public async AeaniadeUsuario(req: Request, res: Response) { 
        pool.query('INSERT INTO Usuarios (nombre_usuario, contrasena, fecha_nacimiento, puesto_trabajo, empresa, tipo, id_empresa, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [req.body.nombre_usuario, req.body.contrasena, req.body.fecha_nacimiento, req.body.puesto_trabajo, req.body.empresa, 2, req.body.id_empresa, req.body.foto]);
        res.json({message: 'el usuario se ha creado'});
    }

    //AgAniadeAdmi: añade un nuevo administrador a una empresa
    public async AgAniadeAdmi(req: Request, res: Response) { 
        pool.query('INSERT INTO Usuarios (nombre_usuario, contrasena, fecha_nacimiento, puesto_trabajo, empresa, tipo, id_empresa, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [req.body.nombre_usuario, req.body.contrasena, req.body.fecha_nacimiento, req.body.puesto_trabajo, req.body.empresa, 1, req.body.id_empresa, req.body.foto]);
        res.json({message: 'el usuario se ha creado'});
    }

    //getRecursos: devuelve los recursos de una empresa dado el identificador de la empresa
    public async getRecursos(req: Request, res: Response) { 
        const recursos = await pool.promise().query('SELECT * FROM RecursoServicio WHERE id_empresa = ?', [req.params.id_empresa]);
        const rows = recursos[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //getDatosRecurso: devuelve los datos de un recurso dado su identificador
    public async getDatosRecurso(req: Request, res: Response) { 
        const recurso = await pool.promise().query('SELECT * FROM RecursoServicio WHERE id_recursoservicio = ?', [req.params.id_recursoservicio]);
        const rows = recurso[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //guardarCambiosRecursoAe: actualiza los datos de un recurso dado su identificador
    public async guardarCambiosRecursoAe(req: Request, res: Response) { 
        await pool.promise().query('UPDATE RecursoServicio set ? WHERE id_recursoservicio = ?', [req.body, req.params.id_recursoservicio]);
        res.json({message: 'El recurso fue actualizada'})
    }

    //actualizarReserva: actualiza los datos de una reserva dado su identificador
    public async actualizarReserva(req: Request, res: Response) { 
        await pool.promise().query('UPDATE Reservas set ? WHERE id_reserva = ?', [req.body, req.params.id_reserva]);
        res.json({message: 'La reserva fue actualizada'})
    }

    //eliminarRescursoAe: elimina un recurso de la base de datos
    public async eliminarRescursoAe(req: Request, res: Response){
        const aux = await pool.promise().query('DELETE FROM RecursoServicio WHERE id_recursoservicio= ?', [req.params.id_recursoservicio]);
        await pool.promise().query('DELETE FROM Reservas WHERE id_recursoservicio= ?', [req.params.id_recursoservicio]);
        res.json({message: 'El recurso fue eliminada'}) 
    }

    //AeaniadeRecurso: añade un recurso a una empresa
    public async AeaniadeRecurso(req: Request, res: Response) { 
        pool.query('INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.body.nombre_rs, req.body.descripcion, req.body.foto, req.body.datos, req.body.aforo, req.body.nombre_empresa, req.body.id_empresa]);
        res.json({message: 'el recurso o servicio se ha creado'});
    }

    //getReservasAe: devuelve las reservas de una empresa dado el identificador de la empresa
    public async getReservasAe(req: Request, res: Response) { 
        const reservas = await pool.promise().query('SELECT * FROM reservas WHERE id_empresa = ?', [req.params.id_empresa]);
        const rows = reservas[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //getReservaId: devuelve los datos de una reserva dado el identificador de esta
    public async getReservaId(req: Request, res: Response) { 
        const usuarios = await pool.promise().query('SELECT * FROM Reservas WHERE id_reserva = ?', [req.params.id_reserva]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //guardaCambiosReserva: actualiza los cambios de una reserva dado su identificador
    public async guardaCambiosReserva(req: Request, res: Response) { 
        await pool.promise().query('UPDATE Reservas set ? WHERE id_reserva = ?', [req.body, req.params.id_reserva]);
        res.json({message: 'La reserva fue actualizada'})
    }

    //eliminaReserva: elimina una reserva de la base de datos
    public async eliminaReserva(req: Request, res: Response){
        const aux = await pool.promise().query('DELETE FROM Reservas WHERE id_reserva= ?', [req.params.id_reserva]);
        res.json({message: 'La reserva fue eliminada'}) 
    }

    //getUsuario: devuelve los datos de un usaurio dado su nombre
    public async getUsuario(req: Request, res: Response) { 
        const usuario = await pool.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
        const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }
 
    //guardarCambiosUsuarioUsu: guarda los cambios en el perfil del usuario dado su nombre
    public async guardarCambiosUsuarioUsu(req: Request, res: Response) { 
        await pool.promise().query('UPDATE Usuarios set ? WHERE nombre_usuario = ?', [req.body, req.params.nombre_usuario]);
        res.json({message: 'El usuario fue actualizada'})
    }

    //eliminarCuentaUsuarioUsu: elimina la cuenta de un usuario junto a las reservas que este tenía hechas
    public async eliminarCuentaUsuarioUsu(req: Request, res: Response){
        const aux = await pool.promise().query('DELETE FROM Usuarios WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
        await pool.promise().query('DELETE FROM Reservas WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
        res.json({message: 'el usuario fue eliminada'}) 
    }

    //getReservasDelUsuario: devuelve las reservas de un usuario dado el nombre del usuario
    public async getReservasDelUsuario(req: Request, res: Response) { 
        const usuario = await pool.promise().query('SELECT * FROM Reservas WHERE nombre_usuario = ? order by fecha', [req.params.nombre_usuario]);
        const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //getReservasEmpresa: devuelve las reservas de una empresa dado su identificador
    public async getReservasEmpresa(req: Request, res: Response) { 
        const reservas = await pool.promise().query('SELECT * FROM Reservas WHERE id_empresa = ? order by fecha', [req.params.id_empresa]);
        const rows = reservas[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    //crearReserva: crea una nueva reserva
    public async crearReserva(req: Request, res: Response) { 
        let fecha = new Date(req.body.fecha)
        pool.query('INSERT INTO Reservas (nombre_rs, nombre_usuario, nombre_empresa, fecha, hora, id_recursoservicio, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.body.nombre_rs, req.params.nombre_usuario, req.body.nombre_empresa, fecha, req.body.hora, req.params.id_recursoservicio, req.body.id_empresa]);
        res.json({message: 'la reserva se ha creado'});
    }
}

const reservasController = new ReservasController();
export default reservasController;