let url1="https://api.jikan.moe/v4/seasons/now"
let url2="https://api.jikan.moe/v4/top/anime?filter=favorite"
let url3="https://api.jikan.moe/v4/top/anime?type=movie"
let url4="https://api.jikan.moe/v4/top/anime?filter=bypopularity"


let array1=[];
fetch_data();
async function fetch_data(){
    
    for(let i=0;i<5;i++){
        setTimeout(async ()=>{
        if(i==0){
            array1[i]=await top_airing();
        }
        else if(i==1){
            array1[i]=await most_favorite();
        }
        else if(i==2){
            array1[i]=await top_animated();
        }
        else if(i==3){
            array1[i]=await most_popular();
        }
       
        },i*500)
    }
    setTimeout(()=>{
        add_event(array1);
    },3000);
    
}



async function top_airing(){
    try{
        let response=await fetch(url1);
        let info=await response.json();
        add_anime(info,0);
        return info;
    }
    catch(error){
        console.log("error occured:",error);
    }
}
async function most_favorite(){
    try{
        let response=await fetch(url2);
        let info=await response.json();
        add_anime(info,1);
        return info;
    }
    catch(error){
        console.log("error occured:",error);
    }
}

async function top_animated(){
    try{
        let response=await fetch(url3);
        let info=await response.json();
        add_anime(info,2);
        return info;
    }
    catch(error){
        console.log("error occured:",error);
    }
}
async function most_popular(){
    try{
        let response=await fetch(url4);
        let info=await response.json();
        add_anime(info,3);
        return info;
    }
    catch(error){
        console.log("error occured:",error);
    }
}

function add_anime( info, index){
    let anime_containers=document.querySelectorAll(".anime_containers");

    for(let i=0;i<info.data.length;i++){
        let div=document.createElement("div");
        anime_containers[index].append(div);
        div.classList.add("anime");
        div.style.backgroundImage=`url(${info.data[i].images.jpg.large_image_url})`;
        if(index==0){
            div.classList.add("top_airing");
        }
        else if(index==1){
            div.classList.add("most_favorite");
        }
        else if(index==2){
            div.classList.add("top_animated");
        }
        else if(index==3){
            div.classList.add("most_popular");
        }
    }
}

function add_event(array){
    let anime=document.querySelectorAll(".anime");
    anime.forEach(element => {
        element.addEventListener('click',(e)=>{
                let all_elements=document.querySelectorAll(`.${element.classList[1]}`)
                let class_name=Array.from(all_elements);
                let index=class_name.indexOf(e.target);
                let data;        
        if(element.classList[1]==='top_airing'){
          data=array[0].data[index];
        }
        else if(element.classList[1]==='most_favorite'){
            data=array[1].data[index];
        }
        else if(element.classList[1]==='top_animated'){
            data=array[2].data[index];
        }
        else{
            data=array[3].data[index];
        }
        sessionStorage.setItem("animeData", JSON.stringify(data));
        window.location.href = "anime_page.html";
        })
    });
}



document.addEventListener('keydown',(e)=>{
    
let input=document.querySelector("#search");
    if(e.key==="Enter"){
        if(input.value!==""){

                    async function search(){

                            try{
                                let url=`https://api.jikan.moe/v4/anime?q=${input.value}`;
                                let data=await fetch(url);
                                let info=await data.json();
                             
                                if(info.data.length==0){
                                    window.location.href="error.html";
                                }
                                else{
                                    sessionStorage.setItem("multipleanimeData", JSON.stringify(info));
                                    window.location.href="searched.html"
                                }
                            }
                            catch(error){
                                console.log(error);
                                window.location.href="error.html";
                            }
                    }
                    search();
        }
    }
})



