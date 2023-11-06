
//var logadoEmpresa;
var logado;
var vagas;
var alunos;
var vagasID;


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

const definirLogado = async () => {
  dadosEmpresa = getCookie("enterpriseData");
  console.log(dadosEmpresa);

  // Converte dadosUsuario para um número usando parseInt ou Number
  const idUsuario = parseInt(dadosEmpresa); // Ou Number(dadosUsuario)

  if (idUsuario === 1 || idUsuario === 2 || idUsuario === 3) {
    logado = false;
  } else {
    logado = true;
  }
}

definirLogado();

const cadastrar = async () => {

  let areaAt = document.getElementById("areaAtuacao").value;
  let descricao = document.getElementById("descricaoDaVaga").value;
  let responsabilidade = document.getElementById("responsabilidade").value;
  let periodo = document.getElementById("periodo").value;
  let requisitos = document.getElementById("requisitos").value;
  let local = document.getElementById("localidade").value;
  let salario = document.getElementById("salario").value;
  let beneficios = document.getElementById("beneficios").value;
  let modalidade = document.getElementById("modalidade").value
  let email = document.getElementById("emailContato").value


  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ areaAt, descricao, responsabilidade, periodo, requisitos, local, salario, beneficios, modalidade, email })
  }

  const resLogin = await fetch('http://localhost:3000/vagas/cadVagas', init);
  getAllVagas();
  console.log(resLogin);

}

function updateCard(vagas) {

  const container = document.getElementById('containerCardsVagas');
  container.innerHTML = "";

  for (let i = 0; i < vagas.length; i++) {

    let vagaAtual = vagas[i];

    console.log(vagaAtual.area);


    const card = document.createElement('div');
    card.onclick = function () {
      moreInfo(vagaAtual);
    };
    card.classList.add('card', 'border', 'border-dark', 'mb-4', 'cardVaga');

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

    if (logado == false) {
      var vagaApagar = document.createElement('p');
      vagaApagar.classList.add('card-text');
      vagaApagar.innerHTML = '<i class="fa-solid fa fa-trash-o mx-2"></i>'

      vagaApagar.style.position = 'relative';
      vagaApagar.style.marginTop = '-7%'
      vagaApagar.style.marginLeft = '90%'

      vagaApagar.addEventListener('click', () => {
        deletaVaga(vagaAtual)
      })
    }


    titulo_logo.appendChild(titulo);

    cardBody.appendChild(titulo_logo);
    cardBody.appendChild(divisoriaCard);
    cardBody.appendChild(paragrafo1);
    cardBody.appendChild(paragrafo2);

    if (!logado) {
      cardBody.appendChild(vagaApagar);
    }

    card.appendChild(cardBody);



    container.appendChild(card);

    if (descricaoTexto.length <= 100) {
      paragrafo1.textContent = descricaoTexto;
    } else {
      paragrafo1.textContent = descricaoTexto.substring(0, 100) + '...';
    }


    const cardsPopUp = document.querySelectorAll(".popUpMobile");
    const modal = document.getElementById("pipop");
    const buttonfecharPopUp = modal.querySelector("button");

    cardsPopUp.forEach(function (div) {
      div.addEventListener("click", function () {
        if (window.innerWidth <= 991) {
          modal.showModal();
        }
      });
    });

    buttonfecharPopUp.addEventListener("click", function () {
      modal.close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 991) {
        modal.close();
      }
    });



  }


}

function moreInfo(vaga) {

  console.log(vaga);

  document.getElementById("tituloVagaI").innerHTML = vaga.area;
  document.getElementById("areaDescricao").innerHTML = vaga.descricao;
  document.getElementById("areaResponsabilidade").innerHTML = vaga.responsabilidade;
  document.getElementById("areaJornada").innerHTML = vaga.jornada;
  document.getElementById("areaRequisitos").innerHTML = vaga.requisitos;
  document.getElementById("areaLocalidade").innerHTML = vaga.localidade;
  document.getElementById("areaSalario").innerHTML = vaga.salario;
  document.getElementById("areaBeneficio").innerHTML = vaga.beneficios;
  document.getElementById("areaModalidade").innerHTML = vaga.modalidade;
  document.getElementById("contatoEmpresa").innerHTML = vaga.emailContato;


  document.getElementById("tituloVagaIPopUp").innerHTML = vaga.area;
  document.getElementById("areaDescricaoPopUp").innerHTML = vaga.descricao;
  document.getElementById("areaResponsabilidadePopUp").innerHTML = vaga.responsabilidade;
  document.getElementById("areaJornadaPopUp").innerHTML = vaga.jornada;
  document.getElementById("areaRequisitosPopUp").innerHTML = vaga.requisitos;
  document.getElementById("areaLocalidadePopUp").innerHTML = vaga.localidade;
  document.getElementById("areaSalarioPopUp").innerHTML = vaga.salario;
  document.getElementById("areaBeneficioPopUp").innerHTML = vaga.beneficios;
  document.getElementById("areaModalidadePopUp").innerHTML = vaga.modalidade;
  document.getElementById("contatoEmpresaPopUp").innerHTML = vaga.emailContato;
  vagasID = vaga.id_vaga;
  getAlLearnersInVaga();

}

