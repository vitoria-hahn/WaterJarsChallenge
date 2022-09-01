const { readFileSync, promises: fsPromises } = require("fs");
const { exit } = require("process");
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);
  return arr;
}

function splitVetor(vetorInicial) {
  let vetorFinal = [];
  vetorInicial.forEach((el) => {
    aux = [];
    el.split(" ").forEach((num) => aux.push(parseInt(num)));
    vetorFinal.push(aux);
  });
  return vetorFinal;
}

let valores = splitVetor(syncReadFile("./8-5.txt"));
// console.log(valores);

let capacidade = valores[0];
let inicial = valores[1];
let final = valores[2];
// console.log(capacidade);

const compare = (arr1, arr2) => {
  return (
    arr1.length === arr2.length &&
    arr1.every((item, index) => item === arr2[index])
  );
  
};

function derrama(de, para, jarros) {
  //   console.log(de, para, jarros);
  novoJarro = [jarros[0], jarros[1], jarros[2]];
  qtdNovoJarro = jarros[de] + jarros[para];
  let qtdSobrou = 0;
  if (qtdNovoJarro > capacidade[para]) {
    qtdSobrou = qtdNovoJarro - capacidade[para];
    qtdNovoJarro = capacidade[para];
  }
  novoJarro[de] = qtdSobrou;
  novoJarro[para] = qtdNovoJarro;
  return novoJarro;
}

jarrosVistos = new Set();
jarrosVistos.add(inicial);

jarrosVer = [[inicial, 1]];
// for (let i = 0; i < 3; i++) {
while (jarrosVer.length > 0) {
  let jarroPosicao = jarrosVer.shift();
  let jarrosAtual = jarroPosicao[0];
  let pos = jarroPosicao[1];
  //   console.log("JARRO ATUAl", jarrosAtual);
  //   console.log(jarrosVer);
  //   console.log("=======================");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i == j) continue;
      let novoJarro = derrama(i, j, jarrosAtual);
      if (jarrosVistos.has(novoJarro)) continue;
      jarrosVistos.add(novoJarro);
      if (compare(novoJarro, final)) {
        console.log("ACHEI", pos);
        exit();
      }
      //   else console.log(novoJarro);
      jarrosVer.push([novoJarro, pos + 1]);
    }
  }
}

console.log("Impossivel");
