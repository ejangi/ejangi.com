<?
namespace Ejangi;

include_once realpath( dirname( __FILE__ ) . '/includes/class-bootstrap-walker.php' );
include_once realpath( dirname( __FILE__ ) . '/includes/class-options.php' );
include_once realpath( dirname( __FILE__ ) . '/includes/class-me-options.php' );
include_once realpath( dirname( __FILE__ ) . '/includes/class-header-colours.php' );

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
 * Set the CachedArticle cookie
 *
 * Set a datetime cookie and expire the CachedArticle cache every 10 minutes.
 *
 * @return void
 **/
function set_cachedarticle_cookie()
{
    $path = parse_url( get_option( 'siteurl' ), PHP_URL_PATH );
    $host = parse_url( get_option( 'siteurl' ), PHP_URL_HOST );
    $expiry = strtotime( '+10 minutes' );
    $value = date( 'Y-m-dTH:i:s' );
    setcookie( 'cachedarticle', $value, $expiry, $path, $host );
}



/**
 * Queue up the main script and stylesheet files
 *
 * @return void
 **/
add_action( 'wp_enqueue_scripts', function() {

    wp_enqueue_style( theme.'-styles', get_stylesheet_directory_uri().'/styles/main.css', [], theme );
    // wp_enqueue_script( theme.'-bootstrap', get_stylesheet_directory_uri().'/scripts/bootstrap.min.js', [ 'jquery' ], theme );
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
        'choices' => $me_choices
    ] );

    $wp_customize->add_section( theme.'_footer_section' , [
        'title'      => __( 'Footer', theme ),
        'priority'   => 150
    ] );

    $wp_customize->add_setting( theme.'_copyright', [
        'default'    => get_bloginfo('name'),
        'transport' => 'refresh'
    ] );     

    $wp_customize->add_control( theme.'_copyright', [
        'label'   => __( 'Copyright Disclaimer', theme ),
        'section' => theme.'_footer_section',
        'settings' => theme.'_copyright',
        'type'    => 'text'
    ] );

} );



/**
 * Remove a bunch of Wordpress cruft in the <head>
 *
 * @return void
 **/
add_action( 'init', function() {
    
    // Set the CachedArticle cookie:
    if ( empty( $_COOKIE['cachedarticle'] ) || strtotime( $_COOKIE['cachedarticle'] ) <= strtotime( '-10 minutes' ) ) {
        set_cachedarticle_cookie();
    }

    // remove header links
    remove_action( 'wp_head', 'feed_links_extra', 3 );                    // Category Feeds
    remove_action( 'wp_head', 'feed_links', 2 );                          // Post and Comment Feeds
    remove_action( 'wp_head', 'rsd_link' );                               // EditURI link
    remove_action( 'wp_head', 'wlwmanifest_link' );                       // Windows Live Writer
    remove_action( 'wp_head', 'index_rel_link' );                         // index link
    remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );            // previous link
    remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );             // start link
    remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 ); // Links for Adjacent Posts
    remove_action( 'wp_head', 'wp_generator' );   
    
    // Fix an issue with shortcodes processing:
    remove_filter('the_content', 'wpautop');
    add_filter('the_content', 'wpautop', 12);
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

    add_image_size( 'post-large', 1280, 720 );

    add_theme_support( 'automatic-feed-links' );

    add_theme_support( 'post-formats', [ 'aside', 'quote' ] );

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
            'menu_class' => 'dropdown-menu dropdown-menu-right me-nav',
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



/**
 * Did we request a headless version of this post or a regular one?
 *
 * @return bool
 **/
function is_headless()
{
    if( $_REQUEST['headless'] == '1' ) {
        return true;
    }

    return false;
}

/**
 * If Advanced Custom Fields is installed, return the field value
 *
 * @return mixed
 **/
function get_field_value( $field )
{
    if ( function_exists( 'get_field' ) ) {
        return get_field( $field );
    }

    return null;
}

/**
 * Don't allow Abbreviations with spaces to wrap over new lines.
 *
 * @param $content string The content to transform
 * @return string
 **/
