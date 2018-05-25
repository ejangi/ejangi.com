<? 
namespace Ejangi;
?>

<? get_header() ?>

<div class="container main-container">
    
    <? if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <? get_template_part( 'partials/article' ) ?>

    <? endwhile; endif; ?>

</div>

<? get_footer() ?>