//paste this code under the head tag or in a separate js file.
// Wait for window load
jQuery(window).on('load', function(){
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");;
  $(".jumbotron h1").addClass("animate__animated animate__bounce");
  $(".row .col-md-4").addClass("animate__animated animate__fadeInUpBig");
});

(function() {
    'use strict';
    window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
        }, false);
    });
    }, false);
})();

$("#imageFile, #newImageFile").blur(function(){
    if ($(this).val() !== ""){
        $("#pills-link-tab, v-pills-link-tab").addClass("disabled");
        $("#imageLink, #newImageLink").removeAttr("required");
    }else {
        $("#imageLink, #newImageLink").attr("required");
        $("#pills-link-tab, #v-pills-file-tab").removeClass("disabled");
    }
});

$("#imageLink, #newImageLink").blur(function(){
    if ($(this).val() !== ""){
        $("#pills-file-tab, #v-pills-file-tab").addClass("disabled");
        $("#imageFile, #newImageFile").removeAttr("required");
    }else {
        $("#imageFile, #newImageFile").attr("required");
        $("#pills-file-tab, #v-pills-file-tab").removeClass("disabled");
    }
});