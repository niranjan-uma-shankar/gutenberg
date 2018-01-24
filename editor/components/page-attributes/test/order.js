/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import { PageAttributesOrder } from '../order';

const postTypeWithPageAttributeSupport = {
	data: {
		supports: {
			'page-attributes': true,
		},
	},
};

const postTypeWithNoPageAttributeSupport = {
	data: {
		supports: {
			'page-attributes': false,
		},
	},
};

describe( 'PageAttributesOrder', () => {
	it( 'should reject invalid input', () => {
		const onUpdateOrder = jest.fn();
		const wrapper = shallow(
			<PageAttributesOrder onUpdateOrder={ onUpdateOrder } postType={ postTypeWithPageAttributeSupport } />
		);

		wrapper.find( 'input' ).simulate( 'change', {
			target: {
				value: -1,
			},
		} );

		wrapper.find( 'input' ).simulate( 'change', {
			target: {
				value: 'bad',
			},
		} );

		expect( onUpdateOrder ).not.toHaveBeenCalled();
	} );

	it( 'should update with valid input', () => {
		const onUpdateOrder = jest.fn();
		const wrapper = shallow(
			<PageAttributesOrder onUpdateOrder={ onUpdateOrder } postType={ postTypeWithPageAttributeSupport } />
		);

		wrapper.find( 'input' ).simulate( 'change', {
			target: {
				value: 4,
			},
		} );

		expect( onUpdateOrder ).toHaveBeenCalledWith( 4 );
	} );

	it( 'should render null if post type does not supports page attributes', () => {
		const onUpdateOrder = jest.fn();
		const wrapper = shallow(
			<PageAttributesOrder onUpdateOrder={ onUpdateOrder } postType={ postTypeWithNoPageAttributeSupport } />
		);
		expect( wrapper.html() ).toBeNull();
	} );

	it( 'should render null if post type is not passed', () => {
		const onUpdateOrder = jest.fn();
		const wrapper = shallow(
			<PageAttributesOrder onUpdateOrder={ onUpdateOrder } />
		);
		expect( wrapper.html() ).toBeNull();
	} );
} );
