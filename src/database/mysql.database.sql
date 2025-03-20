/* CuentasClaras */
CREATE DATABASE CuentasClaras;
USE CuentasClaras;

-- Tabla Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(50) NOT NULL DEFAULT 'usuario'
);

SELECT * FROM usuarios; -- Revisamos la tabla usuarios

-- Tabla Ingresos
CREATE TABLE ingresos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla Costos Fijos
CREATE TABLE costos_fijos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla Costos Variables
CREATE TABLE costos_variables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    cantidad INT DEFAULT 1,  -- Ejemplo: unidades compradas
    fecha DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla Margen de Contribucion
CREATE TABLE margen_contribucion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    ingresos DECIMAL(10,2) NOT NULL,
    costos_variables DECIMAL(10,2) NOT NULL,
    margen DECIMAL(10,2) AS (ingresos - costos_variables) STORED,
    fecha DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla Punto de Equilibrio
CREATE TABLE punto_equilibrio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    costos_fijos DECIMAL(10,2) NOT NULL,
    margen_contribucion DECIMAL(10,2) NOT NULL,
    punto_equilibrio DECIMAL(10,2) AS (costos_fijos / margen_contribucion) STORED,
    fecha DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla Reportes Financieros
CREATE TABLE reportes_financieros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    ingresos DECIMAL(10,2) NOT NULL,
    costos_fijos DECIMAL(10,2) NOT NULL,
    costos_variables DECIMAL(10,2) NOT NULL,
    utilidad DECIMAL(10,2) AS (ingresos - (costos_fijos + costos_variables)) STORED,
    fecha DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);