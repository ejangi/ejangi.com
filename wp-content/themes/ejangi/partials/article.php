    
    <article id="post-<?php the_ID(); ?>" <? post_class( 'post-preview' ) ?> data-permalink="<?= esc_attr( get_the_permalink() ) ?>">
        
        <header>
            <h1 class="post-title"><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><? the_title() ?></a></h1>
            <h4 class="post-category"><? the_category( '&bull;' ) ?></h4>
            <section class="post-excerpt">
                <? the_excerpt() ?>
            </section>
        </header>

        <? if ( has_post_thumbnail() ) : ?>
        <figure class="post-thumbnail">
            <? the_post_thumbnail() ?>
            <? if ( get_post(get_post_thumbnail_id())->post_excerpt ) : ?>
            <figcaption><?= esc_html( get_post(get_post_thumbnail_id())->post_excerpt ) ?></figcaption>
            <? endif; ?>
        </figure>
        <? endif; ?>

    </article>