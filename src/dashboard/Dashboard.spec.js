import React from 'react';

import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import Dashboard from './Dashboard';

describe('<Dashboard />', () => {

    it('renders without crashing', () => {
        render(<Dashboard />);
    });

    it('matches snapshot', () => {
        const snap = renderer.create(<Dashboard />);
        expect(snap.toJSON()).toMatchSnapshot();
    });

	it("confirms child components being render in proper order", () => {
        const { container } = render(<Dashboard />);
        
        expect(container.children).toHaveLength(2);

        expect(container.children[0]).toHaveClass('display panel');
        expect(container.children[1]).toHaveClass('controls panel');

	});

})