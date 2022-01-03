USE EcoBe;
CREATE TABLE Utilizador
(
  uti_nomeP VARCHAR(50) NOT NULL,
  uti_nomeU VARCHAR(50) NOT NULL,
  uti_idade INT NOT NULL,
  uti_pontosTotal INT NOT NULL CHECK(uti_pontosTotal > 0) DEFAULT 0,
  uti_eventosTotal INT NOT NULL,
  uti_id INT NOT NULL,
  uti_username VARCHAR(50) NOT NULL,
  uti_mail VARCHAR(50) NOT NULL,
  uti_rank ENUM('Principiante', 'Amador', 'Profissional', 'Mestre') DEFAULT 'Principiante',
  uti_genero ENUM('masculino', 'feminino') NOT NULL,
  uti_password VARCHAR(20),
  PRIMARY KEY (uti_id),
  UNIQUE(uti_username)
);

CREATE TABLE Staff
(
  staff_datainicio DATETIME NOT NULL,
  staff_datafim DATETIME,
  staff_id INT NOT NULL AUTO_INCREMENT,
  staff_nome VARCHAR(50) NOT NULL,
  PRIMARY KEY (staff_id)
);

CREATE TABLE Colaborador
(
  cola_id INT NOT NULL AUTO_INCREMENT,
  cola_nome VARCHAR(50) NOT NULL,
  PRIMARY KEY (cola_id)
);

CREATE TABLE Praias
(
  praia_id INT NOT NULL AUTO_INCREMENT,
  praia_nome VARCHAR(50) NOT NULL,
  praia_local VARCHAR(50) NOT NULL,
  praia_latitude VARCHAR(15),
  praia_longitude VARCHAR(15),
  PRIMARY KEY (praia_id)
);

CREATE TABLE Evento
(
  eve_id INT NOT NULL AUTO_INCREMENT,
  eve_lotacao INT NOT NULL,
  eve_estado ENUM('Não iniciado', 'A iniciar', 'Iniciado', 'Finalizado', 'Cancelado'), -- Necessidade de criar um status a iniciar para provar funcinamento de trigger // faz sentido no modelo de negócio
  eve_categoria ENUM('Adulto Jovem', 'Adulto', 'Adulto Sénior', 'Misto'),
  eve_datainicio DATETIME NOT NULL,
  eve_datafim DATETIME,
  eve_cola_id INT NOT NULL,
  eve_praia_id INT NOT NULL,
  PRIMARY KEY (eve_id),
  FOREIGN KEY (eve_cola_id) REFERENCES Colaborador(cola_id),
  FOREIGN KEY (eve_praia_id) REFERENCES Praias(praia_id)
);

CREATE TABLE participa
(
  par_id INT NOT NULL AUTO_INCREMENT,
  par_pontos INT NOT NULL DEFAULT 5,
  par_lixo INT,
  par_uti_id INT NOT NULL,
  par_eve_id INT NOT NULL,
  PRIMARY KEY (par_id),
  FOREIGN KEY (par_uti_id) REFERENCES Utilizador(uti_id),
  FOREIGN KEY (par_eve_id) REFERENCES Evento(eve_id),
  UNIQUE (par_uti_id, par_eve_id)
);


ALTER TABLE Colaborador
ADD COLUMN cola_username VARCHAR(15) AFTER cola_nome;

ALTER TABLE colaborador
ADD COLUMN cola_password VARCHAR(15) AFTER cola_username;

ALTER TABLE Staff
ADD COLUMN staff_username VARCHAR(25) AFTER staff_nome;

ALTER TABLE Staff
ADD COLUMN staff_password VARCHAR(25) AFTER staff_nome;



