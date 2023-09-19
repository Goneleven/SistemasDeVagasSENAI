const express = require("express");
const sql = require('msnodesqlv8');
const server = express();
const router = express.Router();
const cors = require("cors");
server.use(cors());
server.use(express.json({extended: true}))

const conexao = "server=.;Database=sistemaDivulgacaoDeVagas;Trusted_connection=yes;Driver={SQL Server Native Client 11.0}";

router.post('/sendLoginLeanerData', (req, res) =>{ //record operation
    const dadosLogin = req.body;

    sql.query(conexao, "SELECT * FROM aluno", (error, resultado) => {
        console.log(resultado);
            if(resultado != null  && resultado.length > 0){
                res.send(resultado);
        }else{
                res.send(error);
            }

        })

});

router.post('/sendLoginEnterpriseData', (req, res) =>{ //record operation
    const dadosLogin = req.body;

    sql.query(conexao, "SELECT * FROM empresa where cnpj = " + req.body.cnpj +" AND senha = " + req.body.codigoAcesso, (error, resultado) => {
            if(resultado != null && resultado.length > 0){
                res.send(resultado);
            }else{
                res.send(error);
            }

        })

});

router.post('/registroEmpresas', (req, res) =>{

    const dadosCadastro = req.body;
    console.log(dadosCadastro);

    let insert = "INSERT INTO empresa(nome_empresa, cnpj, senha, categoria) VALUES('" + dadosCadastro.nome + "', '" + dadosCadastro.cnpj + "', '" + dadosCadastro.senha + "', '"+ dadosCadastro.categoriaEmpresa + "')";

    let get = "SELECT * FROM empresa where cnpj = '" + dadosCadastro.cnpj + "'";

    
    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

        if(resultado.length >= 1){
            console.log('isto já existe');
        }else{
            sql.query(conexao, insert, (error, resultado) => {

            })
        }

    })

});

server.use(router);

server.listen(3000, () =>{
    console.log('server rodando!');
})



//deletar empresa 

router.post('/deletarEmpresa', (req, res) =>{



});
