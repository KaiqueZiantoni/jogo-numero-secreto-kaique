//let titulo = document.querySelector('h1');
//tituo.innerHTML = ('jogo do numero secreto');

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML= 'escolha um numero entre 1 e 10';
let listaDeNumerosSorteados = [] //crio essa variavel para armazenar os itens que o pc gerar automaticamente para o jogo, e compara-lo com a função para nao ser repetido
let numeroLimite = 10; //crio essa variavel para poder substituir, e nao ter que ficar alterando o numero em varios lugares.
let salvarNumero = gerarNumeroAleatorio();  // variavel para armazenar o numero criado  
let tentativas = 1; //tentativas sempre começam com 1, e adiciono +1 para cada tentativa (tentativa++)

function rodarTexto(tag, texto){
    let escrita= document.querySelector(tag);
    escrita.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagemInicial(){
    rodarTexto('h1', 'Bem vindo ao jogo');
    rodarTexto('p', 'escolha um numero de 1 a 10');
}


function verificarChute(){
    let chute = document.querySelector('input').value; 
    
    if(chute == salvarNumero) {
        rodarTexto('h1', 'ACERTOU');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Voce acertou o numero secreto com ${tentativas} ${palavraTentativa}`
        rodarTexto('P', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else{
        if (chute > salvarNumero){
            rodarTexto('p', `o numero secreto é menor que ${chute}`);
        } else{
            rodarTexto('p', `o numero secreto e maior que ${chute}`);
        }
        
        tentativas ++;
        limparCampo();
    }
} 

function gerarNumeroAleatorio() {
    let numeroEscolhido= parseInt(Math.random()* numeroLimite + 1); //numero escolhido é o numero gerado automaticamente, nao o valor que foi escolhido pelo usuario.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // coloco as duas variaveis igualando a primeira, com a lista de numeros ja criadas no ''listaDeNumerosSorteados

    if(quantidadeDeElementosNaLista == numeroLimite){ 
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    salvarNumero = gerarNumeroAleatorio()
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true);

}

exibirMensagemInicial();




