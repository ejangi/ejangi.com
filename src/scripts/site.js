import jQuery from 'jQuery'
import CachedArticle from './cached-article.js'

const Site =( ( $, CachedArticle ) => {

    const displayPost = ( postUrl, modifiedDate, that ) => {

        var key = postUrl + modifiedDate,
            cached = new CachedArticle();

        if ( $( '#single-container' ).is( ':visible' ) ) {

            $( '#single-container' ).slideUp();

        }

        $( that ).find( '.shade' ).fadeIn();

        if ( cached.retrieve( key ) ) {

            if ( window.history !== undefined ) {
                history.pushState( {}, "", postUrl );    
            }
            
            $( '#single-container > .content' ).html( cached.getContent() );
            $( '#single-container' ).slideDown(function() {
                $( 'body' ).css( 'position', 'fixed' );
            });
            $( that ).find( '.shade' ).hide();

        } else {
            $.get( postUrl, { 'headless': '1' }, function( data ) {

                if ( window.history !== undefined ) {
                    history.pushState( {}, "", postUrl );    
                }

                cached = new CachedArticle();
                cached.save( key, data );
                
                $( '#single-container > .content' ).html( data );
                $( '#single-container' ).slideDown(function() {
                    $( 'body' ).css( 'position', 'fixed' );
                });

            } ).always(function() {

                $( that ).find( '.shade' ).hide();

            } );
        }

    }



    $( document ).ready( function() {

        window.baseLocation = window.location.pathname;
    
        if ( !$( 'body' ).hasClass( 'single' ) ) {

            $( '<div id="single-container"><div class="close">&#x2715;</div><div class="content"></div></div>' ).appendTo( $( 'body' ) ).hide();

            $( '#single-container .close' ).on( 'click', function () {
                $( '#single-container' ).slideUp();
            } );

            $( '.main-container > article.post.format-standard' ).each( function () {

                $( '<div class="shade"></div>' ).appendTo( $( this ) ).hide();

                $( this ).on( 'click', function ( e ) {

                    var url = '',
                        date = '',
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
                    date = $( that ).attr( 'data-last-modified' );
                    displayPost( url, date, that );

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

                var postId = $( '#single-container article' ).attr( 'id' );

                $( 'body' ).css( 'position', 'static' ).animate({ scrollTop: ( $( '.main-container article#' + postId ).offset().top - 50 ) }, 300);

            } );

            $( document ).keyup( function( e ) {
                if ( e.which == 27 && $( '#single-container' ).is( ':visible' ) ) {
                    $( '#single-container > .close' ).trigger( 'click' );
                }
            } );

            $( '.main-nav a, .me-nav a' ).each( function () {

                var href = $( this ).attr( 'href' ),
                    url = document.createElement( 'a' );
                    url.href = href;

                if ( url.origin !=  window.location.origin ) {
                    $( this ).attr( 'target', '_blank' );
                    return;
                }

                $( this ).on( 'click', function ( e ) {

                    e.preventDefault();

                    var url = $( this ).attr( 'href' ),
                        date = $( this ).attr( 'data-last-modified' );

                    displayPost( url, date, this );

                    if ( $( '.me-nav' ).is( ':visible' ) ) {
                        $( '.me-nav' ).slideUp();
                    }

                    if ( $( '.main-nav' ).is( ':visible' ) ) {
                        $( '.main-nav' ).slideUp();
                        $( '.navbar-toggler' ).addClass( 'collapsed' );
                    }

                } );

            } );

        }

    });

} )( jQuery, CachedArticle );

export default Site