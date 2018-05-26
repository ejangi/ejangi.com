    
    <article id="post-<?php the_ID(); ?>" <? post_class( 'post-preview' ) ?> data-permalink="<?= esc_attr( get_the_permalink() ) ?>">
        
        <header>
            <div class="container header-container">
                <h1 class="post-title"><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><? the_title() ?></a></h1>
                <h4 class="post-category"><? the_category( '&bull;' ) ?></h4>
            </div>
            <? if ( !is_single() ) : ?>
            <section class="post-excerpt">
                <div class="container">
                    <? the_excerpt() ?>
                </div>
            </section>
            <? endif; ?>
        </header>

        <? if ( has_post_thumbnail() ) : ?>
        <figure class="post-thumbnail">
            <? the_post_thumbnail() ?>
            <? if ( get_post(get_post_thumbnail_id())->post_excerpt ) : ?>
            <figcaption><?= esc_html( get_post(get_post_thumbnail_id())->post_excerpt ) ?></figcaption>
            <? endif; ?>
        </figure>
        <? endif; ?>

        <? if ( is_single() ) : ?>
        <div class="entry-content">
            <section class="basic-content">
                <div class="container">
                    <? the_content() ?>
                </div>
            </section>
        </div>
        <? endif; ?>

    </article>