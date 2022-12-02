CREATE TABLE Registros(
	id INT AUTO_INCREMENT,
    idUsuario INT,
    idEquipo INT,
    tempInicial INT,
    tempMuestra INT,
    tiempo DATETIME DEFAULT CURRENT_TIMESTAMP,
    tiempoEstimado INT,
    feedback INT(1),
    PRIMARY KEY(id),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(id),
    FOREIGN KEY (idEquipo) REFERENCES Equipos(id)
);
