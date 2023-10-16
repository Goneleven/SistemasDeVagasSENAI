
var vagas;

const cadastrar = async() =>{

    let areaAt = document.getElementById("areaAtuacao").value;
    let descricao = document.getElementById("descricaoDaVaga").value;
    let responsabilidade = document.getElementById("responsabilidade").value;
    let periodo = document.getElementById("periodo").value;
    let requisitos = document.getElementById("requisitos").value;
    let local = document.getElementById("localidade").value;
    let salario = document.getElementById("salario").value;
    let beneficios = document.getElementById("beneficios").value;


    const init = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({areaAt, descricao, responsabilidade, periodo, requisitos, local, salario, beneficios})
    }

    const resLogin = await fetch('http://localhost:3000/cadVagas', init);
    getAllVagas();
    console.log(resLogin);

}

function updateCard(vagas){

    for(let i = 0; i < vagas.length;i++){

        let vagaAtual = vagas[i];

        console.log(vagaAtual.area);
    
    
    }


}

const getAllVagas = async() =>{

    let res = await fetch('http://localhost:3000/getVagas');
    let resJson = await res.json();
    vagas = resJson;
    console.log(vagas);
    updateCard(vagas);

}


getAllVagas();


