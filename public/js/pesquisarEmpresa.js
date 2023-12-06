var empresa;

function moreInfo(empresa) {
    console.log(empresa);
    document.getElementById("idEmpresa").innerHTML = empresa.id_empresa;
    document.getElementById("nomeEmpresa").innerHTML = empresa.nome_empresa;
    document.getElementById("cnpjEmpresa").innerHTML = empresa.cnpj;
    document.getElementById("senhaEmpresa").innerHTML = empresa.senha;
    document.getElementById("categoriaEmpresa").innerHTML = empresa.categoria;
}

document.addEventListener('DOMContentLoaded', function () {
    const pesquisarEmpresaBtn = document.getElementById('pesquisarEmpresa');

    pesquisarEmpresaBtn.addEventListener('click', function () {
        const nomeEmpresa = document.getElementById("nomeEmpresaPesquisa").value;
        getAlLearnersInEmpresa(nomeEmpresa);
    });
});

const getAlLearnersInEmpresa = async (nome) => {
    let res = await fetch(`http://localhost:3000/login/empresaPesquisa/${nome}`);
    let resJson = await res.json();
    empresa = resJson[0];

    console.log(empresa);

    moreInfo(empresa);
}
