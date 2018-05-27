<?
namespace Ejangi;

/**
 * Store header colours and render <style> block
 *
 * @package Ejangi
 **/
class Header_Colours
{

    /**
     * An associative array of post IDs (key) and colour values (value)
     *
     * @var Array
     **/
    protected static $header_colours = [];



    /**
     * Constructor
     *
     * @return void
     **/
    public function __construct( $post_id, $colour )
    {
        self::$header_colours[ $post_id ] = $colour;
    }


    /**
     * Render the currently stored header_colours as a <style> block
     *
     * @return string
     **/
    public static function get_style_block()
    {
        $block = "";

        if ( count( self::$header_colours ) ) {
            $block .= '<style id="header-colours">';

            foreach ( self::$header_colours as $post_id => $colour ) {
                list( $r, $g, $b ) = self::hex_to_rgb( $colour );
                $block .= '#post-'.$post_id.'.format-standard.header-gradient-header-colour:after { background: linear-gradient(to bottom, rgba('.$r.', '.$g.', '.$b.', 0) 0%,rgba('.$r.', '.$g.', '.$b.', 1) 50%); }';
            }

            $block .= '</style>';
        }

        return $block;
    }


    /**
     * Convert a hex colour code (i.e. #FF6600) to RGB
     *
     * @return array
     **/
    public static function hex_to_rgb( $hex_colour )
    {
        return sscanf($hex_colour, "#%02x%02x%02x");
    }



    /**
     * Do we have any colours stored?
     *
     * @return int
     **/
    public static function has_colours()
    {
        return count( self::$header_colours );
    }

} // END class Header_Colours