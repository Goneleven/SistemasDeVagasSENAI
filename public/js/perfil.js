function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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

const checaPerfil = async() => {
    const dadosUsuario = getCookie("userData")
    console.log(dadosUsuario)
    //let userLogadoDados = JSON.parse(dadosUsuario);
    const requestResult = await fetch(`http://localhost:3000/getPerfilData/${dadosUsuario}`);
    let usableResult = await requestResult.json();
    console.log(usableResult);
    document.getElementById('nomeAlunono').textContent = usableResult.nome;
    document.getElementById('emailAlunono').textContent = usableResult.email;
    document.getElementById('sobreAlunono').textContent = usableResult.sobreMim;
}

checaPerfil()

function editarPerfil() {
  let nome = document.getElementById('nomeEditar').value;
  let curriculo = document.getElementById('curriculoEditar').value;
  let sobre = document.getElementById('sobreEditar').value;
  let email = document.getElementById("emailEditar").value;
  if(nome == undefined || curriculo == undefined || sobre == undefined || email == undefined){
      
  }
  sendDataP(nome, curriculo, sobre, email)
}

const sendDataP = async(nnome, curriculo, sobre, email) =>{

  const init = {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify({nome, curriculo, sobre, email})
  }
  
  const resLogin = await fetch('http://localhost:3000/editarDadosPerfil', init);

}

//aqui editamos o precioso perfil :D

function salvarEdicao(){

  let inputArchive = document.getElementById("imageUpload");
  console.log(inputArchive.value);



  
}

