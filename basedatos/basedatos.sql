CREATE DATABASE base_datos_reservas;

USE base_datos_reservas;

DROP TABLE IF EXISTS solicitud;
DROP TABLE IF EXISTS consulta_usuario;
DROP TABLE IF EXISTS hace;
DROP TABLE IF EXISTS pertenece;
DROP TABLE IF EXISTS consulta_admi;
DROP TABLE IF EXISTS perteneceA;
DROP TABLE IF EXISTS tiene;
DROP TABLE IF EXISTS crea;
DROP TABLE IF EXISTS alta;
DROP TABLE IF EXISTS añade;
DROP TABLE IF EXISTS crea_instancia;
DROP TABLE IF EXISTS Reservas;
DROP TABLE IF EXISTS RecursoServicio;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Administradores_empresa;
DROP TABLE IF EXISTS Empresas;
DROP TABLE IF EXISTS Administrador_general;

CREATE TABLE Administrador_general (
    nombre_admi_general VARCHAR(100) NOT NULL PRIMARY KEY,
    contrasena VARCHAR(100) NOT NULL
);

CREATE TABLE Empresas (
    nombre_empresa VARCHAR(100) NOT NULL UNIQUE,
    datos_de_contacto VARCHAR(100),
    descripcion VARCHAR(100), 
    logo VARCHAR(100), 
    direccion VARCHAR(100),
    id_empresa INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE Administradores_empresa (
    nombre_admi_empresa VARCHAR(100) NOT NULL PRIMARY KEY,
    contrasena VARCHAR(100),
    empresa VARCHAR(100),
    id_empresa INT (10)
);

CREATE TABLE Usuarios (
    nombre_usuario VARCHAR(100) NOT NULL PRIMARY KEY,
    contrasena VARCHAR(100),
    fecha_nacimiento DATE,
    puesto_trabajo VARCHAR(100),
    empresa VARCHAR(100), 
    id_empresa INT (10),
    tipo INT(10),
    foto VARCHAR(1000),
    id INT(10) AUTO_INCREMENT UNIQUE
);

CREATE TABLE RecursoServicio (
    nombre_rs VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100),
    foto VARCHAR(100),
    datos VARCHAR(100),
    aforo INT(10),
    nombre_empresa VARCHAR(100),
    id_empresa INT (10),
    id_recursoservicio INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE Reservas (
    fecha DATE, 
    hora TIME,
    nombre_empresa VARCHAR(100),
    id_empresa INT (10),
    nombre_usuario VARCHAR(100),
    nombre_rs VARCHAR(100),
    id_recursoservicio INT (100),
    id_reserva INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE crea_instancia (
    nombre_empresa VARCHAR(100),
    nombre_admi_general VARCHAR(100),
    FOREIGN KEY (nombre_empresa) REFERENCES Empresas(nombre_empresa),
    FOREIGN KEY (nombre_admi_general) REFERENCES Administrador_general(nombre_admi_general),
    PRIMARY KEY (nombre_empresa, nombre_admi_general)
);

CREATE TABLE añade (
    nombre_admi_empresa VARCHAR(100),
    nombre_admi_general VARCHAR(100),
    FOREIGN KEY (nombre_admi_empresa) REFERENCES Administradores_empresa(nombre_admi_empresa),
    FOREIGN KEY (nombre_admi_general) REFERENCES Administrador_general(nombre_admi_general),
    PRIMARY KEY (nombre_admi_empresa, nombre_admi_general)
);

CREATE TABLE alta (
    nombre_usuario VARCHAR(100),
    nombre_admi_empresa VARCHAR(100),
    FOREIGN KEY (nombre_usuario) REFERENCES Usuarios(nombre_usuario),
    FOREIGN KEY (nombre_admi_empresa) REFERENCES Administradores_empresa(nombre_admi_empresa),
    PRIMARY KEY (nombre_usuario, nombre_admi_empresa)
);

CREATE TABLE crea (
    nombre_rs VARCHAR(100),
    nombre_admi_empresa VARCHAR(100),
    FOREIGN KEY (nombre_rs) REFERENCES RecursoServicio(nombre_rs),
    FOREIGN KEY (nombre_admi_empresa) REFERENCES Administradores_empresa(nombre_admi_empresa),
    PRIMARY KEY (nombre_rs, nombre_admi_empresa)
);

CREATE TABLE tiene (
    id_recursoservicio INT(10),
    id_reserva INT(10),
    FOREIGN KEY (id_recursoservicio) REFERENCES RecursoServicio(id_recursoservicio),
    FOREIGN KEY (id_reserva) REFERENCES Reservas(id_reserva),
    PRIMARY KEY (id_recursoservicio, id_reserva)
);

CREATE TABLE perteneceA (
    nombre_admi_empresa VARCHAR(100),
    nombre_empresa VARCHAR(100),
    FOREIGN KEY (nombre_admi_empresa) REFERENCES Administradores_empresa(nombre_admi_empresa),
    FOREIGN KEY (nombre_empresa) REFERENCES Empresas(nombre_empresa),
    PRIMARY KEY (nombre_admi_empresa, nombre_empresa)
);

CREATE TABLE consulta_admi (
    nombre_admi_empresa VARCHAR(100),
    nombre_rs VARCHAR(100),
    fecha DATE,
    hora TIME,
    FOREIGN KEY (nombre_admi_empresa) REFERENCES Administradores_empresa(nombre_admi_empresa),
    FOREIGN KEY (nombre_rs) REFERENCES RecursoServicio(nombre_rs),
    FOREIGN KEY (fecha, hora) REFERENCES Reservas(fecha, hora),
    PRIMARY KEY (nombre_admi_empresa, nombre_rs, fecha, hora)
);

CREATE TABLE pertenece (
    nombre_usuario VARCHAR(100),
    nombre_empresa VARCHAR(100),
    FOREIGN KEY (nombre_usuario) REFERENCES Usuarios(nombre_usuario),
    FOREIGN KEY (nombre_empresa) REFERENCES Empresas(nombre_empresa),
    PRIMARY KEY (nombre_usuario, nombre_empresa)
);

CREATE TABLE hace (
    nombre_usuario VARCHAR(100),
    fecha DATE,
    hora TIME,
    FOREIGN KEY (nombre_usuario) REFERENCES Usuarios(nombre_usuario),
    FOREIGN KEY (fecha, hora) REFERENCES Reservas(fecha, hora),
    PRIMARY KEY (nombre_usuario, fecha, hora)
);

CREATE TABLE consulta_usuario (
    nombre_usuario VARCHAR(100),
    fecha DATE,
    hora TIME,
    nombre_rs VARCHAR(100),
    FOREIGN KEY (nombre_usuario) REFERENCES Usuarios(nombre_usuario),
    FOREIGN KEY (fecha, hora) REFERENCES Reservas(fecha, hora),
    FOREIGN KEY (nombre_rs) REFERENCES RecursoServicio(nombre_rs),
    PRIMARY KEY (nombre_usuario, nombre_rs, fecha, hora)
);

CREATE TABLE solicitud (
    nombre_empresa VARCHAR(100),
    datos_de_contacto VARCHAR(100),
    descripcion VARCHAR(100), 
    logo VARCHAR(100),
    nombre_admi_general VARCHAR(100),
    id_empresa VARCHAR(100),
    direccion VARCHAR(100),
    estado VARCHAR(100),
    id_solicitud INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);


INSERT INTO Empresas (nombre_empresa, datos_de_contacto, descripcion, logo, direccion)
VALUES ('Apple', 'contacto@empresa-a.com', 'Descripción de la Empresa A', '/assets/img/apple.jpg', 'Calle Principal 123'),
       ('Bic', 'contacto@empresa-b.com', 'Descripción de la Empresa B', '/assets/img/bic.png', 'Avenida Principal 456'),
       ('Disney', 'contacto@empresa-c.com', 'Descripción de la Empresa C', '/assets/img/disney.png', 'Carrera Principal 789');



INSERT INTO Usuarios (nombre_usuario, contrasena, fecha_nacimiento, puesto_trabajo, empresa, tipo, id_empresa, foto)
VALUES ('Mia', 'password123', '1990-05-15', 'Desarrollador', 'Apple', 1, 1, '/assets/img/usuario1.jpg'),
       ('Margot', 'secret456', '1985-08-20', 'Gerente de Ventas', 'Bic', 2, 2, '/assets/img/usuario2.jpg'),
       ('Brad', 'qwerty789', '1995-02-10', 'Analista de Datos', 'Disney', 1, 3, '/assets/img/usuario3.jpg'),
       ('Homer', 'passw0rd', '1992-11-30', 'Ejecutiva de Cuentas', 'Apple', 0, 1, '/assets/img/usuario4.png'),
       ('Steve', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'Disney', 2, 3, '/assets/img/usuario5.jpg'),
       ('Tom', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'Apple', 2, 1, '/assets/img/usuario6.jpg'),
       ('Carlk', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'Bic', 2, 2, '/assets/img/usuario7.jpg'),
       ('Zack', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'Disney', 2, 3,'/assets/img/usuario8.jpg' ),
       ('Anne', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'Apple', 2, 1, '/assets/img/usuario9.jpg'),
       ('Angelina', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'Bic', 2, 2, '/assets/img/usuario10.png'),
       ('Halle', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'Disney', 2, 3, '/assets/img/usuario11.jpg'),
       ('Viola', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'Apple', 2, 1, '/assets/img/usuario12.jpg'),
       ('Jennifer', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'Bic', 2, 2, '/assets/img/usuario13.jpg'),
       ('Courteney', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'Disney', 2, 3, '/assets/img/usuario14.jpg'),
       ('Emma', 'secure789', '1994-03-12', 'Desarrollador Full Stack', 'Bic', 1, 2, '/assets/img/usuario15.jpg'); 


INSERT INTO solicitud (nombre_empresa, datos_de_contacto, descripcion, logo, nombre_admi_general, id_empresa, direccion, estado)
VALUES ('Pepsi', 'contacto@empresa-d.com', 'Descripción de la Empresa D', '/assets/img/pepsi.png',  'Luisa', 0, ' ', 'Pendiente'),
       ('Hp', 'contacto@empresa-e.com', 'Descripción de la Empresa E', '/assets/img/hp.png', 'Luisa', 0, ' ',  'Aceptada'),
       ('Starbucks', 'contacto@empresa-f.com', 'Descripción de la Empresa F', '/assets/img/starbucks.png',  'Luisa', 0, ' ', 'Pendiente'),
       ('Android', 'contacto@empresa-g.com', 'Descripción de la Empresa G', '/assets/img/android.png', 'Luisa', 0, ' ',  'Aceptada'),
       ('Amazon', 'contacto@empresa-h.com', 'Descripción de la Empresa H', '/assets/img/amazon.png',  'Luisa', 0, ' ', 'Pendiente'),
       ('Coca-Cola', 'contacto@empresa-i.com', 'Descripción de la Empresa I', '/assets/img/Coca-Cola.png', 'Luisa', 0, ' ',  'Aceptada'),
       ('McDonalds', 'contacto@empresa-j.com', 'Descripción de la Empresa J', '/assets/img/McDonalds.png',  'Luisa', 0, ' ', 'Pendiente'),
       ('Warner', 'contacto@empresa-k.com', 'Descripción de la Empresa K', '/assets/img/warner.png', 'Luisa', 0, ' ',  'Aceptada'),
       ('Facebook', 'contacto@empresa-l.com', 'Descripción de la Empresa L', '/assets/img/facebook.png', 'Luisa', 0, ' ', 'Rechazada'),
       ('Carrefour', 'contacto@empresa-m.com', 'Descripción de la Empresa M', '/assets/img/carrefour.png', 'Luisa', 0, ' ', 'Rechazada');


INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 1', 'Descripción del recurso 1', '/assets/img/foto1.png', 'Datos del recurso 1', 100, 'Apple', 1);

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 2', 'Descripción del recurso 2', '/assets/img/foto2.jpg', 'Datos del recurso 2', 50, 'Apple', 1);

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 3', 'Descripción del recurso 3', '/assets/img/foto3.jpg', 'Datos del recurso 3', 80, 'Bic', 2);

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 4', 'Descripción del recurso 4', '/assets/img/foto4.png', 'Datos del recurso 4', 120, 'Bic', 2);

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 5', 'Descripción del recurso 5', '/assets/img/foto5.png', 'Datos del recurso 5', 80, 'Disney', 3);

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 6', 'Esta es una descripción muy larga que tiene más de 100 caracteres y se trunca para ajustarse a la restricción de longitud', '/assets/img/foto6.png', 'Datos del recurso 6', 90, 'Disney', 3);


INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 7', 'Descripción del recurso 7','/assets/img/foto7.png', 'Datos del recurso 4', 70, 'Apple', 1);


INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-20', '10:00:00', 'Apple', 'Tom', 'Recurso 2', 2, 1);   

INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-21', '15:30:00', 'Bic', 'Carlk', 'Recurso 3', 3, 2);

INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-22', '14:45:00', 'Disney', 'Halle', 'Recurso 5', 5, 3);

INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-23', '09:15:00', 'Apple', 'Tom', 'Recurso 2', 2, 1);

INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-24', '12:00:00', 'Bic', 'Carlk', 'Recurso 3',3, 2);

INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-24', '16:00:00', 'Bic', 'Carlk', 'Recurso 3', 3, 2);


