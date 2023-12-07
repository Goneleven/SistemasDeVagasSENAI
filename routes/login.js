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
        console.log(req.body);
        console.log(resultado[index]);
        console.log("teste 2 "  +resultado[indexs]);


        if(resultado[index] != undefined && resultado[indexs] != undefined && resultado[indexs] == resultado[index]){
            res.send({response : 204, idLogged: resultado[index].id_empresa});
            console.log('logou');
        }else{
            res.send({response : 203, errorMessage : 'Senha ou email incorretos, ou conta inexistente'});
        }

    })

});

router.post('/registroEmpresas', (req, res) => {
    const dadosCadastro = req.body;
    console.log(dadosCadastro);

    let insert = "INSERT INTO empresa(nome_empresa, cnpj, senha, categoria) VALUES('" + dadosCadastro.nome + "', '" + dadosCadastro.cnpj + "', '" + dadosCadastro.senha + "', '" + dadosCadastro.categoriaEmpresa + "')";
    let get = "SELECT * FROM empresa where cnpj = '" + dadosCadastro.cnpj + "'";

    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

        if (resultado.length >= 1) {
            console.log('Esta empresa já existe');
            res.send({ status: 409, message: 'Esta empresa já está cadastrada' });
        } else {
            sql.query(conexao, insert, (error, resultado) => {
                if (error) {
                    console.error('Erro ao inserir empresa:', error);
                    res.send({ status: 409, message: 'Erro ao cadastrar empresa' });
                } else {
                    console.log('Empresa cadastrada com sucesso');
                    res.send({ status: 200, message: 'Empresa cadastrada com sucesso' });
                }
            });
        }
    });
});


router.get('/empresaPesquisa/:nome', (req, res) => {
    const { nome } = req.params;
    console.log(nome);
    let get = `SELECT * FROM empresa WHERE nome_empresa = '${nome}'`;

    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);
        res.send(resultado);
    });
});



router.delete('/deletarEmpresa/:cnpj', (req, res) => {
    const { cnpj } = req.params;
    console.log('Recebida solicitação para deletar empresa com CNPJ:', cnpj);

    const deletar = 'DELETE FROM empresa WHERE cnpj = ?';
    sql.query(conexao, deletar, [cnpj], (error, resultado) => {
        if (error) {
            console.error(error);
            res.send({ status: 409, message: 'Erro ao deletar empresa' });
        } else {
            console.log('Empresa deletada');
            res.send({ status: 200, message: 'Empresa deletada com sucesso' });
        }
    });
});



router.get('/empresaPesquisa2/:id',(req, res) =>{ // visualizar empresa
    const {id} = req.params;
    console.log(id);
    let get = `SELECT * FROM empresa WHERE id_empresa = ${id}`;

    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);
        res.send(resultado);
    });


});


router.put('/atualizarEmpresa/:id', (req, res) => {
    const { id } = req.params;
    const novosDados = req.body;

    let updateQuery = `UPDATE empresa SET nome_empresa = '${novosDados.nome_empresa}', cnpj = '${novosDados.cnpj}', senha = '${novosDados.senha}', categoria = '${novosDados.categoria}' WHERE id_empresa = ${id}`;
    

    sql.query(conexao, updateQuery, (error, resultado) => { 
        if (error) {
            console.error(error);
            res.send({status: 409, message: 'erro ao atualizar'});
        } else {
            res.send({status: 200, message: 'Empresa atualizada com sucesso'});
        }
    });
});




module.exports = router;

