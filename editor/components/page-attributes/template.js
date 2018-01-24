/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { isEmpty, map } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withContext, withInstanceId } from '@wordpress/components';
import { compose } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import { getEditedPostAttribute } from '../../store/selectors';
import { editPost } from '../../store/actions';

export function PageTemplate( { availableTemplates, selectedTemplate, instanceId, onUpdateTemplate } ) {
	if ( isEmpty( availableTemplates ) ) {
		return null;
	}
	const selectId = `template-selector-${ instanceId }`;

	// Disable reason: A select with an onchange throws a warning

	/* eslint-disable jsx-a11y/no-onchange */
	return (
		<div className="editor-page-attributes__template">
			<label htmlFor={ selectId }>{ __( 'Template:' ) }</label>
			<select
				id={ selectId }
				value={ selectedTemplate }
				onChange={ ( event ) => onUpdateTemplate( event.target.value ) }
			>
				{ map( { '': __( 'Default template' ), ...availableTemplates }, ( templateName, templateSlug ) => (
					<option key={ templateSlug || 'default' } value={ templateSlug }>{ templateName }</option>
				) ) }
			</select>
		</div>
	);
}

const applyConnect = connect(
	( state ) => {
		return {
			selectedTemplate: getEditedPostAttribute( state, 'template' ),
		};
	},
	{
		onUpdateTemplate( templateSlug ) {
			return editPost( { template: templateSlug || '' } );
		},
	}
);

const applyWithContext = withContext( 'editor' )(
	( settings ) => ( {
		availableTemplates: settings.availableTemplates,
	} )
);

export default compose( [
	applyConnect,
	applyWithContext,
	withInstanceId,
] )( PageTemplate );