function maintain_abbr( $content )
{
    $content = preg_replace( '/([A-Z]{2,})(\s)([A-Z]{2,})/', "$1&nbsp;$3", $content );
    return $content;
}
add_filter( 'the_title', __NAMESPACE__.'\maintain_abbr', 10, 1 );
add_filter( 'the_excerpt', __NAMESPACE__.'\maintain_abbr', 10, 1 );
add_filter( 'the_content', __NAMESPACE__.'\maintain_abbr', 10, 1 );



/**
 * Set the <meta name="cachedarticle" content="[CURRENTDATETIME]" /> tag for use by JavaScript:
 *
 * @return void
 **/
add_action( 'wp_head', function () {
    $date = date( 'Y-m-dTH:i:s' );
    if ( !empty( $_COOKIE['cachedarticle'] ) ) {
        $date = str_replace( 'UTC', 'T', $_COOKIE['cachedarticle'] );
    }
    ?>
    <meta name="cachedarticle" content="<?= $date ?>" />
    <?
}, 100 );



/**
 * Add our custom header colours <style> block to the output
 *
 * @return void
 **/
add_action( 'wp_footer', function () {

    if ( Header_Colours::has_colours() ) {
        echo Header_Colours::get_style_block();
    }

}, 100 );



/**
 * Shortcode for <div class="row"></div> content wrapper
 **/
add_shortcode( 'row', function ( $atts, $content = null ) {
    ob_start();
    $atts = shortcode_atts( [
        'class' => 'row'
    ], $atts );
    
    echo '<div class="'.$atts['class'].'">';
    echo wpautop( do_shortcode( trim( $content ) ) );
    echo '</div>';

    return ob_get_clean();
} );



/**
 * Shortcode for <div class="col"></div> content wrapper
 **/
add_shortcode( 'col', function ( $atts, $content = null ) {
    ob_start();
    $atts = shortcode_atts( [
        'class' => 'col-sm'
    ], $atts );
    
    echo '<div class="'.$atts['class'].'">';
    echo wpautop( do_shortcode( trim( $content ) ) );
    echo '</div>';

    return ob_get_clean();
} );



/**
 * Shortcode for a <a href="..." class="btn"></a> link
 **/
add_shortcode( 'btn', function ( $atts, $content = null ) {
    ob_start();
    $atts = shortcode_atts( [
        'class' => 'btn btn-default',
        'href' => ''
    ], $atts );
    
    echo '<a href="'.$atts['href'].'" class="'.$atts['class'].'">';
    echo do_shortcode( trim( $content ) );
    echo '</a>';

    return ob_get_clean();
} );



/**
 * Wrap embedded media as suggested by Readability
 *
 * @link https://gist.github.com/965956
 * @link http://www.readability.com/publishers/guidelines#publisher
 */
add_filter( 'embed_oembed_html', function ( $cache, $url, $attr = '', $post_ID = '' ) {
    $classes = array('embed-responsive embed-responsive-16by9');
    $site_url = site_url();
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {
        $site_url = str_replace('http:', 'https:', $site_url);
    } else {
        $site_url = str_replace('https:', 'http:', $site_url);
    }
    
    if(preg_match('/youtube|youtu\.be/i', $cache)) {
        $classes[] = 'embed-youtube';
        $qschar = "?";
        if(preg_match("/src=([^\?]*\?[^'\">\s]*)/i", $cache)) {
            $qschar = "&";
        }
        $cache = preg_replace("@src=(['\"])?([^'\">\s]*)@", "class=\"embed-responsive-item\" src=$1$2{$qschar}showinfo=0&modestbranding=1&rel=0&autohide=1&wmode=transparent&origin={$site_url}", $cache);
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {
            $cache = str_replace('src="http:', 'src="https:', $cache);
        } else {
            $cache = str_replace('src="https:', 'src="http:', $cache);
        }
    }

    if(preg_match('/vimeo/i', $cache)) {
        $classes[] = 'embed-vimeo';
        $cache = preg_replace("@src=@", "class=\"embed-responsive-item\" src=", $cache);
        
    }

    return '<div class="' . implode(' ', $classes) . '">' . $cache . '</div>';
}, 10, 4 );



