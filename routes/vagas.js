const express = require("express");
const sql = require('msnodesqlv8');
const router = express.Router();
const conexao = "server=.;Database=sistemaDivulgacaoDeVagas;Trusted_connection=yes;Driver={SQL Server Native Client 11.0}";

const getItemIndex = (propriedade, valor, data) =>{//encontra o indice do alvo desejado num vetor
    return data.findIndex((item) => item[propriedade] == valor);
}

router.post('/cadVagas',(req, res) =>{//cadastra vagas arquivo vagas

    const dadosCadastroV = req.body;
    console.log(dadosCadastroV);

    let insert = "INSERT INTO vaga(area, descricao, responsabilidade, jornada, requisitos, localidade, salario, beneficios, modalidade, emailContato) VALUES('" + dadosCadastroV.areaAt + "', '" + dadosCadastroV.descricao + "', '" + dadosCadastroV.responsabilidade + "', '" + dadosCadastroV.periodo + "', '" + dadosCadastroV.requisitos + "', '" + dadosCadastroV.local + "', '" + dadosCadastroV.salario + "', '" + dadosCadastroV.beneficios + "', '" + dadosCadastroV.modalidade + "', '" + dadosCadastroV.email + "')";

    let get = "SELECT * FROM vaga";

    sql.query(conexao, insert, (error, resultado) => {
        console.log('foi sapoha');
        console.log(error);
    })

    sql.query(conexao, get, (error, resultado) => {
        console.log(error);

        res.send(resultado);

    })
});

router.get('/getVagas',(req, res) =>{//pega todas as vagas da tabela vagas no db arquivo vagas

    let get = "SELECT * FROM vaga";

    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

        res.send(resultado);

    })
});

router.delete('/deletarVaga/:id', (req, res) => {//deleta vaga arquibo vagas
    const {id} = req.params;
    console.log(id);

    const delVagaB = req.body
    console.log(delVagaB);

    const deletar = `DELETE FROM vaga WHERE id_vaga = ${id}`

    sql.query(conexao, deletar, (error, resultado) => {
        console.log(resultado);
    })
});

router.post('/cadastrarVaga', (req, res) => {

    const dadosCadastro = req.body;
    console.log(dadosCadastro);

    let insert = "INSERT INTO vaga(area, descricao, responsabilidade, jornada, requisitos, localidade, salario, beneficios, emailContato) VALUES('" + dadosCadastro.areaAt + "', '" + dadosCadastro.descricao + "', '" + dadosCadastro.responsabilidade + "', '" + dadosCadastro.jornada + "' , '" + dadosCadastro.requisitos + "' , '" + dadosCadastro.localidade + "' , '" + dadosCadastro.salario + "' , '" + dadosCadastro.beneficios + "' , '" + dadosCadastro.email +"' )";

    let get = "SELECT * FROM vaga where descricao = '" + dadosCadastro.descricao + "'";

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

router.post('/candidatura', (req, res) => {

    const dadosCadastro = req.body;
    let insert = `INSERT INTO inscricao(id_aluno,id_vaga) VALUES (${dadosCadastro.idUser},${dadosCadastro.vagasID});`;
    console.log(dadosCadastro);

    sql.query(conexao, insert, (error, resultado) => {
        console.log(resultado);
    });

});

router.get('/alunosEmVaga/:id',(req, res) =>{
    const {id} = req.params;
    console.log(id);
    let get = `SELECT * FROM inscricao inner join aluno on aluno.id_aluno = inscricao.id_aluno where id_vaga = ${id}`;
    console.log('teste');
    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);
        res.send(resultado);
    });


});

router.get('/vagasEmAluno/:id',(req, res) =>{

    const {id} = req.params
    let get = `SELECT * FROM inscricao inner join vaga on vaga.id_vaga = inscricao.id_vaga where id_aluno = ${id}`;
    sql.query(conexao, get, (error, resultado) => {
        res.send(resultado);
    });


});

module.exports = router;