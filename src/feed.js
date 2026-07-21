const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const feed = document.querySelector(".feed");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
let currentDate = new Date();
let loading = false;

async function loadMoreAPODs() {
    if (loading){
        return;
    }

    loading = true;
    const end = new Date(currentDate);
    const start = new Date(currentDate);

    start.setDate(start.getDate() - 9);
    const startDate = start.toISOString().split("T")[0];
    const endDate = end.toISOString().split("T")[0];

    try{
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`);
        const data = await response.json();

        data.reverse();
        data.forEach(apod => {
            if(apod.media_type !== "image"){
                return;
            }
            createPost(apod);
        });
        currentDate.setDate(currentDate.getDate() - 10);
    }catch(error){
        console.error(error);
        feed.innerHTML += `<p>Couldn't load APODs.</p>`;
    }
    loading = false;
}

function createPost(apod){

    const liked = favoritos.includes(apod.date);
    feed.insertAdjacentHTML("beforeend", `
    <article class="post">
        <header class="post-header">
            <div class="user-info">
                <div>
                    <span class="username">NASA APOD</span>
                    <br>
                    <span class="post-date">${apod.date}</span>
                </div>
            </div>
        </header>
        <div class="post-image">
            <img class="apod-image" src="${apod.url}" alt="${apod.title}">
        </div>
        <footer class="post-footer">
            <div class="actions">
                <div></div>
                <div class="right-actions">
                    <button class="icon-btn fav ${liked ? "active" : ""}" data-date="${apod.date}">
                        <i data-lucide="heart"></i>
                    </button>
                </div>
            </div>
            <h3 class="post-title">${apod.title}</h3>
            <p class="caption"><span class="description">${apod.explanation}</span></p>
        </footer>
    </article>
    `);
    lucide.createIcons();
}

feed.addEventListener("click", event => {
    const button = event.target.closest(".fav");
    if(!button){
        return;
    }

    const date = button.dataset.date;
    if(favoritos.includes(date)){
        favoritos = favoritos.filter(item => item !== date);
        button.classList.remove("active");
    }else{
        favoritos.push(date);
        button.classList.add("active");
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
});

window.addEventListener("scroll", ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 700){
        loadMoreAPODs();
    }
});

loadMoreAPODs();