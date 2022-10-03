const carousalSmallScript = () => {
    let imgWidth, visibleWindowWidth, hangoverWidth, leftStep, totalWidth;
    let carousal = document.querySelector(".carousal-small");
    
    let leftButton = document.getElementsByClassName("left")[0];
    let rightButton = document.getElementsByClassName("right")[0];
    
    
    function isDiffLessThanEqualToOne(value1, value2 = 0){
        let difference = Math.abs(value1 - value2);
        
        if( difference === 0  || 
                Math.ceil(difference) <= 2 ||
                Math.floor(difference)  <= 2 
         ) {
            return true;
        }
        return false;
    }
    
    function controlButtonVisibility(elem, type, time){
        
        
        setTimeout(function(){
            let left = 0;
            if(carousal.style.left){
                left = Math.abs(parseInt(carousal.style.left.replace("px", "")));
            }
            
            if(type === "left"){
                
                if(isDiffLessThanEqualToOne(left, 0)){
                    elem.style.visibility = "hidden";
                }else{
                    elem.style.visibility = "visible";
                }
            }else if(type === "right"){
                let carousalWidth = Math.abs(parseInt(carousal.offsetWidth));
                 
                if(isDiffLessThanEqualToOne( left + visibleWindowWidth, carousalWidth)){
                    elem.style.visibility = "hidden";
                }else{
                    elem.style.visibility = "visible";
                }
            }
        }, time);
    }
    
    function imageLoaded(image) {
        return new Promise(function(resolve) {
            let src = image.getAttribute("data-src");
            image.setAttribute('src', src);
    
            image.addEventListener('load', resolve);
        });
    }
    
    async function initCarousal() {
    
        let imagesUrlList = document.querySelectorAll(".carousal-small img");
        let containerElement = document.querySelector(".container-small");
    
        for(let i = 0; i < imagesUrlList.length; i++){
            await imageLoaded(imagesUrlList[i]);
        }
    
        if(!imgWidth){
            let img = document.querySelector(".carousal-small img[src]");
            let imageMargin = window.getComputedStyle(img, null).getPropertyValue('margin-left');
            imageMargin = parseInt(imageMargin.replace("px", ""));
            
            carousal = document.querySelector(".carousal-small");
            imgWidth = img.width;
    
            visibleWindowWidth = containerElement.offsetWidth;
            
            totalWidth =  carousal.offsetWidth ;
    
            hangoverWidth = totalWidth - visibleWindowWidth; //calculate
            leftStep = imgWidth + 2* imageMargin;           //calculate
    
            let carousalHeight = carousal.offsetHeight;        
            containerElement.style.height =  carousalHeight + 'px'; //calculate
    
            controlButtonVisibility(leftButton, "left", 0);
    
        }
    }
    
    initCarousal();
    
    rightButton.addEventListener("click", function(){
    
        let left = carousal.style.left.replace("px", "");
        
        if(!left){
            left = 0;
        }
        left = parseInt(left);
        
        if(left <= -hangoverWidth){
            return;
        }
    
        let remainingWidth = hangoverWidth + left; //calculate
        
        if( remainingWidth < leftStep){
            let leftTotal = left - remainingWidth; // move only remaining width
            carousal.style.left = leftTotal + "px";
            
            controlButtonVisibility(rightButton, "right", 0);
            
            return;
        }else{
            let leftTotal = left - leftStep;    // move on step to left
            carousal.style.left = leftTotal + "px";
            
        }
    
        controlButtonVisibility(leftButton, "left", 1000);
        controlButtonVisibility(rightButton, "right", 1000);
    });
    
    leftButton.addEventListener("click", function(){
    
        let left = carousal.style.left.replace("px", "");
    
        if(!left){
            left = 0;
        }
        left = parseInt(left);
    
        if(left >= 0 ){
            return;
        }
        if(left  > -leftStep){          // remaining space < one step
            carousal.style.left = 0 ;
            controlButtonVisibility(leftButton, "left", 0);
        }else{
            
            carousal.style.left = left + leftStep + "px";
        }
    
        controlButtonVisibility(leftButton, "left", 1000);
        controlButtonVisibility(rightButton, "right", 1000);
    });
    
}

export default carousalSmallScript;
