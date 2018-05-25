<? 
namespace Ejangi;
?>

<? if ( !is_headless() ) : ?>

<? get_header() ?>

<div class="container main-container">

<? endif; ?>
    
    <? if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <? get_template_part( 'partials/article' ) ?>

    <? endwhile; endif; ?>

<? if ( !is_headless() ) : ?>

</div>

<? get_footer() ?>

<? endif; ?>