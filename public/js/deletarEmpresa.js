var empresaID;
var empresa;

  document.addEventListener('DOMContentLoaded', function () {
    const deletarEmpresaBtn = document.getElementById('deletarEmpresaBtn');

    deletarEmpresaBtn.addEventListener('click', function () {
        const empresaID = document.getElementById("idEmpresa").value
        deletaVaga(empresaID);
    });
});



const deletaVaga = async (id) => {
    const url = `http://localhost:3000/login/deletarEmpresa/${id}`;
  
    const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const deletarEmpresa = await fetch(url, init);
    let delEmpresaVResultJson = await deletarEmpresa.json();
    getAllVagas();
    console.log(delEmpresaVResultJson);
  }
  