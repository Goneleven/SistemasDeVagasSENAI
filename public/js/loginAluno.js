
function loginAluno(){

    let matricula = document.getElementById("numeroMatriculaLogin").value;
    let cpf = document.getElementById("cpfLogin").value;

    console.log("Matricula: " + matricula + " cpf: " + cpf);

    

    enviarDadosLogin(matricula, cpf);



}

const enviarDadosLogin = async(matricula, cpf) =>{

    const init = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({matricula, cpf})
    }

    const loginPromise = await fetch('http://localhost:3000/sendLoginLeanerData', init);
    let loginResultJson = await resLogin.json();
    console.log(ResultJson);
    if(loginResultJson.response == 204){//aqui faz a operação de ir a tela de perfil
        location.href = "perfil.html"
    }

}