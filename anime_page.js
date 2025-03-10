let data = JSON.parse(sessionStorage.getItem("animeData"));


let button=document.querySelector("#button");
button.addEventListener("click",()=>{
    window.location.href="index.html";
});

let url=`https://api.jikan.moe/v4/anime/${data.mal_id}/characters`
fetch(url)
.then((response)=>{
    return response.json();
})
.then((data1)=>{

let airing;
if(data.airing==false){
    airing="finished airing";
}
else if(data.airing==true){
    airing="not finished yet";
}
else{
    airing="no info yet";
}



let s=[]
for(let i=0;i<(data.genres.length);i++){
    if(i==0){
        s[i]=data.genres[i].name;
    }
    else{
        s[i]=s[i-1]+","+data.genres[i].name;
    }
}



let string=[]
for(let i=0;i<(data.studios.length);i++){
    if(i==0){
        string[i]=data.studios[i].name;
    }
    else{
        string[i]=string[i-1]+","+data.studios[i].name;
    }
}


let name_of_anime;
    if(data.title_english==null||data.title_english==""){
        name_of_anime=data.title;
    }
    else{
    name_of_anime=data.title_english;
    }

  


    
let main_div=document.querySelector("#main_div");
main_div.innerHTML=`   <div id="image_div"></div>
        <div id="info_div">
        <h2>${name_of_anime}</h2>
        <div id="synopsis" class="design"><h3><span>Synopsis:-</span>${data.synopsis}</h3></div>
        <div id="content">
                <div id="age_limit" class="design"><span>Age Limit:- </span>${data.rating}</div>
                <a href="https://myanimelist.net/topanime.php"><div id="rank" class="design"><span>Rank:- </span>${data.rank}</div></a>
                <div id="episodes" class="design"><span>Total Ep:- </span>${data.episodes}</div>
                <div id="airing" class="design"><span>Airing:- </span>${airing}</div>
                <div id="score" class="design"><span>Score:- </span>${data.score}/10</div>
                <div id="studios" class="design"><span>Studios:- </span>${string[data.studios.length-1]}</div>   
                <div id="genres" class="design"><span>Genres:- </span>${s[data.genres.length-1]}</div>  
                <a href=${data.trailer.url}><div class="design" id="trailer">click to watch the trailer</div></a>
                <div id="year" class="design"><span>Release Year:- </span>${data.year}</div>
            </div>
       

            <h5 >Main Characters</h5>
        <div id="outer_div">
            
       
        </div>
       
        
        </div>`

          

let image_div=document.querySelector("#image_div");
image_div.style.backgroundImage=`url(${data.images.jpg.large_image_url})`



let outer_div=document.querySelector("#outer_div")
for(let i=0;i<data1.data.length;i++){
    if(data1.data[i].role=="Main"){
        let block=document.createElement("div");
        outer_div.append(block);
        block.classList.add("blocks");
        let character=document.createElement("div");
        let ptag=document.createElement("p");
        block.append(character);
        block.append(ptag);
        character.classList.add("character");
        character.style.backgroundColor="red"
        character.style.backgroundImage=`url(${data1.data[i].character.images.jpg.image_url})`
        ptag.innerText=`${data1.data[i].character.name}`
    }
    else{
        break;
    }
   
}



})