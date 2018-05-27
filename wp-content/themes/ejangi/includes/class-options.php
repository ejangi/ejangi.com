<?
namespace Ejangi;

/**
 * An object that you can set the properties for on instantiation by passing an asociative array of properties (keys) and values.
 *
 * @package Ejangi
 **/
class Options {

    /**
     * Constructor
     *
     * @param $options Array An associative array of object keys and values for instantiate this object with
     * @return void
     **/
    public function __construct( $options = [] )
    {
        foreach( $options as $key => $value ) {
            if( property_exists( $this, $key ) ) {
                $this->$key = $value;
            }
        }
    }

}