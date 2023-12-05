const exibirPrompt = (mensagem) => {
    alert(mensagem);
  };

function registrarEmpresa(){

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
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({nome, cnpj, categoriaEmpresa, senha})
    }
    
    const resLogin = await fetch('http://localhost:3000/login/registroEmpresas', init);
    const responseBody = await resLogin.json();

    try {

        if (responseBody.status === 200) {
            console.log('Empresa cadastrada com sucesso');
            exibirPrompt('Empresa cadastrada com sucesso');
        } else if (responseBody.status === 409) {
            console.log('Esta empresa já está cadastrada');
            exibirPrompt('Esta empresa já está cadastrada');
        } else {
            console.log('Erro ao cadastrar empresa');
            exibirPrompt('Erro ao cadastrar empresa');
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        exibirPrompt('Erro ao fazer a requisição');
    }

}
