function perfilVisualizacao(){
    let myItem = localStorage.getItem('alunoBotao');
    console.log(myItem);
    myItem = JSON.parse(myItem);
    console.log(myItem);
  
    document.getElementById('nomeAlunonoVisualicacao').textContent = myItem.nome_aluno;
    document.getElementById('sobreAlunonoVisualizacao').textContent = myItem.sobreMim_aluno;
    document.getElementById('emailAlunonoVisualicacao').textContent = myItem.email_aluno;
    document.getElementById('curriculumAlunonoVisualizacao').textContent = myItem.curriculum;
  
  
  }
  perfilVisualizacao();  