/**
 * Pin select articles to the top of the home page feed
 **/
add_action( 'pre_get_posts', function( $query ) {

    if( is_home() && $query->is_main_query() ) {
        //echo "<pre>".var_dump( $query )."</pre>";
        $query->query_vars['meta_key'] = 'pin_to_top';
        $query->query_vars['orderby'] = 'meta_value date';
        $query->query_vars['order'] = 'DESC';
    }

}, 10, 1 );




/**
 * Include the Advanced Custom Fields configuration this theme needs
 */
if ( function_exists( 'acf_add_local_field_group' ) ) {
    acf_add_local_field_group(array(
        'key' => 'group_5bdd17abba6b2',
        'title' => 'Post',
        'fields' => array(
            array(
                'key' => 'field_5bdfae7c08cac',
                'label' => 'Pin to Top',
                'name' => 'pin_to_top',
                'type' => 'checkbox',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                    1 => 'Yes',
                ),
                'allow_custom' => 0,
                'default_value' => array(
                    0 => 0,
                ),
                'layout' => 'vertical',
                'toggle' => 0,
                'return_format' => 'value',
                'save_custom' => 0,
            ),
            array(
                'key' => 'field_5b09135330ae4',
                'label' => 'Header Location',
                'name' => 'header_location',
                'type' => 'select',
                'instructions' => '',
                'required' => 1,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                    'bottom' => 'Bottom',
                    'top' => 'Top',
                ),
                'default_value' => array(
                    0 => 'bottom',
                ),
                'allow_null' => 0,
                'multiple' => 0,
                'ui' => 0,
                'ajax' => 0,
                'placeholder' => '',
                'return_format' => 'value',
            ),
            array(
                'key' => 'field_5b09127730ae2',
                'label' => 'Header Style',
                'name' => 'header_style',
                'type' => 'select',
                'instructions' => '',
                'required' => 1,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                    'standard' => 'Standard',
                    'seamless-light' => 'Seamless Light',
                    'seamless-dark' => 'Seamless Dark',
                ),
                'default_value' => array(
                    0 => 'standard',
                ),
                'allow_null' => 0,
                'multiple' => 0,
                'ui' => 0,
                'ajax' => 0,
                'placeholder' => '',
                'return_format' => 'value',
            ),
            array(
                'key' => 'field_5b09131930ae3',
                'label' => 'Header Colour',
                'name' => 'header_colour',
                'type' => 'color_picker',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => '',
            ),
            array(
                'key' => 'field_5b0945c1b5c6b',
                'label' => 'Header Gradient',
                'name' => 'header_gradient',
                'type' => 'select',
                'instructions' => '',
                'required' => 1,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                    'none' => 'None',
                    'black' => 'Black',
                    'white' => 'White',
                    'primary' => 'Primary',
                    'secondary' => 'Secondary',
                    'tertiary' => 'Tertiary',
                    'header-colour' => 'Header Colour',
                ),
                'default_value' => array(
                    0 => 'none',
                ),
                'allow_null' => 0,
                'multiple' => 0,
                'ui' => 0,
                'ajax' => 0,
                'placeholder' => '',
                'return_format' => 'value',
            ),
            array(
                'key' => 'field_5bde54bb7c53b',
                'label' => 'Contain Header',
                'name' => 'contain_header',
                'type' => 'checkbox',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                    1 => 'Yes',
                ),
                'allow_custom' => 0,
                'default_value' => array(
                    0 => 0,
                ),
                'layout' => 'vertical',
                'toggle' => 0,
                'return_format' => 'value',
                'save_custom' => 0,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'post',
                ),
            ),
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'page',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'side',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => array(
            0 => 'tags',
            1 => 'send-trackbacks',
        ),
        'active' => 1,
        'description' => '',
    ));
}

