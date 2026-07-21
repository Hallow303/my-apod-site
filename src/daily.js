const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const fav = document.querySelector(".fav");
const description = document.getElementById("description");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
let apod = null;

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
.then(resposta => resposta.json())
.then(dados => {
    apod = dados;
    
    document.getElementById("date").textContent = apod.date;
    document.getElementById("title").textContent = apod.title;

    description.textContent = apod.explanation;

    document.getElementById("image").src = apod.url;
    document.getElementById("image").alt = apod.title;
    
    if(favoritos.includes(apod.date)){
        fav.classList.add("active");
    }
}).catch((error) => {
    console.error(error);
    description.textContent = "Couldn't load the info..."
});

fav.addEventListener("click", () => {
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