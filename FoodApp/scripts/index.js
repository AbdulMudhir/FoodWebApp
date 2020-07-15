

let inputBox = document.getElementById("form");



inputBox.addEventListener("submit", submitForm)




let imfeelinglucky = document.querySelector(".imfeelinglucky");

const RANDOMFOOD = ["egg", "chicken", "rice", "porridge", "cheese", "mustard", "noodle"]


imfeelinglucky.addEventListener("click", (event) =>
{

    let foodChose = RANDOMFOOD[Math.floor(Math.random() * RANDOMFOOD.length)];
    fetchRecipe(foodChose);

    event.preventDefault();
})



function fetchRecipe(foodtitle)
{
    let url = `https://api.edamam.com/search?q=${foodtitle}&app_id={app_id}&app_key={app_key}`;

    const ajax = new XMLHttpRequest();

    ajax.open("GET", url, true);

    ajax.onload = function() {

       let data = this.responseText;

       let dataParsed = JSON.parse(data);

       
       if(dataParsed.count > 0)
       {

           
            recipeToStorage(data);
            window.location.replace("/foodprofile/profile.html");
       }
       else{

        let noresult = document.getElementById("no-results");
        noresult.style.display = "block";

        setTimeout(() =>{
            noresult.style.display="none";
        }, 5000)

       }


    }

    ajax.onprogress =  function()
    {

    }

    ajax.onerror = function()
    {
        let APIERROR = document.getElementById("error");

        APIERROR.style.display = "block";
    }

    ajax.send()



}


function recipeToStorage(data)
{
    let recipeStorage = localStorage.getItem("recipes");

    if(recipeStorage === null)
    {
        localStorage.setItem("recipes", JSON.stringify(data));

    }

    else{
        localStorage.setItem("recipes", JSON.stringify(data));
        
    }



    return localStorage.getItem("recipes");
}



// function fetchData(data)
// {

//     fetch(data)
//     .then(response => {return response.json();})

//     .then(data => {


//         if(data.count > 0)
//         {

//             recipeToStorage(data);
//             window.location.replace("/foodprofile/profile.html");

//         }

//         else{

//             console.log("here")
//             let noresult = document.getElementById("no-results");
//             noresult.style.display = "block";

//             setTimeout(() =>{
//                 noresult.style.display="none";
//             }, 5000)
//         }
        

//     })
//     .catch(error =>{

//         let APIERROR = document.getElementById("error");

//         APIERROR.style.display = "block";
        
//     })
 
// }



function submitForm (event)
{
    let input = document.getElementById("searchBox").value;


    // fetchData(url);

    fetchRecipe(input);

    event.preventDefault();


}