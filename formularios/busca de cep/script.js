async function buscarCEP(cep){
    //a função async 'força' o codigo entender que essa função é assincrona, ou seja, não paraliza 
    //o restante do código esperando o retorno dessa função
    if (cep.length !== 8) {
        alert("CEP inválido! Digite um CEP com 8 números.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado!");
                return;
            }

            document.getElementById("rua").value = data.logradouro || "";
            document.getElementById("bairro").value = data.bairro || "";
            document.getElementById("cidade").value = data.localidade || "";
            document.getElementById("estado").value = data.uf || "";
        })
        .catch(error => {
            alert("Erro ao buscar CEP!");
            console.error("Erro:", error);
        });
}