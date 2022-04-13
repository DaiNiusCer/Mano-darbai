/*
fetch("http://localhost:3002/destytojas")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    document.querySelector("#grupesLentele > tbody").innerHTML = `
    <tr>
    <td>${data.vardas}</td>
    <td>${data.pavarde}</td>
    </tr>
    
    `
  })
  .then(() => fetch("http://localhost:3002/studentai")
    .then(res => res.json())
    .then(data => {

      data.forEach(studentas => {
        grupesIsvedimnasILenetele(studentas)
          ;

      })
    })
  )

let grupesIsvedimnasILenetele = (asmuo) => {
  document.querySelector("#grupesLentele > tbody").innerHTML += `
    <tr>
    <td>${asmuo.vardas}</td>
    <td>${asmuo.pavarde}</td>
    </tr>
    
    `
}

document.querySelector("#pridetiStudenta").addEventListener("submit", e => {
  e.preventDefault();
  console.dir(e.target);
  let vardas = e.target.elements.studVardas.value;
  console.log(vardas)
  let pavarde = e.target.elements.studPavarde.value;
  console.log(pavarde)

  fetch("http://localhost:3002/studentai", {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain,',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({ vardas: vardas, pavarde: pavarde })
  })
})

*/


/*Nauja-sena užduotis*/
//Paveikslai
//Pirma dalis įkeliami visi paveikslai iš xxx.json failo
fetch("http://localhost:3000/superMenas")
  .then(res => res.json())
  .then(data => data)
  .then(data0 => {
    let output = ""
    data0.forEach(paveikslas => {
      output += `
      <hr>
    <div class="imagePlusParagraph" id="${paveikslas.id}">
    <h2>${paveikslas.title}</h2>
    <img src="${paveikslas.image}">
    <p>${paveikslas.paragraph}</p>
    <button class="btnDelete">Delete</button>
    <button class="btnEdit">Edit</button>
    </div>
    `
      document.querySelector("#visiPaveikslai").innerHTML = output;
      //Eilutė kaip apsirašo mygtuko trinimas-uždedama visiems mygtukams event liseneris/pražia taip pat trynimo eina vėliau negu elementų sukūrimas PIRMIAUSIA REIKIA SUKURTI VISUS NORIMUS ELEMENTUS TIK PO TO DĖTI LISENERĮ IR JŲ TRYNIMĄ tam pačiam then
      document.querySelectorAll(".btnDelete").forEach(btn => {
        btn.addEventListener("click", e => {
          let paveiksloId = e.target.parentElement.id
          naikintiPaveiksla(paveiksloId)
        })
      })
      //Lisenerio pabaiga
      //Dedamas kitas liseneris editinimui prie jau sukurto mygtuko
      document.querySelectorAll(".btnEdit").forEach(btn => {
        btn.addEventListener("click", e => {
          //Atskira funkcija paveikslo redagavimui
          paveiksloRedagavimas(e.target.parentElement.id);
        })
      })

    })
  })
//Čia yra then pabaiga

//Antra dalis susikuriam forma+ paveikslu papildymui
// Trecia dalis-Susideti event lisenerius i forma ir taip pat naudoti fetch

//Bet kokių duomenų pridėjimas gali rašytis visiškai atskirai
document.querySelector("#pridetiPaveiksla").addEventListener("submit", e => {
  e.preventDefault();
  let paveiksloPavadinimas = e.target.elements.pavadinimas.value;
  console.log(paveiksloPavadinimas);

  let aprasas = e.target.elements.paragrafas.value;
  console.log(aprasas);

  let paveikslas = e.target.elements.nuoroda.value;
  console.log(paveikslas)

  fetch("http://localhost:3000/superMenas", {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain,*/*',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({ title: paveiksloPavadinimas, paragraph: aprasas, image: paveikslas })
  })

})

//Delete funkcija 1.Pasirošom fetch ir fechinam pagal linką 2.trinam pagal id kurį dažniausiai susieškom per parent element id

//Naikinimas išsirašo labai paprastai tiesiog per parent element id

let naikintiPaveiksla = (id) => {
  fetch(`http://localhost:3000/superMenas/${id}`, {
    method: "DELETE"
  })
}

//Visas paveikslo redagavimas vyksta vienoje funkcijoje
let paveiksloRedagavimas = (id) => { //Didžioji funkcija prdžia
  fetch(`http://localhost:3000/superMenas/${id}`)
    .then(res => res.json())
    .then(data => {
      //Paimtus duomenis iš super meno prilyginam savo formos eilutėms
      //Kurie buvo fechinti is failo su GET
      const forma = document.querySelector("#redaguotiPaveiksla");
      console.dir(forma)

      forma.elements.submitEdit.id = data.id;
      forma.elements.pavadinimas.value = data.title;
      forma.elements.paragrafas.value = data.paragraph;
      forma.elements.nuoroda.value = data.image;

    })

  document.querySelector("#redaguotiPaveiksla").addEventListener("submit", e => {
    e.preventDefault()

    let paveiksloPavadinimas = e.target.elements.pavadinimas.value;
    console.log(paveiksloPavadinimas);

    let aprasas = e.target.elements.paragrafas.value;
    console.log(aprasas);

    let paveikslas = e.target.elements.nuoroda.value;
    console.log(paveikslas)

    //Redagavimo metodas PUT-skirtas redaguoti turimą informaciją
    fetch(`http://localhost:3000/superMenas/${e.target.elements.submitEdit.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json plain/text "
      },
      body: JSON.stringify({ title: paveiksloPavadinimas, paragraph: aprasas, image: paveikslas })
    })

  }) //Lisenerio pabaiga







}    //Didžioji funkcija pabaiga










