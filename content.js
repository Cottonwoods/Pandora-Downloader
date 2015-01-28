$( function() {
    // The info box!
    $('body').append('<div class="pandora-downloader-infobox"></div>')

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function(mutations, observer) {
        chrome.runtime.sendMessage({
            title:  $('.songTitle')    .text(),
            artist: $('.artistSummary').text(),
            album:  $('.albumTitle')   .text(),
        }, function( response ) {} );
    });

    var target = $('#trackInfo');
    observer.observe(target[0], {
      subtree: true,
      attributes: true,
      characterData: true
    });

    chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {

        display_info( request );

    });

    function display_info( message ) {
        $('.pandora-downloader-infobox')
            .finish()
            .fadeOut( 10 )
            .text( message )
            .fadeIn( 400 )
            .delay( 3000 )
            .fadeOut( 400 );
    }
})