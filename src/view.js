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