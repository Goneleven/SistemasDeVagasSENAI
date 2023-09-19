function deletarEmpresa(){

    let nome = document.getElementById('nome').value;
    let cnpj = document.getElementById("cnpj").value;
    let categoriaEmpresa = document.getElementById("categoriaEmpresa").value;
    let senha = document.getElementById('senha').value;
    if(nome == undefined || cnpj == undefined || categoriaEmpresa == undefined || senha == undefined){
        
    }
    sendData(nome, cnpj, categoriaEmpresa, senha);

}

const sendData = async(nome, cnpj, categoriaEmpresa, senha) =>{

    const init = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({nome, cnpj, categoriaEmpresa, senha})
    }
    
    const resLogin = await fetch('http://localhost:3000/registroEmpresas', init);

}


//DELETE (Cadastro)
function deletarDados() {
    const cpf = document.getElementById('cpf').value;

    fetch(' cadastros')
        .then(response => response.json())
        .then(data => {
            data.forEach(objeto => {
                if (objeto.cpf === cpf) {
                    fetch(` cadastros/${objeto.id}`, {
                        method: 'DELETE'
                    })
                }
            })

        })
}