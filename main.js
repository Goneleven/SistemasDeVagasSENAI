const express = require("express");
const sql = require('msnodesqlv8');
const server = express();
const router = express.Router();
const cors = require("cors");
server.use(cors());
server.use(express.json({extended: true}))

const conexao = "server=.;Database=aluno;Trusted_connection=yes;Driver={SQL Server Native Client 11.0}";

router.post('/sendLoginLeanerData', (req, res) =>{ //record operation
    console.log(getAluno());
    const dadosLogin = req.body;
    let result = true;
    res.send(req.body);

});

function getAluno(){

    sql.query(conexao, "SELECT * FROM alunos", (error, resultado) => {
                
        console.log(resultado);

    })

}

server.use(router);

server.listen(3000, () =>{
    console.log('server rodando!');
})



