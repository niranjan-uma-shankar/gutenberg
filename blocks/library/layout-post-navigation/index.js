/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import { registerBlockType } from '../../api';

registerBlockType( 'core/post-navigation', {
	title: __( 'Post Navigation' ),

	description: __( 'Links to the next and previous posts.' ),

	icon: 'leftright',

	category: 'layout',

	useOnce: true,

	edit( { className } ) {
		return (
			<div className={ className }>
				<a href="#previous" className="wp-block-post-navigation__previous">{ __( 'Previous Post' ) }</a>
				<a href="#next" className="wp-block-post-navigation__next">{ __( 'Next Post' ) }</a>
			</div>
		);
	},

	save() {
		return null;
	},
} );
