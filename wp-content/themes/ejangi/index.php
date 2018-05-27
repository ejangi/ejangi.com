<? 
namespace Ejangi;
?>

<? get_header() ?>

<div class="container main-container">
    
    <? if ( have_posts() ) : ?>
        <? while ( have_posts() ) : the_post(); ?>

        <? get_template_part( 'partials/article' ) ?>

        <? endwhile; ?>

        <? if ( is_search() ) : ?>
            <div class="search-return">
                <a href="<? home_url() ?>" class="home-url"><?= __( 'Return Home', theme ) ?></a>
            </div>
        <? endif; ?>
    <? else: ?>

        <div class="no-posts">
            <div class="container">

                <header>
                    <h1><?= __( 'Nothing to see here', theme ) ?></h1>
                    <? if ( is_search() ) : ?>
                    <h4>Your search for <span class="search-term"><?= get_search_query() ?></span> did not return any results.</h4>
                    <? endif; ?>
                </header>

            </div>
        </div>

    <? endif; ?>

</div>

<? get_footer() ?>