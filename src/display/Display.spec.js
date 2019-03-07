import React from 'react';

import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import Display from './Display';

describe('<Display />', () => {

    it('renders without crashing', () => {
        render(<Display />);
    });

    it('matches snapshot', () => {
        const snap = renderer.create(<Display />);
        expect(snap.toJSON()).toMatchSnapshot();
    })

})