const express = require("express");
const sql = require('msnodesqlv8');
const server = express();
const router = express.Router();
const cors = require("cors");
server.use(cors());
server.use(express.json({extended: true}))

const conexao = "server=.;Database=alunos;Trusted_connection=yes;Driver={SQL Server Native Client 11.0}";

router.post('/sendLoginLeanerData', (req, res) =>{ //record operation
    const dadosLogin = req.body;

    sql.query(conexao, "SELECT * FROM Alunos where matricula = " + req.body.matricula +" AND cpf = " + req.body.cpf, (error, resultado) => {
        console.log(resultado);
        res.send(error);

    })

});

server.use(router);

server.listen(3000, () =>{
    console.log('server rodando!');
})



