let info = JSON.parse(sessionStorage.getItem("multipleanimeData"));

let container=document.querySelector("#container");

for(let i=0;i<info.data.length;i++){
    
    let anime_container=document.createElement("div");
    let anime=document.createElement("div");
    let name=document.createElement("h3");
    anime_container.classList.add("anime_container")
    anime.classList.add("anime")
    name.classList.add("name")
    container.append(anime_container);
    anime_container.append(anime);
    anime_container.append(name);
    anime.style.backgroundImage=`url(${info.data[i].images.jpg.large_image_url})`

let name_of_anime;
    if(info.data[i].title_english==null||info.data[i].title_english==""){
        name_of_anime=info.data[i].title;
    }
    else{
    name_of_anime=info.data[i].title_english;
    }

    name.innerText=`${name_of_anime}`
}


let button=document.querySelector("#button");
button.addEventListener("click",()=>{
    window.location.href="index.html"
}
)

let anime=document.querySelectorAll(".anime");

anime.forEach((element)=>{
    element.addEventListener("click",(e)=>{
        let list=Array.from(anime);
        let index=list.indexOf(e.target);
        sessionStorage.setItem("animeData", JSON.stringify(info.data[index]));
        window.location.href = "anime_page.html";
    })
})