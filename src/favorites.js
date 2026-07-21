const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
const feed = document.querySelector(".feed");

if (favoritos.length === 0) {
    feed.innerHTML = `<p>No favorite APODs yet.</p>`;
}

favoritos.forEach(async (date) => {
    const resposta = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);

    const apod = await resposta.json();
    const card = `
    <article class="post">
        <div class="post-image"><img src="${apod.url}" alt="${apod.title}"></div>
        <footer class="post-footer">
            <span class="post-date">${apod.date}</span>
            <h3 class="post-title">${apod.title}</h3>
            <p class="caption">${apod.explanation}</p>
        </footer>
    </article>
    `;

feed.insertAdjacentHTML("beforeend", card);
});