function registrarEmpresa(){

    let nome = document.getElementById('nome').value;
    let cnpj = document.getElementById("cnpj").value;
    let categoriaEmpresa = document.getElementById("categoriaEmpresa").value;
    let senha = document.getElementById('senha').value;

    sendData(nome, cnpj, categoriaEmpresa, senha);

}

const sendData = async(nome, cnpj, categoriaEmpresa, senha) =>{

    const init = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({nome, cnpj, categoriaEmpresa, senha})
    }
    
    const resLogin = await fetch('http://localhost:3000/registroEmpresas', init);

}
