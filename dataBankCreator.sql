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
	area VARCHAR(max),
	descricao VARCHAR(max),
	responsabilidade VARCHAR(max),
	jornada VARCHAR(max),
	requisitos VARCHAR(max),
	localidade VARCHAR(max),
	salario VARCHAR(max),
	beneficios VARCHAR(max),
	modalidade VARCHAR(max),
	emailContato VARCHAR(max)
);

CREATE TABLE aluno(
	id_aluno INT IDENTITY(1,1) PRIMARY KEY,
	nome_aluno VARCHAR(190),
	sobreMim_aluno VARCHAR(190),
	email_aluno VARCHAR(190),
	n_matricula VARCHAR(190),
	cpf VARCHAR(90),
	senha VARCHAR(90),
	curriculum VARCHAR(max),
);


CREATE TABLE inscricao(

	id_aluno INT,
	id_vaga	INT,
	id_inscricao INT IDENTITY(1,1) PRIMARY KEY,
);


INSERT INTO aluno(nome_aluno, sobreMim_aluno, email_aluno, n_matricula, cpf, curriculum)
VALUES
('Arthur', 'Sou o Arthur', 'arthur@email.com', '123456', '123456', 'Cursando Desenvolvimento de Sistemas no ultimo semestre'),
('Juan', 'Sou o Juan', 'juan@email.com', '12345', '12345678-90', 'Cursando Desenvolvimento de Sistemas no ultimo semestre'),
('Guilherme', 'Sou o Guilherme', 'guilherme@email.com', '12345', '1234567890', 'Cursando Desenvolvimento de Sistemas no ultimo semestre'),
('Igor', 'Sou o Igor', 'igor@email.com', '23456', '23456789-01', 'Cursando Desenvolvimento de Sistemas no ultimo semestre')

INSERT INTO vaga(id_publicador, area, descricao, responsabilidade, jornada, requisitos, localidade, salario, beneficios, modalidade,emailContato)
VALUES
(1, 'TI', 'construir um sistema web de compartilhamento de vagas', 'muita', '18 as 22', 'Ser do técnico de desenvolvimento de sistemas SENAI', 'Mogi das Cruzes', '1000', 'nenhum', 'ead','senai@gmial.com');

INSERT INTO empresa(nome_empresa, cnpj, senha ,categoria)
VALUES
('SENAI', '123', '123', 'admin');

INSERT INTO inscricao(id_aluno,id_vaga)
VALUES
(1,2);



select * from aluno

SELECT * FROM inscricao

SELECT * FROM inscricao inner join aluno on aluno.id_aluno = inscricao.id_aluno where id_vaga = 1;

SELECT * FROM inscricao inner join vaga on vaga.id_vaga = inscricao.id_vaga where id_aluno = 2;

drop table vaga

UPDATE aluno SET curriculum = Cursando Desenvolvimento de Sistemas no ?ltimo semestre,sobreMim_aluno = Sou o Arthur gatãpo, email_aluno = arthur@email.com where id_aluno = 1

