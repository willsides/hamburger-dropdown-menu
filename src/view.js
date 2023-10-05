/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

document.addEventListener("DOMContentLoaded", function() {
    // Adds the toggle function to the menu button
    const wsHBbuttons = document.querySelectorAll('.ws-hbmenu-toggle');

    const handleHBmenuClosure = event => {
        wsHBbuttons.forEach((wsHBbutton) => {
            const hbMenuContent = wsHBbutton.nextElementSibling;
            if (!hbMenuContent.contains(event.target)) {
                wsHBbutton.setAttribute('aria-expanded', false);
                hbMenuContent.setAttribute('aria-hidden', true);
            }
        });
    };

    wsHBbuttons.forEach((wsHBbutton) => {
        const hbMenuContent = wsHBbutton.nextElementSibling;
    
        const showHBmenuContents = () => {
            wsHBbutton.setAttribute('aria-expanded', true);
            hbMenuContent.setAttribute('aria-hidden', false);
        };
    
        const hideHBmenuContents = () => {
            wsHBbutton.setAttribute('aria-expanded', false);
            hbMenuContent.setAttribute('aria-hidden', true);
        };
    
        wsHBbutton.addEventListener('click', event => {
            event.stopPropagation();
            JSON.parse(wsHBbutton.getAttribute('aria-expanded')) ? hideHBmenuContents() : showHBmenuContents();
        });
    });

    window.addEventListener('click', handleHBmenuClosure);
    window.addEventListener('focusin', handleHBmenuClosure);
});