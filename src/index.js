import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, SelectControl } from '@wordpress/components';

import './style.scss';

import metadata from './block.json';

registerBlockType( metadata.name, {

    edit: ({ attributes, setAttributes }) => {
		const { backgroundColor, iconColor, style, horAlign } = attributes;
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

		const ALLOWED_BLOCKS = [ 'core/categories', 'core/paragraph', 'core/social-link', 'core/navigation', 'core/navigation-submenu', 'core/home-link', 'core/navigation-link', 'core/category', 'core/spacer', 'core/social-links', 'core/search', 'core/loginout' ];

        return (
            <div { ...blockProps }>
				<InspectorControls>					
					<SelectControl
                            label="Horizontal Menu Alignment"
                            value={ horAlign }
                            options={ [
                                { label: 'Left', value: 'left' },
                                { label: 'Right', value: 'right' },
                                { label: 'Center', value: 'center' },
                            ] }
                            onChange={ ( newHorAlign ) => {
                                setAttributes({ horAlign: newHorAlign });
                            } }
                        />
					<PanelBody title="Button Color" initialOpen={ true }>
						<ColorPicker
							color={iconColor}
							onChangeComplete={(value) => setAttributes({ iconColor: `rgba(${ value.rgb.r }, ${ value.rgb.g }, ${ value.rgb.b }, ${ value.rgb.a })` })}
							/>
					</PanelBody>
				</InspectorControls>
				<button class="ws-menu-toggle" aria-expanded="true">
					<div class="ws-hbicon-part1" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbicon-part2" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbicon-part3" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbmenu-spacer"></div>
				</button>
				<ul class={`ws-menu-content ws-menu-align-${horAlign}${backgroundColor ? ` has-background-color has-${backgroundColor}-background-color` : ''}`}
				 style={{ backgroundColor: style?.color?.background }}
				 aria-hidden="false">
                	<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS }/>
				</ul>
            </div>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
		const { backgroundColor, style, iconColor, horAlign } = attributes;

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
				<button class="ws-menu-toggle" aria-expanded="false">
					<div class="ws-hbicon-part1" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbicon-part2" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbicon-part3" style={{ backgroundColor: iconColor }}></div>
					<div class="ws-hbmenu-spacer"></div>
				</button>
				<ul class={`ws-menu-content ws-menu-align-${horAlign}${backgroundColor ? ` has-background-color has-${backgroundColor}-background-color` : ''}`}
				 style={{ backgroundColor: style?.color?.background }}
				 aria-hidden="true">
                	<InnerBlocks.Content />
				</ul>
            </div>
        );
    },
} );