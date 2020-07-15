








let APIKEY = "";



function bookmarkStorage()
{

        let bookmarkStorage = localStorage.getItem("bookmark");

        if(bookmarkStorage === null)
        {
            bookmarks ={

                recipes:{
            
                }
            
            }

            localStorage.setItem("bookmark", JSON.stringify(bookmarks))
        }

        return  localStorage.getItem("bookmark");

}



function addBookmark(article)
{


    let bookmarks = JSON.parse(bookmarkStorage());

    let foodTitle = article.getElementsByClassName("foodtitle")[0].textContent;

    id = article.attributes["id"];
    let ingredient =  [];

    let articleIngredients =article.querySelectorAll(".ingredient li");


    for(let i =0; i <articleIngredients.length;i++)
    {
        ingredient.push(articleIngredients[i].textContent);
    }
    let image = article.querySelector(".foodimage").src;
    
    let healthLabel = [];



    let articleHealthLabel = article.querySelectorAll(".foodhealth li");


    for(let i =0; i <articleHealthLabel.length;i++)
    {
        healthLabel.push(articleHealthLabel[i].textContent);
    }


    let recipeUrl = article.querySelector(".instructions-button a").attributes["href"].value;


    let calories = article.querySelector(".calorie").textContent.split(" ")[0];

    let protien = article.querySelector(".protien").textContent.split(" ")[0];

    let carbs = article.querySelector(".carbs").textContent.split(" ")[0];
    let saturates = article.querySelector(".saturates").textContent.split(" ")[0];

    let fibre = article.querySelector(".fibre").textContent.split(" ")[0];

    let salt = article.querySelector(".salt").textContent.split(" ")[0];

    let fat = article.querySelector(".fat").textContent.split(" ")[0];


    


bookmarks.recipes[`${foodTitle}`] ={
    id:id,
    url:recipeUrl,
    title:foodTitle,
    ingredient: ingredient,
    image : image,
    health: healthLabel,
    calories:calories,
    protien:protien,
    carbs: carbs,
    saturates: saturates,
    fibre:fibre,
    salt:salt,
    fat:fat

}

localStorage.setItem("bookmark", JSON.stringify(bookmarks));

console.log("bookmarked")

}


function removeBookmark(foodTitle)
{
    let bookmarks = JSON.parse(bookmarkStorage());

    delete bookmarks.recipes[`${foodTitle}`];
    

    localStorage.setItem("bookmark", JSON.stringify(bookmarks));

    console.log("Removed bookmarked")


}

function bookmark(event)
{
    let article= this.parentElement.parentElement;
    
    let foodTitle = article.getElementsByClassName("foodtitle")[0].textContent;

    let bookmarks = JSON.parse(bookmarkStorage());

    let recipes = bookmarks.recipes;

    let confirmed = article.querySelector(".bookmarked");


    this.style.color = "rgb(212, 212, 212)";
    removeBookmark(foodTitle);

    article.remove()
        
    
  



  

}


function setBookmarkButton()
{
    let bookmarkButtons = document.getElementsByClassName("bookmark");

    

    for(let i = 0 ; i < bookmarkButtons.length; i++)
    {
        bookmarkButtons[i].addEventListener("click", bookmark);

    }

}





function bodyNavtoggle()
{ 
    
    let navDisplay = window.getComputedStyle(nav).visibility;

    if(navDisplay !== "hidden")
    {
        nav.style.visibility = "hidden";
        nav.style.opacity = "0";
    }

}





function killVideoPlayer(event)
{
    let videoContainer =  this.parentElement.parentElement.getElementsByClassName("video-container")[0];

    console.log(videoContainer)

    let iframe = videoContainer.querySelector("iframe");

    let currentDisplay =getComputedStyle(videoContainer).display;

    if(currentDisplay == "flex")
    {
        videoContainer.style = "none";

        iframe.src = "";

        let bodyElement = document.querySelector("body");

        bodyElement.style.overflowY="visible";



    }
}


function setUpVideoContainer()
{
    let closeButtons  = document.getElementsByClassName("close");


    for(i=0; i<closeButtons.length;i++)
    {
        closeButtons[i].addEventListener("click", killVideoPlayer);
    }



}



async function youtubeUrl(foodtitle)
{
    let youtubeAPiKey = "";
    let url =  `https://www.googleapis.com/youtube/v3/search?maxResults=1&q=${foodtitle}&key=${youtubeAPiKey}`;

   let findUrl =  fetch(url)
    .then(response => {return response.json()})
    .then(data =>
        
       {
           if(data.items.length > 0 )
        {
            pathurl = "https://www.youtube.com/embed/"+data.items[0].id.videoId;

            return pathurl;
        }
        else{
            return "none";
        }
    }
        )

       

    return findUrl;
}

function videoPlayer(event)
{
    let article = this.parentElement.parentElement;
    
    let foodtitle = article.getElementsByClassName("foodtitle")[0]
    .textContent;


    let videoContainer =  article.getElementsByClassName("video-container")[0];

    let loader = videoContainer.querySelector(".loader");

    let iframe = videoContainer.querySelector(".video");

    const AJAX = new XMLHttpRequest ();

    let youtubeAPiKey = "";
    let url =  `https://www.googleapis.com/youtube/v3/search?maxResults=1&q=${foodtitle}&key=${youtubeAPiKey}`;

    AJAX.open("GET",url, true);

    AJAX.send();

    AJAX.onprogress = async function(event)
    {
        if (event.loaded < event.total)
        {
            loader.style.display="block";

        }
        else{
            loader.style.display = "none";
        }
     
    }
    AJAX.onload = function()
    {
        videoContainer.getElementsByClassName("videotitle")[0].textContent = foodtitle;
        let videoUrl = JSON.parse(this.responseText).items[0].id.videoId;
        videoContainer.style.display="flex";
        videoUrl  = "https://www.youtube.com/embed/"+videoUrl;
        iframe.src = videoUrl;
    }


    


    //;


    event.preventDefault ();

}


    