const getAllVagas = async () => {

  let res = await fetch('http://localhost:3000/vagas/getVagas');
  let resJson = await res.json();
  vagas = resJson;
  console.log(vagas);

  testeQoL(vagas);

  updateCard(vagas);

}

function updateListaAlunos(alunos) {


  const info2 = document.getElementById("info2");
  info2.innerHTML = "";

  //const container = document.getElementById('containerCardsVagas');
  //container.innerHTML = "";

  for (let i = 0; i < alunos.length; i++) {

    let alunoAtual = alunos[i];

    console.log(alunoAtual);

    /*const cardsPopUp = document.querySelectorAll(".popUpMobile");
    const modal = document.getElementById("pipop");
    const buttonfecharPopUp = modal.querySelector("button");
  
    cardsPopUp.forEach(function (div) {
      div.addEventListener("click", function () {
        if (window.innerWidth <= 991) {
          modal.showModal();
        }
      });
    });
  
    buttonfecharPopUp.addEventListener("click", function () {
      modal.close();
    });
  
    window.addEventListener('resize', function () {
      if (window.innerWidth > 991) {
        modal.close();
      }
    });*/

    const containerCandidatos = document.createElement("div");
    containerCandidatos.className = "containerCandidatos";

    const nomeAluno = document.createElement("button");
    nomeAluno.textContent = alunoAtual.nome_aluno;
    // nomeAluno.href = 'perfilVisualizacao.html';

    // function direcionaPerfil(){
      
    // }

    const testeSpam = document.createElement("span");
    testeSpam.textContent = alunoAtual.nome_aluno;
    nomeAluno.append (testeSpam);

    

    containerCandidatos.appendChild(nomeAluno);



   info2.appendChild(containerCandidatos);

   const divisoriaPerfilParaPerfil = document.createElement("hr");
   info2.appendChild(divisoriaPerfilParaPerfil);

  }




}



const getAlLearnersInVaga = async () => {

  let res = await fetch(`http://localhost:3000/vagas/alunosEmVaga/${vagasID}`);
  let resJson = await res.json();
  alunos = resJson;
  console.log(alunos);

  //testeQoL(alunos);

  updateListaAlunos(alunos);

}

const deletaVaga = async (vagaAtual) => {
  const url = `http://localhost:3000/vagas/deletarVaga/${vagaAtual.id_vaga}`;

  const init = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const deletarVagaPromise = await fetch(url, init);
  let delVResultJson = await deletarVagaPromise.json();
  getAllVagas();
  console.log(delVResultJson);
}

//isso é uma tentativa de dar um aviso caso a vaga seja deletada

// const deletaVaga = async (vagaAtual) => {
//   const url = `http://localhost:3000/deletarVaga/${vagaAtual.id_vaga}`;

//   const init = {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   const deletarVagaPromise = await fetch(url, init);
//   let delVResultJson = await deletarVagaPromise.json();

//   // Verifique se a exclusão foi bem-sucedida
//   if (delVResultJson.success) {
//     // Exiba uma mensagem no prompt
//     window.prompt('Vaga apagada com sucesso!');
//   } else {
//     // Exiba uma mensagem de erro no prompt
//     window.prompt('Falha ao apagar a vaga.');
//   }

//   console.log(delVResultJson);
// }


const testeQoL = async (vagas) => {
  const vaga = vagas[0];
  moreInfo(vaga);
};

getAllVagas();

//barra de pesquisa
const barraDePesquisa = document.getElementById("barraDePesquisa");

barraDePesquisa.addEventListener("input", function () {
  const termoPesquisa = barraDePesquisa.value.toLowerCase();
  const vagasFiltradas = filtrarVagas(termoPesquisa);

  updateCard(vagasFiltradas);
});
function filtrarVagas(termoPesquisa) {

  if (termoPesquisa.trim() === "") {
    return vagas;
  }

  termoPesquisa = termoPesquisa.toLowerCase();


  const vagasFiltradas = vagas.filter((vaga) => {
    const area = vaga.area.toLowerCase();
    const descricao = vaga.descricao.toLowerCase();


    return area.includes(termoPesquisa) || descricao.includes(termoPesquisa);
  });

  return vagasFiltradas;
}

candidaturaDoing = async (obj) => {

  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }

  console.log(obj);

  const candidaturaF = await fetch('http://localhost:3000/vagas/candidatura', init);


}

teste = async () => {

  const candidaturaF = await fetch('http://localhost:3000/vagas/alunosEmVaga/1');
  let resJson = await candidaturaF.json();
  console.log(resJson);


}

teste();

function candidaturaAction() {
  dadosUsuario = getCookie("userData");
  idUser = parseInt(dadosUsuario);
  candidaturaDoing({ vagasID, idUser });
}





