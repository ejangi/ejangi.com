( function( $ ) {

    function displayPost( postUrl, that ) {

        if ( $( '#single-container' ).is( ':visible' ) ) {

            $( '#single-container' ).slideUp();

        }

        $( that ).find( '.shade' ).fadeIn();

        $.get( postUrl, { 'headless': '1' }, function( data ) {

            if ( window.history !== undefined ) {
                history.pushState( {}, "", postUrl );    
            }
            
            $( '#single-container > .content' ).html( data );
            $( '#single-container' ).slideDown();

        } ).always(function() {

            $( that ).find( '.shade' ).hide();

        } );

    }



    $( document ).ready( function() {

        window.baseLocation = window.location.pathname;
    
        if ( $( 'body.blog' ) ) {

            $( '<div id="single-container"><div class="close">&#x2715;</div><div class="content"></div></div>' ).appendTo( $( 'body' ) ).hide();

            $( '#single-container .close' ).on( 'click', function () {
                $( '#single-container' ).slideUp();
            } );

            $( '.main-container > article.post.format-standard' ).each( function () {

                $( '<div class="shade"></div>' ).appendTo( $( this ) ).hide();

                $( this ).on( 'click', function ( e ) {

                    var url = '',
                        that = $( this ),
                        up = 0,
                        maxUp = 10;

                    if ( $( this ).not( 'article' ) ) {

                        while ( $( that ).not( 'article' ) && up > maxUp ) {

                            that = $( that ).parent();
                            up = up + 1;

                        }

                    }

                    url = $( that ).attr( 'data-permalink' );
                    displayPost( url, that );

                } );

            } );

            $( '.main-container > article.post > header a:link' ).each( function () {

                var url = '',
                    that = $( this ),
                    up = 0,
                    maxUp = 10;

                if ( $( this ).not( 'article' ) ) {

                    while ( $( that ).not( 'article' ) && up > maxUp ) {

                        that = $( that ).parent();
                        up = up + 1;

                    }

                }

                $( this ).on( 'click', function( e ) {
                    e.preventDefault();
                    $( that ).trigger( 'click' );
                } );

            } );

            $( '#single-container > .close' ).on( 'click', function( e ) {

                if ( window.history !== undefined ) {
                    history.pushState( {}, "", window.baseLocation );    
                }

            } );

        }

    });

} )( jQuery );