function setPlayButton(){

    let buttons = document.getElementsByClassName("play");

    for(i =0; i<buttons.length;i++)
    {
        buttons[i].addEventListener("click", videoPlayer)
    }
}


function ingredientBoxDisplay(event)
{   
    let ingredientBox =this.parentElement;

    let currentDisplay = getComputedStyle(ingredientBox).display;


    ingredientBox.style.display ="none";
   

   
}

function ingredientButtonOpen(event)
{
    let ingredientBox =this.parentElement.parentElement.getElementsByClassName("ingredient")[0];

    let currentDisplay = getComputedStyle(ingredientBox).display;
    ingredientBox.style.display="flex";
    event.preventDefault();
}

function setIngredientCloseButton()
{
    
const ingredientCloseButton  = document.getElementsByClassName("i-close");
for(let i =0; i<ingredientCloseButton.length;i++)
{  
    ingredientCloseButton[i].addEventListener("click", ingredientBoxDisplay)
}

const ingredientButton = document.getElementsByClassName("ingredient-button");
for(let i =0; i<ingredientButton.length;i++){
            ingredientButton[i].addEventListener("click", ingredientButtonOpen)
}


}




function article(data)
{

    let anArticle = document.createElement("article");
    anArticle.setAttribute("id", data.id);

    let template = 
    `
    <div class="bookmark-container">
      <i class="fas fa-bookmark bookmark"></i>
      <div class="bookmarked" style="color:#13d6c6">Bookmarked</div>
    </div>


        <div class="row " id="foodprofile">

    
        <div class="video-container">

        <i  class="fa fa-times close" aria-hidden="true"></i>

        <h1 class= "videotitle">Chicken Vesuvio</h1>
        <div class="loader"></div>

        <iframe  class="video"
            src="">
        </iframe>
  
  
      </div>
  
    

    <h1 class="foodtitle">${data.title}</h1>

    <div class="ingredient-container">

      <img class="foodimage" src="${data.image}">

      <ul class="ingredient">

      <i  class="fa fa-times i-close" aria-hidden="true"></i>


      <h2 class="subtitle">ingredient</h2>
`





// add ingredient to the article
data.ingredient.forEach(ingredient =>
    {
        template+= `<li><span></span>${ingredient}</li>`
    }
    );


    template +=`</ul></div>  <ul class="button-container">
    <li id="${data.id}" class="play col-sm-3 bg-red"> <img src="/Image/play-button.svg" alt="playButton"></li>
    <li class="instructions-button col-sm-3 bg-green"> <a  href="${data.url}" target="_blank">Intructions</a></li>
    <li class="ingredient-button col-sm-3 bg-grey"> <a  href="">Ingredient</a></li>
      

  </ul>

  </div>

  <div class="row bg-mustard  " id="health">

  <h1>Nutrition</h1>


    <ul class="foodhealth"> 

`



data.health.forEach(healthLabel =>{

 template+=  `<li><i class="far fa-check-circle"></i>${healthLabel}</li>`
})


template+=` </ul> 
<h2><span class="calorie">${data.calories}</span> KCAL</h2>

<ul  class="calories">

<li>Fat <span class="fat">${data.fat} g</span></li>
<li>Protien <span class="protien">${data.protien} g</span></li>
<li>Carbs <span class="carbs">${data.carbs} g</span></li>
<li>Saturates <span class="saturates">${data.saturates} g</span></li>
<li>Fibre <span class="fibre">${data.fibre} g</span></li>
<li>Salt <span class="salt">${data.salt} mg</span><span></li>


</ul>


</div>
`




anArticle.innerHTML = template;

return anArticle;

}







function parseJson()
{


    let data = localStorage.getItem("bookmark");

    
    if (data != null)
    {   
        data = JSON.parse(data);


        let recipes = data.recipes;

        let count = Object.keys(recipes).length;

       
  
    



            if (count > 0)
            {

                let howto = document.querySelector("#howto").style.display = "none";
            let index = 0;

            Object.values(recipes).forEach(recipe =>{

                

                let foodTitle = recipe.title;

                console.log(foodTitle)
                let image =  recipe.image;

                let source =recipe.source;


                let id =  foodTitle.split(" ").join("")+index;

                index++;

            

                let recipeUrl = recipe.url;

         

                let ingredient = recipe.ingredient;
                
                let calories =recipe.calories;

                let totalCookTime = recipe.totalTime;
                


                let protien = recipe.protien;

                let carbs = recipe.carbs;

                let saturates= recipe.saturates;

                let fibre = recipe.fibre;
                let salt = recipe.salt;

                let fat =recipe.fat;

                

                recipeObject ={
                    id:id,
                    url:recipeUrl,
                    title:foodTitle,
                    ingredient: ingredient,
                    image : image,
                    health: recipe.health,
                    calories:calories,
                    protien:protien,
                    carbs: carbs,
                    saturates: saturates,
                    fibre:fibre,
                    salt:salt,
                    fat:fat


                }
                
                let mainarticle = document.getElementsByClassName("container")[0];

                let articleElement = article(recipeObject);

                articleElement.querySelector(".bookmark").style.color ="#13d6c6";
                

                mainarticle.appendChild(articleElement)

            });
            setPlayButton();
            setBookmarkButton();
            setIngredientCloseButton();
            setUpVideoContainer();

        }

        else{

            let howto = document.querySelector("#howto").style.display = "flex";
        }
           
        

       

    }


      

}

parseJson();




