var requestResult;
var usableResult;
var dadosUsuario;
var logado;

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

const checaPerfil = async() => {
    dadosUsuario = getCookie("userData")
    console.log(dadosUsuario)
    logado = true;
    //let userLogadoDados = JSON.parse(dadosUsuario);

    requestResult = await fetch(`http://localhost:3000/perfil/getPerfilData/${dadosUsuario}`);
    usableResult = await requestResult.json();
    console.log(usableResult);

    document.getElementById('nomeAlunono').textContent = usableResult.nome;
    document.getElementById('emailAlunono').textContent = usableResult.email;
    document.getElementById('sobreAlunono').textContent = usableResult.sobreMim;
    document.getElementById('curriculumAlunono').textContent = usableResult.curriculo
}
// if(location.href == "perfilVisualizacao.html"){
//   perfilVisualizacao();
// }else{
//   checaPerfil()
// }
checaPerfil()

// vagas que cada aluno se inscreveu
const getAlVagasInLearner = async () => {

  let res = await fetch(`http://localhost:3000/perfil/vagasEmAluno/${dadosUsuario}`);
  let resJson = await res.json();
  alunos = resJson;
  console.log(alunos);

  // testeQoL(alunos);

updateListaAlunos(alunos);  

}


const checaEditarPerfil = async() => {

  document.getElementById('curriculoEditar').value = usableResult.curriculo
  document.getElementById('emailEditar').value = usableResult.email;
  document.getElementById('sobreMimEditar').textContent = usableResult.sobreMim;
  
}

function editarPerfil() {
  let curriculo = document.getElementById('curriculoEditar').value;
  let sobre = document.getElementById('sobreMimEditar').value;
  let email = document.getElementById("emailEditar").value;
  //let image = document.getElementById('imageUpload').value;

  const dadosAtualizados = {}

  if(curriculo !== "" || sobre !== "" || email !== "") {
      dadosAtualizados.curriculo = curriculo
      dadosAtualizados.sobre = sobre
      dadosAtualizados.email = email
  }

  //sendDataP(nome, curriculo, sobre, email)
  console.log(dadosAtualizados)
  sendDataP(dadosAtualizados)
}

const sendDataP = async(dadosAtualizados) =>{

  const init = {
      method: 'PUT',
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        curriculum: dadosAtualizados.curriculo,
        sobreMim_aluno: dadosAtualizados.sobre,
        email_aluno: dadosAtualizados.email,
      }),
    }

  const resLogin = await fetch(`http://localhost:3000/perfil/editarDadosPerfil/${dadosUsuario}`, init);
  let resLoginResult = await resLogin.json();
  console.log(resLoginResult)

}

//aqui editamos o precioso perfil :D

function salvarEdicao(){

  let inputArchive = document.getElementById("imageUpload");
  console.log(inputArchive.value);
  
}



