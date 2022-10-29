import { etapas } from "./etapas.js";

function selectElement(identificador) {
    return document.querySelector(`${identificador}`);
}

function selectAllElement(identificador) {
    return document.querySelectorAll(`${identificador}`);
}

//Elementos de manipulação visual da tela

let seuVotoPara = selectElement('.d-1-1 span');
let cargo = selectElement('.d-1-2 span');
let descricao = selectElement('.d-1-4');
let aviso = selectElement('.d__2');
let lateral = selectElement('.d__1-right');
let numeros = selectElement('.d-1-3');

//Variaveis de ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = true;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numerosHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0; i<etapa.numeros; i++){
        if(i === 0) {
            numerosHtml += '<div class="numero pisca"></div>';
        }else {
            numerosHtml += '<div class="numero"></div>';
        }
       
    }

    seuVotoPara.style.display = 'block';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = ''
    numeros.innerHTML = numerosHtml
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true
        } else {
            return false
        }
    });

    if(candidato.length > 0){
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.name} <br/>
        Partido: ${candidato.partido} <br/>
        ${candidato.cargoVice}: ${candidato.nomeVice}`;

        let fotosHtml = ''
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small">
                                <img src="./assets/images/${candidato.fotos[i].url}" alt="Presidente">
                                ${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="d-1-image">
                                <img src="./assets/images/${candidato.fotos[i].url}" alt="Presidente">
                                ${candidato.fotos[i].legenda}</div>`
            }
            
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">CANDIDATO INVÁLIDO</div>`

    }
}

function clicou(n) {
    let numeroClicado = selectElement('.numero.pisca');
    if(numeroClicado !== null) {
        numeroClicado.innerHTML = n;
        numero = `${numero}${n}`;

        numeroClicado.classList.remove('pisca');
        if(numeroClicado.nextElementSibling !== null) {            
            numeroClicado.nextElementSibling.classList.add('pisca')//Pegando o proximo elemento.
        } else {
            atualizaInterface();
        }
    
    }
}

//Seleçao de botões

let numeroTeclado = selectAllElement('.numeros')
numeroTeclado.forEach(element => {
    element.addEventListener('click', ()=> {
        clicou(element.innerHTML)
    })
});

let btnBCC = selectAllElement('.btn_function')
btnBCC.forEach(element => {
    element.addEventListener('click', ()=>{
        if(element.innerHTML === 'BRANCO'){
            if(numero === ''){
                votoBranco = true;
                seuVotoPara.style.display = 'block';
                aviso.style.display = 'block';
                numeros.innerHTML = '';
                descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
            } else {
                alert('NÃO É POSSIVEL VOTAR EM BRANCO APÓS TER DIGITADO ALGUM NUMÉRO')
            }
        }else if(element.innerHTML === 'CORRIGE'){
            comecarEtapa()
        } else {
            let etapa = etapas[etapaAtual];

            let votoConfirmado = false;

            if(votoBranco == true){
                votoConfirmado = true;
                votos.push({
                    etapa: etapas[etapaAtual].titulo,
                    voto: "BRANCO"
                });
            } else if(numero.length == etapa.numeros){
                votoConfirmado= true
                votos.push({
                    etapa: etapas[etapaAtual].titulo,
                    voto: numero
                });
            }

            if(votoConfirmado) {
               etapaAtual++
               if(etapas[etapaAtual] !== undefined){
                    comecarEtapa()
               } else {
                    let tela = selectElement('.tela')
                    tela.innerHTML = `<div class="aviso--gigante pisca">FIM</div>`
                    console.log(votos);
               }
               
            }
        }
        
    })
})


comecarEtapa()




