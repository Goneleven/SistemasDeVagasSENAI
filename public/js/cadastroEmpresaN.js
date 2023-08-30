

const cadastrar = async() =>{

    let cnpj = document.getElementById("cnpjCadastro").value;
    let nome = document.getElementById("nomeEmpresa").value;
    let email = document.getElementById("emailEmpresa").value;
    let telefone = document.getElementById("telefone").value;
    let cep = document.getElementById("cepEmpresa").value;
    let cidade = document.getElementById("cidadeEmpresa").value;
    let setor = document.getElementById("setor").value;


    const init = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({cnpj, nome, email, telefone, cep, cidade, setor})
    }

    const resLogin = await fetch('http://localhost:3000/cadastroEmpresaN', init);
    console.log(resLogin);

}