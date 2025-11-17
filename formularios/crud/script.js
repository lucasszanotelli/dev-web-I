function inserir() {
    var tabela = document.querySelector("#tabelaContatos tbody");

    var nome = document.getElementById("nome").value.trim();
    var telefone = document.getElementById("telefone").value.trim();
    var email = document.getElementById("email").value.trim();

    if (!nome || !telefone || !email) {
        alert("Preencha todos os campos!!!")
        return
    }
    if (!validarEmail(email)) {
        alert("Por favor, insira um e-mail válido!");
        email.focus();
        return;
    }
    if (!validarTel(telefone)) {
        alert("Por favor, insira um telefone válido!");
        telefone.focus();
        return;
    }


    var newline = tabela.insertRow();

    newline.innerHTML = `
        <td>${nome}</td>
        <td>${telefone}</td>
        <td>${email}</td>
        <td class="flex gap-2 justify-center">
        <button class="btn btn-xs btn-warning btn-editar" onclick="editar()">📝 Editar</button>
        <button class="btn btn-xs btn-error btn-excluir" onclick="excluir()">🗑️ Excluir</button>
        <button class="btn btn-xs btn-success btn-salvar hidden onclick="salvar()">💾 Salvar</button>
      </td>
    `
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";

    adicionarEventosLinha(newline);
}

function validarEmail(email) {
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
}

function validarTel(tel) {
    if (tel.length < 14) {
        return false;
    }
    return true
}

function adicionarEventosLinha(linha) {
    const btnEditar = linha.querySelector(".btn-editar");
    const btnExcluir = linha.querySelector(".btn-excluir");
    const btnSalvar = linha.querySelector(".btn-salvar");

    btnEditar.addEventListener("click", () => {
        const colunas = linha.querySelectorAll("td");

        for (let i = 0; i < 3; i++) {
            const input = document.createElement("input");
            input.type = i === 1 ? "tel" : i === 2 ? "email" : "text";
            input.value = colunas[i].textContent;
            input.className = "input input-bordered input-xs w-full";
            colunas[i].textContent = "";
            colunas[i].appendChild(input);

            if (i==1){
                IMask(input,[
                    { mask: "(00) 0000-0000" },
                    { mask: "(00) 00000-0000" }
                ])
            }
        }

        btnEditar.classList.add("hidden");
        btnExcluir.classList.add("hidden");
        btnSalvar.classList.remove("hidden");
    });

    btnSalvar.addEventListener("click", () => {
        const inputs = linha.querySelectorAll("input");
        if (inputs.length !== 3) return;

        const nome = inputs[0].value.trim();
        const telefone = inputs[1].value.trim();
        const email = inputs[2].value.trim();

        if (!nome || !telefone || !email) {
            alert("Preencha todos os campos!!!");
            return; 
        }

        if (!validarEmail(email)) {
            alert("Por favor, insira um e-mail válido!");
            inputs[2].focus();
            return; 
        }

        if (!validarTel(telefone)) {
            alert("Por favor, insira um telefone válido!");
            inputs[1].focus();
            return;
        }

        var confirmacao = confirm("Deseja realmente salvar?")
        if(!confirmacao)return;

        linha.cells[0].textContent = nome;
        linha.cells[1].textContent = telefone;
        linha.cells[2].textContent = email;
        
        btnSalvar.classList.add("hidden");
        btnEditar.classList.remove("hidden");
        btnExcluir.classList.remove("hidden");
    });

    btnExcluir.addEventListener("click", () => {
        var confirmacao = confirm("Deseja excluir?");
        if(confirmacao)linha.remove();
    });
}


document.addEventListener("DOMContentLoaded", () => {
    var telefoneInput = document.getElementById("telefone");
    if (telefoneInput) {
        IMask(telefoneInput, [
            { mask: "(00) 0000-0000" },
            { mask: "(00) 00000-0000" }
        ]);
    }
    validarTel(telefoneInput);
});

