<?
namespace Ejangi;
?>
        </main>

        <footer role="contentinfo">
        
            <div id="inner-footer" class="clearfix">
              <hr />
              <div id="widget-footer" class="clearfix row">
                <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('footer1') ) : ?>
                <?php endif; ?>
                <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('footer2') ) : ?>
                <?php endif; ?>
                <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('footer3') ) : ?>
                <?php endif; ?>
              </div>
                
                <nav class="clearfix">
                    <?php footer_links(); ?>
                </nav>
                
                <p class="attribution">&copy; <?php bloginfo('name'); ?></p>
            
            </div>
            
        </footer>

        <?php wp_footer();  ?>

    </body>

</html>