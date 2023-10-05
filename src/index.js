/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {

    edit: () => {
        const blockProps = useBlockProps();
		
		const ALLOWED_BLOCKS = [ 'core/navigation-link', 'core/category', 'core/spacer', 'core/social-links', 'core/search', 'core/social-links' ];

        return (
            <div { ...blockProps }>
				<button class="ws-hbmenu-toggle" aria-expanded="false">
					<div class="ws-hbicon-part1"></div>
					<div class="ws-hbicon-part2"></div>
					<div class="ws-hbicon-part3"></div>
					<div class="ws-hbmenu-spacer"></div>
				</button>
				<ul class="ws-hbmenu-content" aria-hidden="true">
                	<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS }/>
				</ul>
            </div>
        );
    },

    save: () => {
        const blockProps = useBlockProps.save();

        return (
            <div { ...blockProps }>
				<button class="ws-hbmenu-toggle" aria-expanded="false">
					<div class="ws-hbicon-part1"></div>
					<div class="ws-hbicon-part2"></div>
					<div class="ws-hbicon-part3"></div>
					<div class="ws-hbmenu-spacer"></div>
				</button>
				<ul class="ws-hbmenu-content" aria-hidden="true">
                	<InnerBlocks.Content class="ws-hbmenu-content" />
				</ul>
            </div>
        );
    },
} );
