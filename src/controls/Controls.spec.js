import React from 'react';

import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import Controls from './Controls';

describe('<Controls />', () => {

    it('renders without crashing', () => {
        render(<Controls />);
    });

    it('matches snapshot', () => {
        const snap = renderer.create(<Controls />);
        expect(snap.toJSON()).toMatchSnapshot();
    })

})