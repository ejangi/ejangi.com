<?
namespace Ejangi;
?>
<!doctype html>  
<!--[if (gte IE 9)|(gt IEMobile 7)|!(IEMobile)|!(IE)]><!--><html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->
    
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title><?php wp_title( ' — ', true, 'right' ); ?></title> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
        <?php wp_head(); ?>  
    </head>
    
    <body <?php body_class(); ?>>
                
        <header role="banner">
                
            <div class="navbar navbar-default navbar-fixed-top">
                <div class="container">
          
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggler collapsed" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <?= the_custom_logo() ?>
                    </div>

                    <? if( get_theme_mod( theme.'_me' ) ) : ?>
                    <div class="col me"><?= me_block( get_theme_mod( theme.'_me' ), new Me_Options( [ 'container_element' => 'div' ] ) ) ?></div>
                    <? endif ?>

                    <div class="main-nav collapse navbar-collapse navbar-responsive-collapse">
                        <?php main_nav(); ?>

                        <?php //if(of_get_option('search_bar', '1')) {?>
                        <form class="navbar-form navbar-right" role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>">
                            <div class="form-group">
                                <input name="s" id="s" type="text" class="search-query form-control" autocomplete="off" placeholder="<?php _e('Search','wpbootstrap'); ?>">
                            </div>
                        </form>
                        <?php //} ?>
                    </div>

                </div>
            </div>
        
        </header>

        <main>