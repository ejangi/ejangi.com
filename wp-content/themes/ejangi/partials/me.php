<?
namespace Ejangi;

if( $options == null ) {
    $options = new Me_Options();
}

$me_user = get_user_by( 'id', $user_id );
// var_dump( $me_user );
?>
<<?= $options->container_element ?> class="<?= $options->container_classes ?>">
    <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" data-target=".me-nav" aria-haspopup="true" aria-expanded="false">
        <?= get_avatar( $me_user->ID, 96, '', $me_user->display_name ) ?>
    </a>
    <? me_nav() ?>
</<?= $options->container_element ?>>