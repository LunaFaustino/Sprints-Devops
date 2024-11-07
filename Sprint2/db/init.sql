CREATE DATABASE IF NOT EXISTS sprint2;

USE sprint2;

CREATE TABLE IF NOT EXISTS paciente (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    idade INT NOT NULL,
    quantidade_dentes INT,
    implante VARCHAR(3),
    carie VARCHAR(3),
    cancer VARCHAR(3)
);
