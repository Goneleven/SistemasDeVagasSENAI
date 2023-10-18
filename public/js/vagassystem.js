
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

        const imagem = document.createElement('img');
        imagem.classList.add('logo');
        imagem.src = 'https://cdn-teams-slug.flaticon.com/google.jpg';
        imagem.alt = 'Logo Empresa';
        imagem.id = 'logoSmall';

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
        titulo_logo.appendChild(imagem);

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


    }


}

function moreInfo(vaga){

    console.log(vaga);

    document.getElementById("tituloVagaI").innerHTML = vaga.area;

}

const getAllVagas = async () => {

    let res = await fetch('http://localhost:3000/getVagas');
    let resJson = await res.json();
    vagas = resJson;
    console.log(vagas);
    updateCard(vagas);

}


getAllVagas();


