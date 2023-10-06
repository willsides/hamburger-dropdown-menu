document.addEventListener("DOMContentLoaded", function() {
    // Adds the toggle function to the menu button
    const wsMenuToggleButtons = document.querySelectorAll('button.ws-menu-toggle');

    const wsHandleMenuClosure = event => {
        wsMenuToggleButtons.forEach((wsMenuToggleButton) => {
            const menuContentWrapper = wsMenuToggleButton.nextElementSibling;
            if (!menuContentWrapper.contains(event.target)) {
                wsMenuToggleButton.setAttribute('aria-expanded', false);
                menuContentWrapper.setAttribute('aria-hidden', true);
            }
        });
    };

    wsMenuToggleButtons.forEach((wsMenuToggleButton) => {
        const menuContentWrapper = wsMenuToggleButton.nextElementSibling;
    
        const wsShowMenuContentWrappers = () => {
            wsMenuToggleButton.setAttribute('aria-expanded', true);
            menuContentWrapper.setAttribute('aria-hidden', false);
        };
    
        const wsHideMenuContentWrappers = () => {
            wsMenuToggleButton.setAttribute('aria-expanded', false);
            menuContentWrapper.setAttribute('aria-hidden', true);
        };
    
        wsMenuToggleButton.addEventListener('click', event => {
            event.stopPropagation();
            JSON.parse(wsMenuToggleButton.getAttribute('aria-expanded')) ? wsHideMenuContentWrappers() : wsShowMenuContentWrappers();
        });
    });

    window.addEventListener('click', wsHandleMenuClosure);
    window.addEventListener('focusin', wsHandleMenuClosure);
});