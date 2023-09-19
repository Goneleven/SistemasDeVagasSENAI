async function excluir() {
    const cpf = document.getElementById('cpfInput').value;

    if (!cpf) {
        alert('Por favor, insira um CPF válido.');
        return;
    }

    const confirmacao = confirm(`Tem certeza de que deseja excluir o registro com CPF ${cpf}?`);

    if (confirmacao) {
        try {
            const response = await fetch(`http://localhost:3000/excluirPorCPF/${cpf}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Registro excluído com sucesso.');
            } else {
                alert('Ocorreu um erro ao excluir o registro.');
            }
        } catch (error) {
            console.error('Erro ao excluir o registro:', error);
        }
    }
}
