function registrarVaga() {
    let enterpriseDataInfo = dadosEmpresa;
    console.log(enterpriseDataInfo)
    let area = document.getElementById('areaAtuacao').value;
    let descricao = document.getElementById("descricaoDaVaga").value;
    let responsabilidade = document.getElementById("responsabilidade").value;
    let jornada = document.getElementById('periodo').value;
    let requisitos = document.getElementById('requisitos').value;
    let localidade = document.getElementById('localidade').value;
    let salario = document.getElementById('salario').value;
    let beneficios = document.getElementById('beneficios').value;
    let email = document.getElementById('emailContato').value;

    // Verifica se algum campo obrigatório está vazio
    if (
        enterpriseDataInfo === undefined ||
        area === undefined ||
        descricao === undefined ||
        responsabilidade === undefined ||
        jornada === undefined ||
        requisitos === undefined ||
        localidade === undefined ||
        salario === undefined ||
        beneficios === undefined ||
        email === undefined
    ) {
        // Faça algo se algum campo obrigatório estiver vazio
        return;
    }

    sendData(enterpriseDataInfo, area, descricao, responsabilidade, jornada, requisitos, localidade, salario, beneficios, email);
}

const sendData = async (enterpriseDataInfo, area, descricao, responsabilidade, jornada, requisitos, localidade, salario, beneficios, email) => {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            enterpriseDataInfo,
            area,
            descricao,
            responsabilidade,
            jornada,
            requisitos,
            localidade,
            salario,
            beneficios,
            email
        })
    };

    const resLogin = await fetch('http://localhost:3000/vagas/cadastrarVaga', init);
};
