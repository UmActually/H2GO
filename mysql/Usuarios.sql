CREATE TABLE Usuarios(
	id INT AUTO_INCREMENT,
    nombre VARCHAR(50),
    contra VARCHAR(50),
    esAdmin BOOL,
    fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    tempPref INT,
    idEquipo INT,
    PRIMARY KEY(id),
    FOREIGN KEY (idEquipo) REFERENCES Equipos(id)
);
