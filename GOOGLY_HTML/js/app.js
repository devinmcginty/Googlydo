// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
var container = document.querySelector('#container');
var msnry = new Masonry( container, {
  // options
  columnWidth: 800,
  itemSelector: '.item'
});