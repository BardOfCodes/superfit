window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE_PO = "./static/interpolation/04379243_table_554";
var INTERP_BASE_CG = "./static/interpolation/03001627_chair_787";

var NUM_INTERP_FRAMES = 250;

var interp_images_po = [];
var interp_images_cg = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE_PO + '/' + String(i).padStart(5, '0') + '.jpg';
    interp_images_po[i] = new Image();
    interp_images_po[i].src = path;
    var path = INTERP_BASE_CG + '/' + String(i).padStart(5, '0') + '.jpg';
    interp_images_cg[i] = new Image();
    interp_images_cg[i].src = path;
  }
}

function setInterpolationImage(i, wrapper_name, mode) {
if (mode == 0){
    var image = interp_images_po[i];
} else {
    var image = interp_images_cg[i];
}
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $(wrapper_name).empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

    // Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
        // Add listener to  event
        carousels[i].on('before:show', state => {
            console.log(state);
        });
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
        // bulmaCarousel instance is available as element.bulmaCarousel
        element.bulmaCarousel.on('before-show', function(state) {
            console.log(state);
        });
    }


    preloadInterpolationImages();

    var slider_name = '#interpolation-slider';
    var wrapper_name = '#interpolation-image-wrapper';
    $(slider_name).on('input', function(event) {
      setInterpolationImage(this.value, wrapper_name, 0);
    });
    setInterpolationImage(0, wrapper_name, 0);
    $(slider_name).prop('max', NUM_INTERP_FRAMES - 1);


    var slider_name_2 = '#interpolation-slider-2';
    var wrapper_name_2 = '#interpolation-image-wrapper-2';
    $(slider_name_2).on('input', function(event) {
      setInterpolationImage(this.value, wrapper_name_2, 1);
    });
    setInterpolationImage(0, wrapper_name_2, 1);
    $(slider_name_2).prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();


})
