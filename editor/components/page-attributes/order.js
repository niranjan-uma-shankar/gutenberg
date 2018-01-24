/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withAPIData, withInstanceId } from '@wordpress/components';
import { compose } from '@wordpress/element';

/**
 * Internal dependencies
 */
import PageAttributesCheck from './check';
import { editPost } from '../../store/actions';
import { getCurrentPostType, getEditedPostAttribute } from '../../store/selectors';

export function PageAttributesOrder( { onUpdateOrder, instanceId, order, postType } ) {
	if ( ! get( postType, 'data.supports.page-attributes', false ) ) {
		return null;
	}

	const setUpdatedOrder = ( event ) => {
		const newOrder = Number( event.target.value );
		if ( newOrder >= 0 ) {
			onUpdateOrder( newOrder );
		}
	};
	// Create unique identifier for inputs
	const inputId = `editor-page-attributes__order-${ instanceId }`;

	return (
		<PageAttributesCheck>
			<label htmlFor={ inputId }>
				{ __( 'Order' ) }
			</label>
			<input
				type="text"
				value={ order || 0 }
				onChange={ setUpdatedOrder }
				id={ inputId }
				size={ 6 }
			/>
		</PageAttributesCheck>
	);
}

const applyConnect = connect(
	( state ) => {
		return {
			postTypeSlug: getCurrentPostType( state ),
			order: getEditedPostAttribute( state, 'menu_order' ),
		};
	},
	{
		onUpdateOrder( order ) {
			return editPost( {
				menu_order: order,
			} );
		},
	}
);

const applyWithAPIData = withAPIData( ( props ) => {
	const { postTypeSlug } = props;

	return {
		postType: `/wp/v2/types/${ postTypeSlug }?context=edit`,
	};
} );

export default compose( [
	applyConnect,
	applyWithAPIData,
	withInstanceId,
] )( PageAttributesOrder );
