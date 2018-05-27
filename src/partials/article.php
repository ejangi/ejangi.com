<?
namespace Ejangi;

$post_classes = [];

$header_location = 'bottom';
$header_style = 'standard';
$header_colour = '';
$header_gradient = 'none';

if ( get_field_value( 'header_location' ) ) $header_location = 
    get_field_value( 'header_location' );
if ( get_field_value( 'header_style' ) ) $header_style = get_field_value( 'header_style' );
if ( get_field_value( 'header_colour' ) ) $header_colour = get_field_value( 'header_colour' );
if ( get_field_value( 'header_gradient' ) ) $header_gradient = get_field_value( 'header_gradient' );

if ( is_single() ) $post_classes[] = 'post-preview';
$post_classes[] = 'header-location-'.$header_location;
$post_classes[] = 'header-style-'.$header_style;
$post_classes[] = 'header-gradient-'.$header_gradient;

if ( $header_gradient == 'header-colour' ) new Header_Colours( get_the_ID(), $header_colour );
?>

    <article id="post-<?php the_ID(); ?>" <? post_class( implode( ' ', $post_classes ) ) ?> data-permalink="<?= esc_attr( get_the_permalink() ) ?>"<? if ( $header_colour ) : ?> style="background-color: <?= $header_colour ?>;"<? endif; ?>>
        
        <header>
            <div class="container header-container">
                <h1 class="post-title"><? if ( !is_single() ) : ?><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><? endif; ?><? the_title() ?><? if ( !is_single() ) : ?></a><? endif; ?></h1>
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
