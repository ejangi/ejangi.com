<?
namespace Ejangi;

include_once realpath( dirname( __FILE__ ) . '/includes/class-bootstrap-walker.php' );
include_once realpath( dirname( __FILE__ ) . '/includes/class-options.php' );
include_once realpath( dirname( __FILE__ ) . '/includes/class-me-options.php' );

/**
 * Theme version number
 *
 * @var string
 **/
const version = '1.0.0';

/**
 * Theme namespace for language etc
 *
 * @var string
 **/
const theme = 'ejangi';



/**
 * Queue up the main script and stylesheet files
 *
 * @return void
 **/
add_action( 'wp_enqueue_scripts', function() {

    wp_enqueue_style( theme.'-styles', get_stylesheet_directory_uri().'/styles/main.css', [], theme );
    wp_enqueue_script( theme.'-bootstrap', get_stylesheet_directory_uri().'/scripts/bootstrap.min.js', [ 'jquery' ], theme );
    wp_enqueue_script( theme.'-scripts', get_stylesheet_directory_uri().'/scripts/app.min.js', [ 'jquery' ], theme );

} );



add_filter('script_loader_tag', function ($tag, $handle) {
    if ( theme.'-scripts' !== $handle )
        return $tag;
    return str_replace( ' src', ' defer src', $tag );
}, 10, 2);



/**
 * Register our theme customizations
 *
 * @return void
 **/
add_action( 'customize_register', function( $wp_customize ) {

    $blogusers = get_users( 'blog_id=1&orderby=nicename' );
    $me_choices = [];
    $me_choices[0] = __( ' -- SELECT -- ', theme );

    foreach( $blogusers as $user ) {
        $me_choices[$user->ID] = $user->display_name;
    }

    $wp_customize->add_section( theme.'_me_section' , [
        'title'      => __( 'Me', theme ),
        'priority'   => 30
    ] );

    $wp_customize->add_setting( theme.'_me', [
        'default'    => 1,
        'transport' => 'refresh'
    ] );     

    $wp_customize->add_control( theme.'_me_control', [
        'label'   => __( 'Me', theme ),
        'section' => theme.'_me_section',
        'settings' => theme.'_me',
        'type'    => 'select',
        'choices' => $me_choices,
    ] );

} );



/**
 * Remove a bunch of Wordpress cruft in the <head>
 *
 * @return void
 **/
add_action( 'init', function() {
    // remove header links
    remove_action( 'wp_head', 'feed_links_extra', 3 );                    // Category Feeds
    remove_action( 'wp_head', 'feed_links', 2 );                          // Post and Comment Feeds
    remove_action( 'wp_head', 'rsd_link' );                               // EditURI link
    remove_action( 'wp_head', 'wlwmanifest_link' );                       // Windows Live Writer
    remove_action( 'wp_head', 'index_rel_link' );                         // index link
    remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );            // previous link
    remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );             // start link
    remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 ); // Links for Adjacent Posts
    remove_action( 'wp_head', 'wp_generator' );                           // WP version
} );



/**
 * Register theme support
 *
 * @return void
 **/
add_action( 'after_setup_theme', function() {

    add_theme_support( 'custom-logo', array(
        'height'      => null,
        'width'       => null,
        'flex-width' => true,
    ) );

    add_theme_support( 'post-thumbnails' );

    add_theme_support( 'automatic-feed-links' );

    add_theme_support( 'menus' );

    register_nav_menus(                      // wp3+ menus
        [
            'main_nav' => 'The Main Menu',   // main nav in header
            'me_nav' => 'Me Menu',
            'footer_links' => 'Footer Links' // secondary nav in footer
        ]
    ); 

} );

function the_custom_logo() {
    if ( function_exists( 'the_custom_logo' ) ) {
        \the_custom_logo();
    } else {
        echo '';
    }
}

add_filter( 'get_custom_logo', function($html)
{
    $html = str_replace('class="custom-logo-link"', 'class="navbar-brand"', $html);
    return $html;
} );



/**
 * Enable SVG support
 *
 * @return void
 **/
add_action( 'upload_mimes', function( $file_types ) {

    $new_filetypes = array();
    $new_filetypes['svg'] = 'image/svg+xml';
    $file_types = array_merge( $file_types, $new_filetypes );

    return $file_types;
} );

add_action( 'wp_AJAX_svg_get_attachment_url', function() {
    $url = '';
    $attachmentID = isset( $_REQUEST['attachmentID'] ) ? $_REQUEST['attachmentID'] : '';
    if( $attachmentID ){
        $url = wp_get_attachment_url( $attachmentID );
    }

    echo $url;

    die();
} );



/**
 * Don't expose the wordpress version number in the RSS Feed
 *
 * @return void
 **/
add_filter( 'the_generator', function() {
    return '';
} );



/**
 * Main Navigation
 *
 * @return void
 * @author 
 **/
function main_nav() {
    wp_nav_menu( 
        [ 
            'menu' => 'main_nav', /* menu name */
            'menu_class' => 'nav navbar-nav',
            'theme_location' => 'main_nav', /* where in the theme it's assigned */
            'container' => 'false', /* container class */
            'fallback_cb' => __NAMESPACE__.'\main_nav_fallback', /* menu fallback */
            'walker' => new \Bootstrap_walker()
        ]
    );
}

function me_nav() {
    wp_nav_menu( 
        [ 
            'menu' => 'me_nav', /* menu name */
            'menu_class' => 'dropdown-menu dropdown-menu-right',
            'theme_location' => 'me_nav', /* where in the theme it's assigned */
            'container' => 'false', /* container class */
            'fallback_cb' => __NAMESPACE__.'\main_nav_fallback', /* menu fallback */
            'walker' => new \Bootstrap_walker()
        ]
    );
}

function footer_links() { 
  // Display the WordPress menu if available
    wp_nav_menu(
        [
            'menu' => 'footer_links', /* menu name */
            'theme_location' => 'footer_links', /* where in the theme it's assigned */
            'container_class' => 'footer-links clearfix', /* container class */
            'fallback_cb' => __NAMESPACE__.'\main_nav_fallback' /* menu fallback */
        ]
    );
}

function nav_fallback() {
    // Blank!
}



add_filter('nav_menu_css_class', function($classes, $item) {
    if( $item->menu_item_parent == 0 && in_array('current-menu-item', $classes) ) {
        $classes[] = "active";
    }
  
  return $classes;
}, 10, 2 );



/**
 * Display the ME block
 *
 * @return string
 **/
function me_block( $user_id, Me_Options $options = null )
{
    ob_start();
    require_once realpath( dirname( __FILE__ ) . '/partials/me.php' );

    $contents = ob_get_contents();
    ob_end_clean();

    return $contents;
}
