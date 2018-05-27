<?
/**
 * Bootstrap Walker Menu
 * @author Chris Barnes (http://cbarn.es)
 * @see https://github.com/arnabwahid/wordpress-bootstrap
 */
class Bootstrap_walker extends Walker_Nav_Menu {
  function start_el(&$output, $object, $depth = 0, $args = Array(), $current_object_id = 0){
     global $wp_query;
     $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
    
     $class_names = $value = '';
    
    // If the item has children, add the dropdown class for bootstrap
    if ( $args->has_children ) {
        $class_names = "dropdown ";
    }

    $classes = empty( $object->classes ) ? array() : (array) $object->classes;
    
    $class_names .= join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $object ) );
    $class_names = ' class="'. esc_attr( $class_names ) . '"';
       
    $output .= $indent . '<li id="menu-item-'. $object->ID . '"' . $value . $class_names .'>';
    $attributes  = ! empty( $object->attr_title ) ? ' title="'  . esc_attr( $object->attr_title ) .'"' : '';
    $attributes .= ! empty( $object->target )     ? ' target="' . esc_attr( $object->target     ) .'"' : '';
    $attributes .= ! empty( $object->xfn )        ? ' rel="'    . esc_attr( $object->xfn        ) .'"' : '';
    $attributes .= ! empty( $object->url )        ? ' href="'   . esc_attr( $object->url        ) .'"' : '';
    $attributes .= ' data-last-modified="'.esc_attr( get_the_modified_date( 'Y-m-d H:i:s', $object ) ).'"';
    // if the item has children add these two attributes to the anchor tag
    if ( $args->has_children ) {
          $attributes .= ' class="dropdown-toggle" data-toggle="dropdown"';
    }
    $item_output = $args->before;
    $item_output .= '<a'. $attributes .'>';
    $item_output .= $args->link_before .apply_filters( 'the_title', $object->title, $object->ID );
    $item_output .= $args->link_after;
    // if the item has children add the caret just before closing the anchor tag
    if ( $args->has_children ) {
        $item_output .= '<b class="caret"></b></a>';
    }
    else {
        $item_output .= '</a>';
    }
    $item_output .= $args->after;
    $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $object, $depth, $args );
  } // end start_el function
        
  function start_lvl(&$output, $depth = 0, $args = Array()) {
    $indent = str_repeat("\t", $depth);
    $output .= "\n$indent<ul class=\"dropdown-menu\">\n";
  }
      
  function display_element( $element, &$children_elements, $max_depth, $depth=0, $args, &$output ){
    $id_field = $this->db_fields['id'];
    if ( is_object( $args[0] ) ) {
        $args[0]->has_children = ! empty( $children_elements[$element->$id_field] );
    }
    return parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
  }        
}