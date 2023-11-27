var requestResult;
var usableResult;
var dadosUsuario;
var logado;

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
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

const checaPerfil = async () => {
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
  vagas = resJson;
  console.log(vagas);

  // testeQoL(alunos);

  updateListaAlunos(vagas);

}


function updateListaAlunos(vagas) {


  const infoCurriculum2 = document.getElementById("infoCurriculum2");
  infoCurriculum2.innerHTML = "";

  const tituloPagina = document.createElement('h2');
  tituloPagina.textContent = "Vagas inscritas: "
  infoCurriculum2.appendChild(tituloPagina)

  tituloPagina.style.marginLeft = "30px";
  tituloPagina.style.fontSize = "40px";
  tituloPagina.style.marginTop = "30px";

  for (let i = 0; i < vagas.length; i++) {

    let vagaAtual = vagas[i];


    const card = document.createElement('div');

    card.classList.add('card', 'border', 'border-dark', 'mb-4', 'cardVaga');
    card.style.marginTop = "30px";




    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'popUpMobile');


    const titulo_logo = document.createElement('div');
    titulo_logo.classList.add('d-flex', 'align-items-center');


    const titulo = document.createElement('h5');
    titulo.classList.add('card-title', 'mx-3', 'mr-3');
    titulo.textContent = vagaAtual.area;


    const divisoriaCard = document.createElement('div');
    divisoriaCard.classList.add('divisoriaCard');


    const paragrafo1 = document.createElement('p');
    paragrafo1.classList.add('card-text', 'my-3');
    paragrafo1.textContent = vagaAtual.descricao;
    const descricaoTexto = vagaAtual.descricao;


    const paragrafo2 = document.createElement('p');
    paragrafo2.classList.add('card-text');
    paragrafo2.innerHTML = '<strong>R$ </strong>' + vagaAtual.salario + '<i class="fa-solid fa-building mx-2"></i>' + vagaAtual.modalidade;




    titulo_logo.appendChild(titulo);

    cardBody.appendChild(titulo_logo);
    cardBody.appendChild(divisoriaCard);
    cardBody.appendChild(paragrafo1);
    cardBody.appendChild(paragrafo2);


    card.appendChild(cardBody);



    infoCurriculum2.appendChild(card);

    if (descricaoTexto.length <= 100) {
      paragrafo1.textContent = descricaoTexto;
    } else {
      paragrafo1.textContent = descricaoTexto.substring(0, 100) + '...';
    }


  }


}


const checaEditarPerfil = async () => {

  document.getElementById('curriculoEditar').value = usableResult.curriculo
  document.getElementById('emailEditar').value = usableResult.email;
  document.getElementById('sobreMimEditar').textContent = usableResult.sobreMim;

}

function editarPerfil() {
  let curriculo = document.getElementById('curriculoEditar').value;
  let sobre = document.getElementById('sobreMimEditar').value;
  let email = document.getElementById("emailEditar").value;
  let image = document.getElementById('imageUpload').files[0];

  console.log(image);

  const dadosAtualizados = {}

  if (curriculo !== "" || sobre !== "" || email !== "") {
    dadosAtualizados.curriculo = curriculo
    dadosAtualizados.sobre = sobre
    dadosAtualizados.email = email
    dadosAtualizados.img = image;
  }

  //sendDataP(nome, curriculo, sobre, email)
  console.log(dadosAtualizados)
  sendDataP(dadosAtualizados)


  //location.reload()


}

const sendDataP = async (dadosAtualizados) => {

  const init = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      curriculum: dadosAtualizados.curriculo,
      sobreMim_aluno: dadosAtualizados.sobre,
      email_aluno: dadosAtualizados.email,
      imagem : dadosAtualizados.img
    }),
  }

  const init2 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      dadosAtualizados.img
    )
  }

  console.log(dadosAtualizados.img);
  let a = JSON.stringify(

    dadosAtualizados.img,

  
  );
  console.log(a);
  const resLogin = await fetch(`http://localhost:3000/perfil/editarDadosPerfil/${dadosUsuario}`, init);
  const resimg = await fetch(`http://localhost:4000/sendImage/${dadosUsuario}`, init2);
  let resLoginResult = await resLogin.json();
  console.log(resLoginResult)

}

//aqui editamos o precioso perfil :D

function salvarEdicao() {

  let inputArchive = document.getElementById("imageUpload");
  console.log(inputArchive.value);

}



function toggleInfos() {
  const info1 = document.getElementById("infoCurriculum1");
  const info2 = document.getElementById("infoCurriculum2");
  const candidatosButton = document.getElementById("botaoVagasInscritas");

  const computedStyle1 = window.getComputedStyle(info1);
  const computedStyle2 = window.getComputedStyle(info2);

  if (computedStyle1.display !== "none") {

    getAlVagasInLearner()

    info1.style.opacity = 0;
    info2.style.opacity = 1;
    setTimeout(() => {
      info1.style.display = "none";
      info2.style.display = "block";
      candidatosButton.textContent = "Curriculum";
    }, 500);
  } else {
    info1.style.opacity = 1;
    info2.style.opacity = 0;
    setTimeout(() => {
      info1.style.display = "block";
      info2.style.display = "none";
      candidatosButton.textContent = "Vagas Inscritas";
    }, 500);
  }
}

