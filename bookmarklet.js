javascript:(function () {
    const existingNodes = document.querySelectorAll( ".checked-bookmarklet" );
    const existingClasses = document.querySelectorAll( ".bookmarklet-added" );

    if (existingNodes.length) {
        for (const element in existingNodes) {
            existingNodes[element].remove();
        }
        return;
    }

    if (existingClasses.length) {
        for (const classItem in existingClasses) {
            console.log( classItem );
            existingClasses[classItem].classList.remove( 'bookmarklet-added' );
        }
        return;
    }

    let style = document.createElement('style');
    let css = '.bookmarklet-added { outline: 2px solid #060 !important; outline-offset: 1px !important; }';
    css += '.checked-bookmarklet > ul li { font-style: normal; display: list-item!important; font-weight: 400;margin: 6px; padding: 0; max-width: 100%; text-align: left; background: transparent; text-transform: none;}';
    css += '.checked-bookmarklet > ul { display: block !important; list-style-type: square !important; padding: 3px 3px 3px 12px!important; margin: 0 !important; }';
    css += '.checked-bookmarklet { position: fixed !important; margin: 0 !important; text-shadow: none; font-family: sans-serif; left: anchor(left) !important; top: anchor(bottom) !important; position-try-fallbacks: flip-start;z-index: 10000; background: #fff !important; color: #333 !important; border: 2px solid #900; border-radius: 3px; width: max-content !important; max-width: 20em; font-size: 14px !important; }';
    css += '.checked-bookmarklet:popover-open { display: block !important; }';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);

    const nodes = document.querySelectorAll("a,button,div[role=button],input[type=submit],input[type=button]");
    
    for (const element in nodes) {
        if ( ! isNaN(element) ) {
            if ( nodes[element] ) {
                let popoverId = crypto.randomUUID();
                let popover = document.createElement( 'div' );
                let pseudoElement = document.createElement('ul');
                popover.setAttribute( 'popover', 'hint' );
                popover.setAttribute( 'id', popoverId );
                popover.style.positionAnchor = '--' + popoverId;
                popover.className = 'checked-bookmarklet';

                let el = '`' + nodes[element].nodeName + '`';
                let role = nodes[element].getAttribute('role');
                let innerText;
                if ( 'INPUT' === nodes[element].nodeName ) {
                    innerText = nodes[element].getAttribute( 'value' );
                } else {
                    innerText = nodes[element].innerText;
                    innerText = ( ! innerText || '' === innerText ) ? 'None' : innerText;
                }
                let svgContents = nodes[element].querySelectorAll( 'svg' );
                if ( svgContents ) {
                    if ( innerText === 'None' ) {
                        innerText = '';
                    }
                    svgContents.forEach( (svg) => {
                        innerText += ( svg.hasAttribute( 'aria-label' ) ) ? svg.getAttribute( 'aria-label' ) : '';
                        innerText += ( innerText !== '' ) ? ', ' + svg.textContent : svg.textContent;
                    });
                    if ( innerText === '' ) {
                        innerText = 'None';
                    }
                }
                let ariaLabel = ( nodes[element].hasAttribute( 'aria-label' ) ) ? nodes[element].getAttribute( 'aria-label' ) : false;
                let ariaDesc = ( nodes[element].hasAttribute( 'aria-describedby' ) ) ? nodes[element].getAttribute( 'aria-describedby' ) : false;
                let ariaLabelledBy = ( nodes[element].hasAttribute( 'aria-labelledby' ) ) ? nodes[element].getAttribute( 'aria-labelledby' ) : false;
                let tabIndex = ( nodes[element].hasAttribute( 'tabindex' ) ) ? nodes[element].getAttribute( 'tabindex' ) : false;

                if ( ariaLabelledBy ) {
                    ariaLabelledBy = document.getElementById( ariaLabelledBy );
                    ariaLabelledBy = ariaLabelledBy.innerText;
                }

                pseudoElement = addListNode( pseudoElement, 'Element', el );
                if ( role ) {
                    pseudoElement = addListNode( pseudoElement, 'Role', role );
                }
                if ( innerText ) {
                    pseudoElement = addListNode( pseudoElement, 'Text Content', innerText );
                }
                if ( tabIndex ) {
                    pseudoElement = addListNode( pseudoElement, 'Tab Index', tabIndex );
                }
                if ( ariaLabel ) {
                    pseudoElement = addListNode( pseudoElement, 'ARIA Label', ariaLabel );
                }
                if ( ariaLabelledBy ) {
                    pseudoElement = addListNode( pseudoElement, 'ARIA Labelled By', ariaLabelledBy );
                }
                if ( ariaDesc ) {
                    pseudoElement = addListNode( pseudoElement, 'ARIA Description', ariaDesc );
                }
                popover.insertAdjacentElement( 'afterBegin', pseudoElement );
                nodes[element].after(popover);
                nodes[element].classList.add( 'bookmarklet-added' );
                nodes[element].style.anchorName = '--' + popoverId;
                nodes[element].setAttribute( 'position-anchor', '--' + popoverId );
                ['mouseover','mouseout','focus','blur'].forEach( (eventType) => {
                    nodes[element].addEventListener( eventType, () => {
                        let popover = document.getElementById( popoverId );
                        popover.togglePopover();
                    });
                });
            }
        }
    }

    function addListNode( el, label, value ) {
        let listItem = document.createElement( 'li' );
        listItem.innerHTML = '<strong>' + label + '</strong>: ' + value;
        el.insertAdjacentElement( 'afterBegin', listItem );

        return el;
    }
})();