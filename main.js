const express = require("express");
const sql = require('msnodesqlv8');
const server = express();
const router = express.Router();
const cors = require("cors");
const fs = require('fs');
server.use(cors());
server.use(express.json({ extended: true }))
const path = require('path');


const conexao = "server=.;Database=sistemaDivulgacaoDeVagas;Trusted_connection=yes;Driver={SQL Server Native Client 11.0}";

const loginRoutes = require('./routes/login.js');
const perfilRoutes = require('./routes/perfil.js');
const vagasRoutes = require('./routes/vagas.js');

//server.use(express.static(path.join(__dirname, 'public')));

router.use(express.static(path.join(__dirname, '/public/')));

const getItemIndex = (propriedade, valor, data) =>{//encontra o indice do alvo desejado num vetor
    return data.findIndex((item) => item[propriedade] == valor);
}

router.get('/',(req, res) =>{

    res.sendFile('/public/index.html', {root: __dirname });

  

});

router.get('/loginEmpresa',(req,res) =>{

    console.log('essa logica funcionou')
    res.sendFile('public/loginEmpresa.html', {root: __dirname })

})

server.use('/login', loginRoutes);
server.use('/perfil', perfilRoutes);
server.use('/vagas', vagasRoutes);
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