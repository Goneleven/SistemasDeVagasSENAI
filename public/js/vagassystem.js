
var vagas;

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


    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ areaAt, descricao, responsabilidade, periodo, requisitos, local, salario, beneficios, modalidade })
    }

    const resLogin = await fetch('http://localhost:3000/cadVagas', init);
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
        card.onclick = function(){
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
        paragrafo2.innerHTML = '<strong>R$ </strong>'+ vagaAtual.salario +'<i class="fa-solid fa-building mx-2"></i>' + vagaAtual.modalidade;

       
        titulo_logo.appendChild(titulo);

        cardBody.appendChild(titulo_logo);
        cardBody.appendChild(divisoriaCard);
        cardBody.appendChild(paragrafo1);
        cardBody.appendChild(paragrafo2);

        card.appendChild(cardBody);


        
        container.appendChild(card);
        
        if (descricaoTexto.length <= 100) {
            paragrafo1.textContent = descricaoTexto;
          } else {
            paragrafo1.textContent = descricaoTexto.substring(0, 100) + '...';
          }


          const cardsPopUp = document.querySelectorAll(".popUpMobile");
          const modal = document.querySelector("dialog");
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

function moreInfo(vaga){

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

    document.getElementById("tituloVagaIPopUp").innerHTML = vaga.area;
    document.getElementById("areaDescricaoPopUp").innerHTML = vaga.descricao;
    document.getElementById("areaResponsabilidadePopUp").innerHTML = vaga.responsabilidade;
    document.getElementById("areaJornadaPopUp").innerHTML = vaga.jornada;
    document.getElementById("areaRequisitosPopUp").innerHTML = vaga.requisitos;
    document.getElementById("areaLocalidadePopUp").innerHTML = vaga.localidade;
    document.getElementById("areaSalarioPopUp").innerHTML = vaga.salario;
    document.getElementById("areaBeneficioPopUp").innerHTML = vaga.beneficios;
    document.getElementById("areaModalidadePopUp").innerHTML = vaga.modalidade;

}

const getAllVagas = async () => {

    let res = await fetch('http://localhost:3000/getVagas');
    let resJson = await res.json();
    vagas = resJson;
    console.log(vagas);
    updateCard(vagas);

}


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

