
function loginEmpresa(){

    let cnpj = document.getElementById("cnpjEmpresa").value;
    let codigoAcesso = document.getElementById("codigoAcessoSenha").value;

    console.log("CNPJ: " + cnpj + " Código Acesso: " + codigoAcesso);

    enviarDadosLogin(cnpj, codigoAcesso);



}

const enviarDadosLogin = async(cnpj, codigoAcesso) =>{

    const init = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({cnpj, codigoAcesso})
    }

    const resLogin = await fetch('http://localhost:3000/sendLoginEnterpriseData', init);
    if(resLogin.cnpj = cnpj){
        location.href = "homeEmpresa.html";
    }

}