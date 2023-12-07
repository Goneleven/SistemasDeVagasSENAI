
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return ""
}

function loginEmpresa(){

    let cnpj = document.getElementById("cnpjEmpresa").value;
    let codigoAcesso = document.getElementById("codigoAcessoSenha").value;

    console.log("CNPJ: " + cnpj + " Código Acesso: " + codigoAcesso);

    enviarDadosLogin(cnpj, codigoAcesso);



}


const exibirPrompt = (mensagem) => {
  Swal.fire({
    title: "Teste",
    text: mensagem,
    icon: "success"
  });
  };
  

const enviarDadosLogin = async(cnpj, codigoAcesso) =>{

    const init = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({cnpj, codigoAcesso})
    }

    const resLogin = await fetch('http://localhost:3000/login/sendLoginEnterpriseData', init);
    let logEmpresaResJson = await resLogin.json()
    
    console.log(logEmpresaResJson);
    if(logEmpresaResJson.response == 204){//aqui faz a operação de ir a tela de perfil

        exibirPrompt("Login bem-sucedido!");
        const usuarioLogado = JSON.stringify(logEmpresaResJson.idLogged);
        setCookie("enterpriseData", usuarioLogado);
        if(usuarioLogado === "1") {
            location.href = "homeSenai.html"    
        }
        else {
            location.href = "homeEmpresa.html"
        }
    }else{
        exibirPrompt("Login falhou. Senha ou email incorretos.");
    }
}