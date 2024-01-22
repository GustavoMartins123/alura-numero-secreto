let listaNumerosSorteados = [];
let numMax = 100;
let numeroSecreto = gerarNumeroAleatorio();
let numTentativas = 0;
let chute = document.querySelector('input');

iniciarJogo();

function verificarChute() {
    if (!chute.value || (isNaN(chute.value))) {
        alert('Por favor, insira um numero valido.');
        limparCampo();
        return;
    }
    numTentativas++;
    let strTentativas = numTentativas == 1 ? '' : 's';
    let textoVerificar = chute.value == numeroSecreto ?
        `Parabens! Voce acertou o numero secreto: ${numeroSecreto}, com ${numTentativas} tentativa${strTentativas}!.`:
        chute.value < numeroSecreto ? 'O numero e maior, tente novamente.' :
            'O numero e menor, tente novamente.';
    exibirTextoNaTela('p', textoVerificar);
    if (chute.value == numeroSecreto) { exibirTextoNaTela('h1', 'Acertou!'); setBotaoNovoJogo(true); }
    else { limparCampo(); }
    
}
function limparCampo() {
    chute.value = '';
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function gerarNumeroAleatorio() {

    let numEscolhido = parseInt(Math.random() * numMax + 1);
    let qtdElementosLista = listaNumerosSorteados.length;
    if (qtdElementosLista == numMax) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numEscolhido)) {
        return gerarNumeroAleatorio();
    }
    else {
        listaNumerosSorteados.push(numEscolhido);
        return numEscolhido;
    }
        
}

function setBotaoNovoJogo(ativadoDesabilitado) {
    let novoJogo = document.getElementById('reiniciar');
    novoJogo = ativadoDesabilitado ? novoJogo.removeAttribute('disabled') : novoJogo.setAttribute('disabled', true);
    
    
}

function iniciarJogo() {
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 100');
}

function reiniciarJogo() {
    setBotaoNovoJogo(false);
    limparCampo();
    iniciarJogo();
    numTentativas = 0;
    numeroSecreto = gerarNumeroAleatorio();
}