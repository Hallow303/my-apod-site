const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const input = document.getElementById("dateInput");
const button = document.getElementById("searchBtn");
const fav = document.querySelector(".fav");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
let apod = null;

button.addEventListener("click", () =>{
    if(!input.value){
        return;
    }

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${input.value}`)
    .then(resposta => resposta.json())
    .then(dados => {
        apod = dados;

        document.getElementById("title").textContent = apod.title;
        document.getElementById("date").textContent = apod.date;
        document.getElementById("description").textContent = apod.explanation;
        document.getElementById("image").src = apod.url;
        document.getElementById("image").alt = apod.title;

        fav.classList.remove("active");
        if(favoritos.includes(apod.date)){
            fav.classList.add("active");
        }
    }).catch((error) => {
        console.error(error);
        alert("Couldn't load this APOD");
    });
});

fav.addEventListener("click", () =>{
    if(!apod){
        return;
    }

    if(favoritos.includes(apod.date)){
        favoritos = favoritos.filter(item => item !== apod.date);
        fav.classList.remove("active");
    }else{
        favoritos.push(apod.date);
        fav.classList.add("active");
    }
    
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
});