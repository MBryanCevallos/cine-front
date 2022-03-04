export interface credencialesUsuario { // 5 configurar las interfaces
    email: string;
    password: string;
}

export interface respuestaAutenticacion { // 6 respuesta de los endpoint del back
    token: string;
    expiracion: Date;
}
export interface usuarioDTO{
    Id: string;
    Email: string;
}
