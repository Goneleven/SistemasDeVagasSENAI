function loginAluno(){

    let matricula = document.getElementById("numeroMatriculaLogin").value;
    let cpf = document.getElementById("numeroMatriculaLogin").value;

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

    const resLogin = await fetch('http://localhost:3000/sendLoginLeanerData', init);
    console.log("funcionou" + resLogin);

}