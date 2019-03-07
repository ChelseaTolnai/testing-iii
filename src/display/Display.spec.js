import React from 'react';

import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import Display from './Display';

describe('<Display />', () => {

    it('renders without crashing', () => {
        render(<Display />);
    });

    it('matches snapshot', () => {
        const snap = renderer.create(<Display />);
        expect(snap.toJSON()).toMatchSnapshot();
    })

    it('received correct default props and values', () => {
        const closed = Display.defaultProps.closed;
        expect(closed).toBeDefined();
        expect(closed).toBe(false);;

        const locked = Display.defaultProps.locked;
        expect(locked).toBeDefined();
        expect(locked).toBe(false);
    });

    it('renders main div with className of display panel', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Display />);

        const displayPanel = renderer.getRenderOutput();
        expect(displayPanel.type).toBe('div');
        expect(displayPanel.props.className).toBe('display panel');
    });

    it('confirm display panel children are divs with default classnames', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Display />);

        const displayPanel = renderer.getRenderOutput();
        
        const defaultClassName = 'led green-led';
        const displayPanelChildren = displayPanel.props.children;
        expect(displayPanelChildren).toHaveLength(2);

        displayPanelChildren.map(child => {
            expect(child.type).toBe('div');
            expect(child.props.className).toBe(defaultClassName);
        })
    });

})