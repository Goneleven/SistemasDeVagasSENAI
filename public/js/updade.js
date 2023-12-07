var empresaID;
var empresa;

const exibirAlerta = (mensagem) => {
    Swal.fire({
    title: "Teste",
    text: mensagem,
    icon: "success"
  });
};

document.addEventListener('DOMContentLoaded', function () {
    const pesquisarEmpresaBtn = document.getElementById('pesquisarEmpresa');

    pesquisarEmpresaBtn.addEventListener('click', function () {
        const empresaID = document.getElementById("empresaPesquisaID").value;
        getAlLearnersInEmpresa(empresaID);
    });
});



const getAlLearnersInEmpresa = async (id) => {
    let res = await fetch(`http://localhost:3000/login/empresaPesquisa2/${id}`);
    let resJson = await res.json();
    console.log(resJson);

    empresa = resJson[0];

    console.log(empresa);
    document.getElementById("nomeEmpresa").value = empresa.nome_empresa;
    document.getElementById("cnpjEmpresa").value = empresa.cnpj;
    document.getElementById("senhaEmpresa").value = empresa.senha;
    document.getElementById("categoriaEmpresa").value = empresa.categoria;

    const salvarBtn = document.getElementById('salvarEmpresa');

    salvarBtn.addEventListener('click', async () => {
        const novosDados = {
            nome_empresa: document.getElementById("nomeEmpresa").value,
            cnpj: document.getElementById("cnpjEmpresa").value,
            senha: document.getElementById("senhaEmpresa").value,
            categoria: document.getElementById("categoriaEmpresa").value
        };


        let resposta = await fetch(`http://localhost:3000/login/atualizarEmpresa/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novosDados),
        });

        if (resposta.ok) {
            exibirAlerta('Empresa atualizada com sucesso');
            console.log('Empresa atualizada com sucesso');
        } else {
            exibirAlerta('Erro ao atualizar empresa');
            console.error('Erro ao atualizar empresa');
        }
    });


    const responseBody = await resLogin.json();

};
