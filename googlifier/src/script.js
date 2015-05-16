/** Googlify image in background thread
    Params:
        img: Image DOM object
 */
function googlify(img) {
    // Skip if already googlified once
    if (!img.src || img.googlified) return;
    img.googlified = true;

    // Perform googlification in background
    goog({
        'type': 'googlify',
        'src': img.src
    },
    "sender", //this doesn't seem to be used
    function(response) {
        if (response.googlified) {
            img.src = response.googlified;
        }
    });
}

/** Googlify all available images on initialization
    Called upon completion of page load.
 */
var main = function(image) {
    // var images = document.getElementsByTagName('IMG');
    googlify(image);
};


///////////////////////////////////////////////////////////////////////////////
//
// Beyond here be observers and goblins
//
///////////////////////////////////////////////////////////////////////////////

/** Googlify subsequently added images */
var childListObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        for (var j = 0; j < mutation.addedNodes.length; ++j) {
            var node = mutation.addedNodes[j];
            if (node.nodeType === 1) {
                var images = node.getElementsByTagName('IMG');
                for (var i = 0; i < images.length; ++i) {
                    googlify(images[i]);
                }
            }
        }
    });
});



//childListObserver.observe(document.body, {childList: true, subtree: true});

/** Googlify subsequently modified images with new src */
var attributeObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.target.tagName === 'IMG' && mutation.attributeName === 'src') {
            googlify(mutation.target);
        }
    });
});

//attributeObserver.observe(document.body, {attributes: true,    subtree: true});
