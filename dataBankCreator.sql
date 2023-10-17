CREATE DATABASE sistemaDivulgacaoDeVagas

USE sistemaDivulgacaoDeVagas

CREATE TABLE empresa(
	id_empresa INT IDENTITY(1,1) PRIMARY KEY,
	nome_empresa VARCHAR(190),
	cnpj VARCHAR(190),
	senha VARCHAR(90),
	categoria VARCHAR(90)

);
CREATE TABLE vaga(
	id_vaga INT IDENTITY(1,1) PRIMARY KEY,
	id_publicador INT,
	area VARCHAR(90),
	descricao VARCHAR(90),
	responsabilidade VARCHAR(190),
	jornada VARCHAR(190),
	requisitos VARCHAR(190),
	localidade VARCHAR(190),
	salario VARCHAR(190),
	beneficios VARCHAR(190),
);

CREATE TABLE aluno(
	id_aluno INT IDENTITY(1,1) PRIMARY KEY,
	nome_aluno VARCHAR(190),
	sobreMim_aluno VARCHAR(190),
	email_aluno VARCHAR(190),
	n_matricula VARCHAR(190),
	cpf VARCHAR(90),
	senha VARCHAR(90),
	curriculum VARCHAR(1000),
);


CREATE TABLE inscricao(

	id_aluno INT,
	id_vaga	INT,
	id_inscricao INT,
);


INSERT INTO aluno(nome_aluno, sobreMim_aluno, email_aluno, n_matricula, cpf, curriculum)
VALUES
('Arthur', 'Sou o Arthur', 'arthur@email.com', '654321', '65400', 'Cursando Desenvolvimento de Sistemas no �ltimo semestre'),
('Juan', 'Sou o Juan', 'juan@email.com', '12345', '12345678-90', 'Cursando Desenvolvimento de Sistemas no �ltimo semestre'),
('Igor', 'Sou o Igor', 'igor@email.com', '23456', '23456789-01', 'Cursando Desenvolvimento de Sistemas no �ltimo semestre')

INSERT INTO vaga(id_publicador, area, descricao, responsabilidade, jornada, requisitos, localidade, salario, beneficios)
VALUES
(1, 'TI', 'construir um sistema web de compartilhamento de vagas', 'muita', '18 as 22', 'Ser do técnico de desenvolvimento de sistemas SENAI', 'Mogi das Cruzes', '1000', 'nenhum');


SELECT * FROM aluno
