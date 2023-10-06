/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker } from '@wordpress/components';

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

    edit: ({ attributes, setAttributes }) => {
		const { backgroundColor, iconColor, style } = attributes;
		const blockProps = useBlockProps();

		if (blockProps.className) {
			blockProps.className = blockProps.className
				.split(' ')
				.filter(className => {
					return className !== 'has-background' && !className.match(/has-([\w-]+)-background-color/);
				})
				.join(' ');
		}
		
		if (blockProps.style && blockProps.style.backgroundColor) {
			delete blockProps.style.backgroundColor;
		}

		const ALLOWED_BLOCKS = [ 'core/navigation-link', 'core/category', 'core/spacer', 'core/social-links', 'core/search', 'core/social-links' ];

        return (
            <div { ...blockProps }>
				<InspectorControls>
					<PanelBody title="Button Color" initialOpen={ true }>
						<ColorPicker
							color={iconColor}
							onChangeComplete={(value) => setAttributes({ iconColor: `rgba(${ value.rgb.r }, ${ value.rgb.g }, ${ value.rgb.b }, ${ value.rgb.a })` })}
							/>
					</PanelBody>
				</InspectorControls>
				<button class="ws-hbmenu-toggle" aria-expanded="true">
					<div class="ws-hbicon-part1" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbicon-part2" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbicon-part3" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbmenu-spacer"></div>
				</button>
				<ul class={`ws-hbmenu-content${backgroundColor ? ` has-background-color has-${backgroundColor}-background-color` : ''}`}
				 style={{ backgroundColor: style?.color?.background }}
				 aria-hidden="false">
                	<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS }/>
				</ul>
            </div>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
		const { backgroundColor, style, iconColor } = attributes;

		if (blockProps.className) {
			blockProps.className = blockProps.className
				.split(' ')
				.filter(className => {
					return className !== 'has-background' && !className.match(/has-([\w-]+)-background-color/);
				})
				.join(' ');
		}
		
		if (blockProps.style && blockProps.style.backgroundColor) {
			delete blockProps.style.backgroundColor;
		}

        return (
            <div { ...blockProps }>
				<button class="ws-hbmenu-toggle" aria-expanded="false">
					<div class="ws-hbicon-part1" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbicon-part2" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbicon-part3" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbmenu-spacer"></div>
				</button>
				<ul class={`ws-hbmenu-content${backgroundColor ? ` has-background-color has-${backgroundColor}-background-color` : ''}`}
				 style={{ backgroundColor: style?.color?.background }}
				 aria-hidden="true">
                	<InnerBlocks.Content class="ws-hbmenu-content" />
				</ul>
            </div>
        );
    },
} );