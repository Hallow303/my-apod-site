import { captureOwnerStack } from "react";
import { ESModulesEvaluator } from "vite/module-runner";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const app = document.querySelector("#app");

app.innerHTML = "<p>Loading...</p>";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
.then(resposta => resposta.json())
.then(data =>{
    console.log(data);

    app.innerHTML = `
        <h1>${data.title}</h1>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
    `
}).catch(() => {
    app.innerHTML = "<p>Erro ao carregar a imagem.</p>";
})