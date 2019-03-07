import React from 'react';

import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import Controls from './Controls';

describe('<Controls />', () => {

    it('renders without crashing', () => {
        render(<Controls />);
    });

    it('matches snapshot', () => {
        const snap = renderer.create(<Controls />);
        expect(snap.toJSON()).toMatchSnapshot();
    })

    it('renders main div with className of "controls panel"', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Controls />);

        const controlsPanel = renderer.getRenderOutput();
        expect(controlsPanel.type).toBe('div');
        expect(controlsPanel.props.className).toBe('controls panel');
    });

    it('confirm controls panel children are buttons with default classnames', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Controls />);

        const controlsPanel = renderer.getRenderOutput();

        const controlsPanelChildren = controlsPanel.props.children;
        expect(controlsPanelChildren).toHaveLength(2);

        controlsPanelChildren.map(child => {
            expect(child.type).toBe('button');
            expect(child.props.className).toBe('toggle-btn');
        })
    });

    it('confirm controls panel children are displaying defualt text', () => {
        const { getByText } = render(<Controls />);

        const lockGate = getByText(/Lock Gate/i);
        expect(lockGate).toBeInTheDocument();
        expect(lockGate.textContent).toBe('Lock Gate');

        const closeGate = getByText(/Close Gate/i);
        expect(closeGate).toBeInTheDocument();
        expect(closeGate.textContent).toBe('Close Gate');
    });

})