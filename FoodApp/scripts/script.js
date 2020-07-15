

let navToggleButton = document.getElementById("nav-toggle");

navToggleButton.addEventListener("click", navtoggle);


document.querySelector("#nav-close").addEventListener("click", navtoggle);







function navtoggle(event)
{   
    event.preventDefault();

    let nav = document.querySelector("nav");


    let navDisplay = window.getComputedStyle(nav).display;

    if(navDisplay === "none")
    {
        nav.style.display = "block";
    }
    else{
        nav.style.display= "none";
      
    }


}



// let homepages = document.getElementsByClassName("section");


// function onePager()
// {

//     for(i=0; i<homepages.length; i++)
//     {
//         homepages[i].style.height= `${window.innerHeight}px`;
//         homepages[i].addEventListener("click", bodyNavtoggle);
//         console.log(homepages[i])
//     }
// }



// window.addEventListener("resize",onePager)
// window.addEventListener("load", onePager)


