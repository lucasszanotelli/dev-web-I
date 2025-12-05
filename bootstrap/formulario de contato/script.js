async function buscarCEP(cep){
    if (cep.length !== 9) {
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

document.addEventListener("DOMContentLoaded", ()=>{

    if(cep){
        IMask(cep,[
            { mask: "00000-000" }
        ])
    }
})

document.addEventListener("DOMContentLoaded", () => {
    var telefoneInput = document.getElementById("telefone");
    if (telefoneInput) {
        IMask(telefoneInput, [
            { mask: "(00) 0000-0000" },
            { mask: "(00) 0 0000-0000" }
        ]);
    }
});

