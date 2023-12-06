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

    let insert = "INSERT INTO vaga(id_publicador, area, descricao, responsabilidade, jornada, requisitos, localidade, salario, beneficios, modalidade, emailContato) VALUES('" + dadosCadastroV.enterpriseDataInfo + "', '"+ dadosCadastroV.areaAt + "', '" + dadosCadastroV.descricao + "', '" + dadosCadastroV.responsabilidade + "', '" + dadosCadastroV.periodo + "', '" + dadosCadastroV.requisitos + "', '" + dadosCadastroV.local + "', '" + dadosCadastroV.salario + "', '" + dadosCadastroV.beneficios + "', '" + dadosCadastroV.modalidade + "', '" + dadosCadastroV.email + "')";

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

router.post('/getVagas', (req, res) => {
    const { enterpriseDataInfo } = req.body;
  
    // Modifique a lógica de busca com base no enterpriseDataInfo
    let get;
  
    if (enterpriseDataInfo === "1") {
      // Se enterpriseDataInfo for 1, busca todas as vagas
      get = "SELECT * FROM vaga";
    } else {
      // Caso contrário, busca apenas as vagas relacionadas ao enterpriseData específico
      get = "SELECT * FROM vaga WHERE id_publicador = " + enterpriseDataInfo;
    }
  
    sql.query(conexao, get, (error, resultado) => {
      if (error) {
        console.log('Erro ao obter vagas:', error);
        res.status(500).send('Erro ao obter vagas');
      } else {
        res.send(resultado);
      }
    });
  });
  

router.delete('/deletarVaga/:id', (req, res) => {//deleta vaga arquibo vagas
    const {id} = req.params;
    console.log(id);

    const delVagaB = req.body
    console.log(delVagaB);

    const deletar = `DELETE FROM vaga WHERE id_vaga = ${id}`
    const deletarInscricao = `DELETE from inscricao where id_vaga=${id}`;

    sql.query(conexao, deletar, (error, resultado) => {
        console.log(resultado);
    })
    sql.query(conexao, deletarInscricao, (error, resultado) => {
        console.log(resultado);
    })
});

router.post('/cadastrarVaga', (req, res) => {

    const dadosCadastro = req.body;
    console.log(dadosCadastro);

    let insert = "INSERT INTO vaga(id_publicador, area, descricao, responsabilidade, jornada, requisitos, localidade, salario, beneficios, emailContato) VALUES('" + dadosCadastro.id_publicador + "', '" + dadosCadastro.areaAt + "', '" + dadosCadastro.descricao + "', '" + dadosCadastro.responsabilidade + "', '" + dadosCadastro.jornada + "' , '" + dadosCadastro.requisitos + "' , '" + dadosCadastro.localidade + "' , '" + dadosCadastro.salario + "' , '" + dadosCadastro.beneficios + "' , '" + dadosCadastro.email +"' )";

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

router.post('/candidatura', (req, res) => {//realiza a inscrição

    const dadosCadastro = req.body;
    let insert = `INSERT INTO inscricao(id_aluno,id_vaga) VALUES (${dadosCadastro.idUser},${dadosCadastro.vagasID});`;
    let get = `SELECT * FROM inscricao inner join aluno on aluno.id_aluno = inscricao.id_aluno where id_vaga = ${dadosCadastro.vagasID} AND aluno.id_aluno = ${dadosCadastro.idUser};`
    console.log(dadosCadastro);

    sql.query(conexao, get, (error, resultado) => {
        console.log('tabela usuarioRepetido?')
        console.log(resultado);
        if(resultado.length <= 0){
            inscricaoInsert(insert);
            res.send({resposta : 'Inscrição realizada com sucesso. Boa sorte!'});
        }else{
            console.log('ja foi inscrito');
            res.send({resposta : 'já inscrito nesta vaga'});
        }
    });
    

});

function inscricaoInsert(insert){
    let result;
    sql.query(conexao, insert, (error, resultado) => {
        console.log(resultado);
        result = resultado;
    });
    return result;
}

router.get('/alunosEmVaga/:id',(req, res) =>{//pega todos os alunos que estao inscritos em determinada vaga
    const {id} = req.params;
    console.log(id);
    let get = `SELECT * FROM inscricao inner join aluno on aluno.id_aluno = inscricao.id_aluno where id_vaga = ${id}`;
    console.log('teste');
    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);
        res.send(resultado);
    });


});

module.exports = router;