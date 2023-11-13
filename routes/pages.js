const express = require("express");
const sql = require('msnodesqlv8');
const router = express.Router();
const conexao = "server=.;Database=sistemaDivulgacaoDeVagas;Trusted_connection=yes;Driver={SQL Server Native Client 11.0}";
//const app = express();

//app.use(express.static(path.join(__dirname, 'public')));

router.get('/getVagas',(req, res) =>{//pega todas as vagas da tabela vagas no db arquivo vagas

    let get = "SELECT * FROM vaga";

    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

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

router.get('/getVagas',(req, res) =>{//pega todas as vagas da tabela vagas no db arquivo vagas

    let get = "SELECT * FROM vaga";

    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

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

router.get('/getVagas',(req, res) =>{//pega todas as vagas da tabela vagas no db arquivo vagas

    let get = "SELECT * FROM vaga";

    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

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

router.get('/getVagas',(req, res) =>{//pega todas as vagas da tabela vagas no db arquivo vagas

    let get = "SELECT * FROM vaga";

    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

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

router.get('/getVagas',(req, res) =>{//pega todas as vagas da tabela vagas no db arquivo vagas

    let get = "SELECT * FROM vaga";

    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

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

router.get('/getVagas',(req, res) =>{//pega todas as vagas da tabela vagas no db arquivo vagas

    let get = "SELECT * FROM vaga";

    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

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

module.exports = router;
