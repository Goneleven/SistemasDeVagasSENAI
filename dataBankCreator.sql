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
	n_matricula VARCHAR(190),
	cpf VARCHAR(90),
	senha VARCHAR(90),
	curriculum VARBINARY(MAX),
);

CREATE TABLE inscricao(

	id_aluno INT,
	id_vaga	INT,
	id_inscricao INT,



);