//Elementų išvedimas į ekraną
fetch("http://localhost:3000/motoData")
  .then(res => res.json())
  .then(data => data)
  .then(data => {
    let output = ""

    data.forEach(moto => {
      output += `
    <div class="motoKortele" id="${moto.id}">
    <h2>${moto.title}</h2>
    <img src="${moto.image}">
    <p>${moto.paragraph}</p>
    <button class="trintiMoto">Delete</button>
    <button class="redaguotiMoto">Edit</button>
    </div>
    `
      document.querySelector("#motoIsvedimas").innerHTML = output;


      document.querySelectorAll(".trintiMoto").forEach(btn => {
        btn.addEventListener("click", e => {
          let motoId = e.target.parentElement.id


          naikintiMoto(motoId)
        })
      })


      document.querySelectorAll(".redaguotiMoto").forEach(btn => {
        btn.addEventListener("click", e => {

          motocikloRedagavimas(e.target.parentElement.id);
        })
      })

    })

  })


//Elemento pridejimas 
document.querySelector("#pridetiMotocikla").addEventListener("submit", e => {
  e.preventDefault();
  let motoPavadinimas = e.target.elements.pavadinimas.value;

  let aprasas = e.target.elements.paragrafas.value;

  let foto = e.target.elements.nuoroda.value;


  fetch("http://localhost:3000/motoData", {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain,*/*',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({ title: motoPavadinimas, paragraph: aprasas, image: foto })
  })

})

//Elemento panaikinimas

let naikintiMoto = (id) => {
  fetch(`http://localhost:3000/motoData/${id}`, {
    method: "DELETE"
  })
}

//Elemento Redagavimas
let motocikloRedagavimas = (id) => {
  fetch(`http://localhost:3000/motoData/${id}`)
    .then(res => res.json())
    .then(data => {

      const forma = document.querySelector("#redaguotiMotocikla");


      forma.elements.submitEdit.id = data.id;
      forma.elements.pavadinimas.value = data.title;
      forma.elements.paragrafas.value = data.paragraph;
      forma.elements.nuoroda.value = data.image;

    })

  document.querySelector("#redaguotiMotocikla").addEventListener("submit", e => {
    e.preventDefault()

    let motocikloPavadinimas = e.target.elements.pavadinimas.value;
    console.log(motocikloPavadinimas);

    let aprasas = e.target.elements.paragrafas.value;
    console.log(aprasas);

    let paveikslas = e.target.elements.nuoroda.value;
    console.log(paveikslas)





    fetch(`http://localhost:3000/motoData/${e.target.elements.submitEdit.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json plain/text "
      },
      body: JSON.stringify({ title: motocikloPavadinimas, paragraph: aprasas, image: paveikslas })
    })

  })







}    