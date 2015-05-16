// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).on('ready page:load', function () {
    $(document).foundation();
});

var masonryGo = function() {
    var container = document.querySelector('#container');
    var msnry = new Masonry( container, {
      // options
      columnWidth: 400,
      itemSelector: '.item'
    });
};
