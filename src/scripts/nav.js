import jQuery from 'jQuery'

const Nav = ( ( $ ) => {

    $( document ).ready( () => {

        $( '.navbar-toggler,.dropdown-toggle' ).each( function () {

            const target = $( this ).attr( 'data-target' );
            if ( !$( this ).hasClass( 'collapsed' ) ) {
                $( this ).addClass( 'collapsed' );
            }

        } );

        $( '.navbar-toggler' ).on( 'click', function ( e ) {

            e.preventDefault();

            const target = $( this ).attr( 'data-target' );

            if ( $( this ).hasClass( 'collapsed' ) ) {
                $( this ).removeClass( 'collapsed' );
                $( target ).slideDown();
            } else {
                $( this ).addClass( 'collapsed' );
                $( target ).slideUp();
            }

        } );

        $( '.dropdown-toggle' ).on( 'click', function ( e ) {

            e.preventDefault();

            const target = $( this ).attr( 'data-target' );

            if ( $( this ).hasClass( 'collapsed' ) ) {
                $( this ).removeClass( 'collapsed' );
                $( target ).slideDown( 200 );
            } else {
                $( this ).addClass( 'collapsed' );
                $( target ).slideUp( 200 );
            }

        } );

    } );

} )( jQuery )

export default Nav