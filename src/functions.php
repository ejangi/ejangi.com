<?
namespace Ejangi;

define( 'THEME_VERSION', '1.0.0' );

/**
 * Queue up the main script and stylesheet files
 *
 * @return void
 **/
add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style( 'theme-styles', get_stylesheet_directory_uri().'/styles/main.css', [], THEME_VERSION );
    wp_enqueue_script( 'theme-scripts', get_stylesheet_directory_uri().'/scripts/app.min.js', [ 'jquery' ], THEME_VERSION );
} );



function hello_world() {
?>
    <h1>Hi</h1>
<?
}
