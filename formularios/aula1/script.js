function boasVindas1() {
    var nome = document.getElementById("NomeCompleto").value
    alert("Bem vindo " + nome)
}

function boasVindas() {
    var nome = document.getElementById("NomeCompleto").value
    if (nome != "Lucas") {
        alert(nome + " é gay")
    } else {

        alert("Bem vindo " + nome)
    }
}

function sorteDoDia() {
    fetch('frases.json')
        .then(response => response.text())
        .then(texto => {
            const frases = texto
                .split('\n')
                .map(frase => frase.trim())
                .filter(frase => frase.length > 0);
            const indice = Math.floor(Math.random() * frases.length);

            alert("Frase do dia:\n\n" + frases[indice]);

        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo de frases:', error);
            alert('Não foi possível carregar as frases.');
        });
}

function mudaCorFundo(cor) {
    document.getElementById("corFundoTexto").innerHTML = cor.toUpperCase();
    document.body.style.backgroundColor = cor
}

function initDragAndDrop(areaId, infoId) {
    const uploadArea = document.getElementById(areaId);
    const fileInfo = document.getElementById(infoId);

    // Cria input de arquivo oculto
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.hidden = true;
    uploadArea.appendChild(fileInput);

    // Estilo e conteúdo padrão
    uploadArea.classList.add('upload-area');
    uploadArea.innerHTML = `
    <h3>Arraste e solte o arquivo aqui</h3>
    <p>ou clique para selecionar</p>
  `;

    // Clique abre seletor de arquivo
    uploadArea.addEventListener('click', () => fileInput.click());

    // Eventos drag & drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // Quando o arquivo é selecionado manualmente
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    // Função para processar arquivos
    function handleFiles(files) {
        if (!files.length) return;
        const file = files[0];

        fileInfo.innerHTML = `
      <strong>Arquivo:</strong> ${file.name}<br>
      <strong>Tamanho:</strong> ${(file.size / 1024).toFixed(2)} KB`;

        // Se for imagem, mostra preview com botão de exclusão
        if (file.type.startsWith('image/')) {
            const container = document.createElement('div');
            container.classList.add('preview-container');

            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = '×';

            // Clicar na imagem mostra botão (opcional)
            img.addEventListener('click', () => {
                deleteBtn.style.display = deleteBtn.style.display === 'block' ? 'none' : 'block';
            });

            // Clicar em excluir apaga tudo
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // evita abrir o input
                container.remove();
                fileInfo.innerHTML = '';
                fileInput.value = ''; // reseta input
                uploadArea.innerHTML = `
          <h3>Arraste e solte o arquivo aqui</h3>
          <p>ou clique para selecionar</p>
        `;
            });

            container.appendChild(img);
            container.appendChild(deleteBtn);
            fileInfo.appendChild(container);
        }
    }
}
function mostrarSenha(botao) {
    var input = document.getElementById("senha");

    if (input.type == "password") {
        input.type = "text";
        botao.value = "Esconder";
    } else {
        input.type = "password";
        botao.value = "Mostrar"
    }


}

function atualizaValor(valor) {
    document.getElementById("valorIdade").innerText = valor;
}
function tamanho(tamanho) {

    document.getElementById("valorMutavel").innerHTML = tamanho

}

// Para capturar o conteúdo
function getText() {
    const content = document.querySelector('.editor').innerHTML;
    console.log(content);
}


// Inicializa
initDragAndDrop('uploadArea', 'fileInfo');

const phone = document.getElementById('phone');

phone.addEventListener('input', function () {
    // remove tudo que não for dígito
    let digits = this.value.replace(/\D/g, '');

    // limita a 11 dígitos (DDD + 8/9 números)
    if (digits.length > 11) digits = digits.slice(0, 11);

    // formata conforme quantidade de dígitos
    if (digits.length <= 2) {
        this.value = digits; // apenas DDD parcial
    } else if (digits.length <= 6) {
        // (XX) XXXX...
        this.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
        // (XX) XXXX-XXXX  -- telefone sem 9º dígito (8 números)
        this.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
        // (XX) XXXXX-XXXX  -- com 9º dígito (11 dígitos)
        this.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
});

