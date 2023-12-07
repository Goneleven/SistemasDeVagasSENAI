
var logado;

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
    return "";
}

async function loginAluno() {
  let matricula = document.getElementById("numeroMatriculaLogin").value;
  let cpf = document.getElementById("cpfLogin").value;

  enviarDadosLogin(matricula, cpf);
}

const exibirPrompt = (mensagem) => {
  Swal.fire({
    title: "Teste",
    text: mensagem,
    icon: "success"
  });
};

const enviarDadosLogin = async (matricula, cpf) => {
  const init = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ matricula, cpf })
  };

  const loginPromise = await fetch('http://localhost:3000/login/sendLoginLeanerData', init);
  let loginResultJson = await loginPromise.json();

  if (loginResultJson.response == 204) {
      const usuarioLogado = JSON.stringify(loginResultJson.idLogged);
      setCookie("userData", usuarioLogado);
      location.href = "perfil.html";
      logado = true;
      exibirPrompt("Login bem-sucedido!");
  } else {
      exibirPrompt("Login falhou. Senha ou email incorretos.");
  }
};


//apaguei um r enviarDadosLogin
const enviaDadosLogin = async(matricula, cpf) =>{

    const init = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({matricula, cpf})
    }

    const loginPromise = await fetch('http://localhost:3000/login/sendLoginLeanerData', init);
    let loginResultJson = await loginPromise.json();
    console.log(loginResultJson);
    if(loginResultJson.response == 204){//aqui faz a operação de ir a tela de perfil
        const usuarioLogado = JSON.stringify(loginResultJson.idLogged);
        setCookie("userData", usuarioLogado);
        location.href = "perfil.html"
        logado = true;
    }

}