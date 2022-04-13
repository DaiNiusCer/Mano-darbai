
let ekranoSkaicius = null;
let atmintiesSkaicius = null;
let ekranas = document.querySelector("#isvestis")




document.querySelector("#trintiViska").addEventListener("click", clearScreen) //isvalyti viska kas prasyta ekrane

function clearScreen() {
  ekranoSkaicius = null;
}
//Istrinti viena skaiciu
document.querySelector("#reset").addEventListener("click", deleteSymbol)

function deleteSymbol(e) {
  e.preventDefault();



}
//Teigiama neigiama skaičius
document.querySelector("#teigiamaNeigiama").addEventListener("click", changeSign)

function changeSign(e) {
  e.preventDefault();


  ekranas.value *= -1;
}

//Skaiciu ir simboliu vaizdavimas ekrane
//7
document.querySelector("#septyni").addEventListener("click", septyni)

function septyni(e) {
  e.preventDefault();
  let skaiciusArbaSimbolis = document.querySelector("#septyni").innerHTML

  ekranas.value += skaiciusArbaSimbolis

}

//8
document.querySelector("#astuoni").addEventListener("click", astuoni)

function astuoni(e) {
  e.preventDefault();
  let skaiciusArbaSimbolis = document.querySelector("#astuoni").innerHTML

  ekranas.value += skaiciusArbaSimbolis
}
//9
document.querySelector("#devyni").addEventListener("click", devyni)

function devyni(e) {
  e.preventDefault();
  let skaiciusArbaSimbolis = document.querySelector("#devyni").innerHTML

  ekranas.value += skaiciusArbaSimbolis
}
//4
document.querySelector("#keturi").addEventListener("click", keturi)

function keturi(e) {
  e.preventDefault();
  let skaiciusArbaSimbolis = document.querySelector("#keturi").innerHTML

  ekranas.value += skaiciusArbaSimbolis
}
//5
document.querySelector("#penki").addEventListener("click", penki)

function penki(e) {
  e.preventDefault();
  let skaiciusArbaSimbolis = document.querySelector("#penki").innerHTML

  ekranas.value += skaiciusArbaSimbolis
}

//6
document.querySelector("#sesi").addEventListener("click", sesi)

function sesi(e) {
  e.preventDefault();
  let skaiciusArbaSimbolis = document.querySelector("#sesi").innerHTML

  ekranas.value += skaiciusArbaSimbolis
}
//1
document.querySelector("#vienas").addEventListener("click", vienas)

function vienas(e) {
  e.preventDefault();
  let skaiciusArbaSimbolis = document.querySelector("#vienas").innerHTML

  ekranas.value += skaiciusArbaSimbolis
}
//2
document.querySelector("#du").addEventListener("click", du)

function du(e) {
  e.preventDefault();
  let skaiciusArbaSimbolis = document.querySelector("#du").innerHTML

  ekranas.value += skaiciusArbaSimbolis
}
//3
document.querySelector("#trys").addEventListener("click", trys)

function trys(e) {
  e.preventDefault();
  let skaiciusArbaSimbolis = document.querySelector("#trys").innerHTML

  ekranas.value += skaiciusArbaSimbolis
}
//0
document.querySelector("#nulis").addEventListener("click", nulis)

function nulis(e) {
  e.preventDefault();
  let skaiciusArbaSimbolis = document.querySelector("#nulis").innerHTML

  ekranas.value += skaiciusArbaSimbolis
}
//Matematiniai ženklai:
//+
document.querySelector("#sudetis").addEventListener("click", simbolis)

function simbolis(e) {
  e.preventDefault();
  let simbolis = document.querySelector("#sudetis").innerHTML

  ekranas.value += simbolis
}
//-
document.querySelector("#atimtis").addEventListener("click", simbolis1)

function simbolis1(e) {
  e.preventDefault();
  let simbolis = document.querySelector("#atimtis").innerHTML

  ekranas.value += simbolis
}
//*
document.querySelector("#daugyba").addEventListener("click", simbolis2)

function simbolis2(e) {
  e.preventDefault();
  let simbolis = document.querySelector("#daugyba").innerHTML

  ekranas.value += simbolis
}
//  /
document.querySelector("#dalyba").addEventListener("click", simbolis3)

function simbolis3(e) {
  e.preventDefault();
  let simbolis = document.querySelector("#dalyba").innerHTML

  ekranas.value += simbolis
}

//%
document.querySelector("#liekana").addEventListener("click", simbolis4)

function simbolis4(e) {
  e.preventDefault();
  let simbolis = document.querySelector("#liekana").innerHTML

  ekranas.value += simbolis
}
// **
document.querySelector("#kvadratu").addEventListener("click", simbolis5)

function simbolis5(e) {
  e.preventDefault();
  let simbolis = document.querySelector("#kvadratu").innerHTML

  ekranas.value += simbolis
}
//saknis
document.querySelector("#saknis").addEventListener("click", simbolis6)

function simbolis6(e) {
  e.preventDefault();
  let simbolis = document.querySelector("#saknis").innerHTML
  ekranas.value += simbolis
}
// taskas
document.querySelector("#taskas").addEventListener("click", simbolis7)

function simbolis7(e) {
  e.preventDefault();
  let simbolis = document.querySelector("#taskas").innerHTML
  ekranas.value += simbolis
}
//------------------------------------------------------------------
//Apskaičiavimas
let saknis = document.querySelector("#saknis").innerHTML
document.querySelector("#lygu").addEventListener("click", atsakymas);

function atsakymas(e) {
  e.preventDefault();
  ekranas.value = eval(ekranas.value);






}