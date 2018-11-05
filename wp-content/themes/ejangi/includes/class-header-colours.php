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
    public function __construct( $post_id, $colour, $location )
    {
        self::$header_colours[ $post_id ] = [
            'color' => $colour,
            'location' => $location
        ];
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

            foreach ( self::$header_colours as $post_id => $details ) {
                $color = $details['color'];
                $location = $details['location'];

                $opacity_1 = 0;
                $opacity_2 = 1;

                if ( $location == 'top' ) {
                    $opacity_1 = 1;
                    $opacity_2 = 0;
                }

                list( $r, $g, $b ) = self::hex_to_rgb( $color );
                $block .= '#post-'.$post_id.'.format-standard.header-gradient-header-colour:after { background: linear-gradient(to bottom, rgba('.$r.', '.$g.', '.$b.', '.$opacity_1.') 0%,rgba('.$r.', '.$g.', '.$b.', '.$opacity_2.') 50%); }';
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