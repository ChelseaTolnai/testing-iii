import React from 'react';

import { render, fireEvent } from 'react-testing-library';
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

    it('confirm controls panel children are displaying defualt text and value', () => {
        const { getByText } = render(<Controls />);

        const lockGate = getByText(/Lock Gate/i);
        expect(lockGate).toBeInTheDocument();
        expect(lockGate.textContent).toBe('Lock Gate');
        expect(lockGate.disabled).toBe(true);

        const closeGate = getByText(/Close Gate/i);
        expect(closeGate).toBeInTheDocument();
        expect(closeGate.textContent).toBe('Close Gate');
        expect(closeGate.disabled).toBe(false);

    });

    it('should call the toggleLocked() function passed as props', () => {
        const toggleLocked = jest.fn();
        
		const { getByText } = render(<Controls toggleLocked={toggleLocked} />);

        fireEvent.click(getByText(/Lock Gate/i));
        expect(toggleLocked).toHaveBeenCalled;
    });

    it('should call the toggleClosed() function  passed as props', () => {
        const toggleClosed = jest.fn();
        
		const { getByText } = render(<Controls toggleClosed={toggleClosed} />);
        
        fireEvent.click(getByText(/Close Gate/i));
        expect(toggleClosed).toHaveBeenCalled;
    });

})