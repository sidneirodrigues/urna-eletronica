import { etapas } from "./etapas.js";
console.log(etapas)

function selectElement(identificador) {
    return document.querySelector(`${identificador}`)
}

let seuVotoPara = selectElement('.d-1-1 span');
seuVotoPara.style.display = 'none';

let cargo = selectElement('.d-1-2 span');
cargo.style.display = 'none';

let descricao = selectElement('.d-1-4');
descricao.style.display = 'none';

let aviso = selectElement('.d__2');
aviso.style.display = 'none';