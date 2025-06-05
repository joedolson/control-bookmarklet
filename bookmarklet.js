javascript:(function () {
    const existingNodes = document.querySelectorAll(".checked-bookmarklet");
    const existingClasses = document.querySelectorAll( ".bookmarklet-added" );
    console.log(existingNodes);

    if (existingNodes.length) {
        for (const element in existingNodes) {
            existingNodes[element].remove();
        }
        return;
    }

    if (existingClasses.length) {
        for (const classItem in existingClasses) {
            existingClasses[classItem].classList.remove( 'bookmarklet-added' );
        }
        return;
    }
    
    let css = '.bookmarklet-added { outline: 2px solid #060; }.booklet-added:hover + .checked-bookmarklet { background-color: yellow; }.checked-bookmarklet li { margin: 6px; padding: 0; max-width: 100%; text-align: left; background: transparent; text-transform: none;}.checked-bookmarklet { list-style-type: square; background: #fff !important; color: #333 !important; border: 2px solid #900; padding: 3px !important; border-radius: 3px; position: absolute; width: max-content !important; max-width: 20em; font-size: 14px !important; margin: 0 !important; }';
    let style = document.createElement('style');
    
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);

    const nodes = document.querySelectorAll("a,button");
    
    for (const element in nodes) {
        console.log( element );
        if ( nodes[element] ) {
            let role = nodes[element].getAttribute('role');
            let innerText = nodes[element].innerText;
            let ariaLabel = ( nodes[element].hasAttribute( 'aria-label' ) ) ? nodes[element].getAttribute( 'aria-label' ) : false;
            let ariaDesc = ( nodes[element].hasAttribute( 'aria-describedby' ) ) ? nodes[element].getAttribute( 'aria-describedby' ) : false;

            let pseudoElement = document.createElement('ul');
            let roleContent = document.createElement( 'li' );
            let textContent = document.createElement( 'li' );
            let ariaContent = document.createElement( 'li' );
            let ariaDescribed = document.createElement( 'li' );

            let getRole = ( role ) ? role : '<' + nodes[element].nodeName + '>';
            roleContent.innerHTML = '<strong>Role</strong>: ' + getRole;
            pseudoElement.insertAdjacentElement( 'afterBegin', roleContent );
            if ( innerText ) {
                textContent.innerHTML = '<strong>Text Content</strong>: ' + innerText;
                pseudoElement.insertAdjacentElement( 'afterBegin', textContent );
            }
            if ( ariaLabel ) {
              ariaContent.innerHTML = '<strong>ARIA Label</strong>: ' + ariaLabel;
              pseudoElement.insertAdjacentElement( 'afterBegin', ariaContent );
            }
            if ( ariaDesc ) {
                ariaDescribed.innerHTML = '<strong>ARIA Described By</strong>: ' + ariaDesc;
                pseudoElement.insertAdjacentElement( 'afterBegin', ariaDescribed );
            }

            pseudoElement.className = 'checked-bookmarklet';

            nodes[element].after(pseudoElement);
            nodes[element].classList.add( 'bookmarklet-added' );
        }
    }
})();