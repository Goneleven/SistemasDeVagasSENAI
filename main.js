const express = require("express");
const sql = require('msnodesqlv8');
const server = express();
const router = express.Router();
const cors = require("cors");
server.use(cors());
server.use(express.json({ extended: true }))
const path = require('path');


const conexao = "server=.;Database=sistemaDivulgacaoDeVagas;Trusted_connection=yes;Driver={SQL Server Native Client 11.0}";

const loginRoutes = require('./routes/login.js');
const perfilRoutes = require('./routes/perfil.js');
const vagasRoutes = require('./routes/vagas.js');
const pagesRoutes = require('./routes/pages.js');

server.use(express.static(path.join(__dirname, 'public')));

const getItemIndex = (propriedade, valor, data) =>{//encontra o indice do alvo desejado num vetor
    return data.findIndex((item) => item[propriedade] == valor);
}

router.get('/index',(req, res) =>{//pega todas as vagas da tabela vagas no db arquivo vagas

    res.sendFile('public/index.html', {root: __dirname });


});

/*router.post('/sendLoginLeanerData', (req, res) => {//envia os dados do input do login para o server arquivo logins
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

router.get('/getPerfilData/:id', (req, res) => {//pega uma conta de especifica por meio do id guardado no cookie. arquivo perfil
    //const dadosLogin = req.body;
    const {id} = req.params;//pega o id no campo de argumentos na "url"
    console.log(id);

    sql.query(conexao, `SELECT * FROM aluno where id_aluno = ${id} `, (error, resultado) => {//puxa o aluno especifico do banco de dados.
        console.log(resultado)
        res.send({nome : resultado[0].nome_aluno, sobreMim: resultado[0].sobreMim_aluno, email: resultado[0].email_aluno, curriculo: resultado[0].curriculum});
    })

})

router.post('/sendLoginEnterpriseData', (req, res) => { //login empresa arquivo login
    const dadosLogin = req.body;

    sql.query(conexao, "SELECT * FROM empresa", (error, resultado) => {

        let index = getItemIndex('cnpj', req.body.cnpj, resultado);
        console.log(req.body.codigoAcesso)
        console.log(resultado[index].senha);


        if(resultado[index] != undefined && resultado[index].senha == req.body.codigoAcesso){
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
});*/

server.use('/login', loginRoutes);
server.use('/perfil', perfilRoutes);
server.use('/vagas', vagasRoutes);
server.use('/pages', pagesRoutes);
server.use('', router);

server.listen(3000, () => {
    console.log('server rodando!');
})

//Cadastro das vagas no banco de dados

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

//deletar empresa 

// router.delete('/deletarEmpresa', (req, res) => {

//     const dadosCadastro = req.body;
//     const cnpj = dadosCadastro.cnpj; 

//     const deletar = "DELETE FROM empresa WHERE cnpj = '" + cnpj;

//     sql.query(conexao, deletar, (error, resultado) => {

//       if (error) {
//         console.error("Erro ao excluir empresa:", error);
//         res.status(500).json({ error: "Erro interno do servidor" });
//       } else{
//         sql.query(conexao, deletar, (error, resultado) => {

//         })
//       }
//     });
//   });
  
// DELETE FROM empresa WHERE cnpj