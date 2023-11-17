const express = require("express");
const sql = require('msnodesqlv8');
const router = express.Router();
const conexao = "server=.;Database=sistemaDivulgacaoDeVagas;Trusted_connection=yes;Driver={SQL Server Native Client 11.0}";

const getItemIndex = (propriedade, valor, data) =>{//encontra o indice do alvo desejado num vetor
    return data.findIndex((item) => item[propriedade] == valor);
}

router.post('/sendLoginLeanerData', (req, res) => {//envia os dados do input do login para o server arquivo logins
    const dadosLogin = req.body;//aqui estao os inputs do login

    sql.query(conexao, "SELECT * FROM aluno", (error, resultado) => {//seleciona todos os alunos no banco de dados

        console.log(resultado);
        let index = getItemIndex('n_matricula', req.body.matricula, resultado);
        let indexS = getItemIndex('cpf', req.body.cpf, resultado);

        if(resultado[index] != undefined && resultado[indexS] != undefined && resultado[indexS] == resultado[index]){
            res.send({response : 204, idLogged: resultado[index].id_aluno});
        }else{
            res.send({response : 203, errorMessage : 'Senha ou email incorretos, ou conta inexistente'});
        }

    })

});

router.post('/sendLoginEnterpriseData', (req, res) => { //login empresa arquivo login
    const dadosLogin = req.body;

    sql.query(conexao, "SELECT * FROM empresa", (error, resultado) => {

        let index = getItemIndex('cnpj', req.body.cnpj, resultado);
        let indexs = getItemIndex('senha', req.body.codigoAcesso, resultado);
        console.log(resultado[index]);
        console.log(resultado[indexs]);


        if(resultado[index] != undefined && resultado[indexs] != undefined && resultado[indexs] == resultado[index]){
            res.send({response : 204, idLogged: resultado[index].id_empresa});
            console.log('logou');
        }else{
            console.log('Não logou');
        }

    })

});

router.post('/registroEmpresas', (req, res) => {//registra empresa arquivo login

    const dadosCadastro = req.body;
    console.log(dadosCadastro);

    let insert = "INSERT INTO empresa(nome_empresa, cnpj, senha, categoria) VALUES('" + dadosCadastro.nome + "', '" + dadosCadastro.cnpj + "', '" + dadosCadastro.senha + "', '" + dadosCadastro.categoriaEmpresa + "')";

    let get = "SELECT * FROM empresa where cnpj = '" + dadosCadastro.cnpj + "'";


    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

        if (resultado.length >= 1) {
            console.log('isto já existe');
        } else {
            sql.query(conexao, insert, (error, resultado) => {

            })
        }

    })

});

module.exports = router;

