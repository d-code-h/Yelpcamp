var counter = 0;
function changeBG(){
    var images = [
        "url('/images/1.jpg')",
        "url('/images/2.jpg')",
        "url('/images/3.jpg')",
        "url('/images/4.jpg')",
        "url('/images/5.jpg')",
        "url('/images/6.jpg')",
        "url('/images/7.jpg')",
        "url('/images/8.jpg')"
      ]
    
    if(counter === images.length) counter = 0;
    $("body").css("background-image", images[counter]);

    counter++;
}
  
  setInterval(changeBG, 2000);


