const express = require("express");
const server = express();
const router = express.Router();
const cors = require("cors");
server.use(cors());
server.use(express.json({extended: true}))

router.post('/sendLoginLeanerData', (req, res) =>{ //record operation
    console.log(req.body);
    const dadosLogin = req.body;
    let result = true;
    res.send(req.body);

});

server.use(router);

server.listen(3000, () =>{
    console.log('server rodando!');
})

