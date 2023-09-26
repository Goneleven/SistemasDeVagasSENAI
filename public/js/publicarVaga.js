const { get } = require("express/lib/response");



var container = document.getElementById('tenis');

for (let i = 0; i < produtos.length; i++) {
  var div = document.createElement('div');
  
  var img = document.createElement('img');
  img.src = produtos[i][2];
  div.appendChild(img);
  
  var pNome = document.createElement('p');
  pNome.textContent = produtos[i][0];
  div.appendChild(pNome);
  
  var pPreco = document.createElement('p');
  pPreco.textContent = `R$ ${produtos[i][1].toFixed(2)}`;
  div.appendChild(pPreco);
  
  var botao = document.createElement('button');

  container.appendChild(div);
 
}




const criarCardVaga = async() =>{


    var vaga = [  ['areaAtuacao','descricaoDaVaga','responsabilidade','periodo','requisitos','localidade',salario,'beneficios'],
    [],
    ['Tênis', 99.99, 'images2.jpg'],
    ['Tenis', 709.99, 'images3.jpg'],
    ['Tenis', 1366.99, 'images13.jpg'],
    ['Tenis', 1000.99, 'images5.jpg'],
    ['Tenis', 809.99, 'images6.jpg'],
    ['Tenis', 694, 'images11.jpg']
  ];


    const init = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({cnpj, nome, email, telefone, cep, cidade, setor})
    }

    const resLogin = await fetch('http://localhost:3000/cadastroEmpresaN', init);
    console.log(resLogin);

}