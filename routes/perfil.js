const express = require("express");
const sql = require('msnodesqlv8');
const router = express.Router();
const conexao = "server=.;Database=sistemaDivulgacaoDeVagas;Trusted_connection=yes;Driver={SQL Server Native Client 11.0}";

const getItemIndex = (propriedade, valor, data) =>{//encontra o indice do alvo desejado num vetor
    return data.findIndex((item) => item[propriedade] == valor);
}

router.get('/getPerfilData/:id', (req, res) => {//pega uma conta de especifica por meio do id guardado no cookie. arquivo login
    //const dadosLogin = req.body;
    const {id} = req.params;//pega o id no campo de argumentos na "url"
    console.log(id);

    sql.query(conexao, `SELECT * FROM aluno where id_aluno = ${id} `, (error, resultado) => {//puxa o aluno especifico do banco de dados.
        console.log(resultado)
        res.send({nome : resultado[0].nome_aluno, sobreMim: resultado[0].sobreMim_aluno, email: resultado[0].email_aluno, curriculo: resultado[0].curriculum});
    })

})

router.put('/editarDadosPerfil/:id', (req, res) => {//edita perfil aluno arquivo perfil
    const {id} = req.params;
    console.log(id);
    
    const dadosPerfil = req.body;
    console.log(dadosPerfil);

    //tem que usar alter table, modify column e tal juan:beleza
    let querry = `UPDATE aluno SET curriculum = '${dadosPerfil.curriculum}',sobreMim_aluno = '${dadosPerfil.sobreMim_aluno}', email_aluno = '${dadosPerfil.email_aluno}' where id_aluno = ${id}`

    console.log(querry);

    sql.query(conexao,querry , (error, resultado) => {
        console.log(resultado)
        res.send(resultado);
        console.log(error)
    })

});

router.get('/vagasEmAluno/:id',(req, res) =>{//pega todas as vagas que determinado aluno esta inscrito

    const {id} = req.params
    let get = `SELECT * FROM inscricao inner join vaga on vaga.id_vaga = inscricao.id_vaga where id_aluno = ${id}`;
    sql.query(conexao, get, (error, resultado) => {
        res.send(resultado);
    });


});

module.exports = router;