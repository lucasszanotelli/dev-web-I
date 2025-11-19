function verCotacao() {
    const nome = document.getElementById("cripto").value;
    const result = document.getElementById("cotacao");

    if (!nome) {
        result.innerHTML = `<span class="text-error">Selecione uma criptomoeda.</span>`;
        return;
    }

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${nome}&vs_currencies=brl,usd`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const real = data[nome].brl;
            const dolar = data[nome].usd;

            if (!real || !dolar) {
                result.innerHTML = `<span class="text-error">Erro ao obter cotação.</span>`;
                return;
            }

            result.innerHTML = `
                <strong>${nome.toUpperCase()}</strong><br>
                R$ ${real.toLocaleString("pt-BR")}<br>
                US$ ${dolar.toLocaleString("pt-BR")}

            `;
        })
        .catch(() => result.innerHTML = `<span class="text-error">Erro ao acessar API.</span>`);
}


function converter() {
    const nome = document.getElementById("cripto").value;
    const valor = parseFloat(document.getElementById("valor").value);

    const span = document.getElementById("resultado");

    if (!nome) {
        span.innerHTML = `<span class="text-error">Selecione uma criptomoeda.</span>`;
        return;
    }

    if (isNaN(valor) || valor <= 0) {
        span.innerHTML = `<span class="text-error">Digite um valor válido.</span>`;
        return;
    }

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${nome}&vs_currencies=brl`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const preco = data[nome]?.brl;

            if (!preco) {
                span.innerHTML = `<span class="text-error">Erro ao obter cotação.</span>`;
                return;
            }

            const quantidade = valor / preco;

            span.innerHTML = `
                Você compraria <strong>${quantidade.toFixed(8)}</strong> ${nome.toUpperCase()}
            `;
        })
        .catch(() => span.innerHTML = `<span class="text-error">Erro ao acessar API.</span>`);
}
