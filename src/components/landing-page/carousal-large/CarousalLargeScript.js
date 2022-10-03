const CarousalLargeScript = () => {
    let carousalElement = document.getElementsByClassName("carousal-large")[0];
    let allCarousalImagesList = document.querySelectorAll(".carousal-large img");
    let dots = document.querySelector(".dots");
    let highlightedDotElement = null;
    let intervalHandle;
    let isSlideShowPaused = false;

    function highlightDot(element){
        let index = element.getAttribute("image");
        let dotElement = document.querySelectorAll(".dot")[index];
        if(!dotElement) return;
        highlightedDotElement = dotElement;
        dotElement.classList.add("highlighted-dot");
    }

    function rotateImages(){
        let imageElement = document.querySelector(".carousal-large img");
        
        if(!imageElement) return;
        let step = -imageElement.width + "px";
        
        carousalElement.classList.add("carousal-large-transform");
        carousalElement.style.transform = `translateX(${step})`;

        setTimeout(function(){
            if(highlightedDotElement){
                highlightedDotElement.classList.remove("highlighted-dot");
            }

            carousalElement.classList.remove("carousal-large-transform");
            carousalElement.appendChild(imageElement);
            carousalElement.style.transform = "translateX(0)";

            
            highlightDot(carousalElement.firstElementChild);
        }, 1000);
    };

    function removeImage(){
        let imageElement = document.querySelector(".carousal-large img");
        carousalElement.appendChild(imageElement);
    }

    /* account for image load delay */
    let len = allCarousalImagesList.length,
        counter = 0;

    [].forEach.call( allCarousalImagesList, function( img ) {
        if(img.complete)
        incrementCounter();
        else
        img.addEventListener( 'load', incrementCounter, false );
    } );

    function incrementCounter() {
        counter++;
        if ( counter === len ) {

            for(let i = 0 ; i < allCarousalImagesList.length ; i++){
                let dot = document.createElement("div");  
                dot.setAttribute("image", i); 
                dot.classList.add("dot");
                dots.appendChild(dot);
                dot.addEventListener("click", positionImage);
            }

            intervalHandle = setInterval(rotateImages, 4000);
            highlightDot(allCarousalImagesList[0]);
        }
    }

    function positionImage(){
        let allCarousalImagesList = document.querySelectorAll(".carousal-large img");
        for(let i = 0 ; i < allCarousalImagesList.length ; i++){
            if(allCarousalImagesList[i].getAttribute("image") !==
            this.getAttribute("image")){
                removeImage();
            }else{
                clearInterval(intervalHandle);
                isSlideShowPaused = true;
                if(highlightedDotElement){
                    highlightedDotElement.classList.remove("highlighted-dot");
                }
                highlightedDotElement = this;
                this.classList.add("highlighted-dot");
                break;
            }
        }
    }

    dots.addEventListener("mouseout", function(){
        if(isSlideShowPaused){        
            isSlideShowPaused = false;
            intervalHandle = setInterval(rotateImages, 4000);        
        }
    });


}

export default CarousalLargeScript;
