export interface Usuario{
    nombre_usuario: string,
    contrasena: string,
    fecha_nacimiento?: Date,
    puesto_trabajo?: string,
    empresa: string, 
    tipo: number,
    id: number,
    foto: string
    id_empresa: number
}