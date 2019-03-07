import React from 'react';

import { render , fireEvent} from 'react-testing-library';
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

    it('confirms control buttons function properly with expected output', () => {
        const { getByText } = render(<Dashboard />);

        // Default
        expect(getByText(/Unlocked/)).toBeInTheDocument();
        expect(getByText(/Open$/)).toBeInTheDocument();
        expect(getByText(/Lock Gate/)).toBeInTheDocument();
        expect(getByText(/Lock Gate/)).toHaveAttribute('disabled'); 
        expect(getByText(/Close Gate/)).toBeInTheDocument();

        fireEvent.click(getByText(/Close Gate/));

        // After Close Gate clicked
        expect(getByText(/Unlocked/)).toBeInTheDocument();
        expect(getByText(/Closed/)).toBeInTheDocument(); 
        expect(getByText(/Lock Gate/)).toBeInTheDocument();
        expect(getByText(/Lock Gate/)).not.toHaveAttribute('disabled'); 
        expect(getByText(/Open Gate/)).toBeInTheDocument();

        fireEvent.click(getByText(/Lock Gate/));
        
        // After Lock Gate clicked
        expect(getByText(/Locked/)).toBeInTheDocument();
        expect(getByText(/Closed/)).toBeInTheDocument(); 
        expect(getByText(/Unlock Gate/)).toBeInTheDocument();
        expect(getByText(/Open Gate/)).toBeInTheDocument();
        expect(getByText(/Open Gate/)).toHaveAttribute('disabled'); 

        fireEvent.click(getByText(/Unlock Gate/));
        
        // After Unlock Gate clicked
        expect(getByText(/Unlocked/)).toBeInTheDocument();
        expect(getByText(/Closed/)).toBeInTheDocument(); 
        expect(getByText(/Lock Gate/)).toBeInTheDocument();
        expect(getByText(/Lock Gate/)).not.toHaveAttribute('disabled'); 
        expect(getByText(/Open Gate/)).toBeInTheDocument();

        fireEvent.click(getByText(/Open Gate/));
        
        // After Open Gate clicked === Reverts back to Default
        expect(getByText(/Unlocked/)).toBeInTheDocument();
        expect(getByText(/Open$/)).toBeInTheDocument();
        expect(getByText(/Lock Gate/)).toBeInTheDocument();
        expect(getByText(/Lock Gate/)).toHaveAttribute('disabled'); 
        expect(getByText(/Close Gate/)).toBeInTheDocument();
    });
    
})