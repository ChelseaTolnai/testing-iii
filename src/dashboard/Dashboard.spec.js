import React from 'react';

import { render } from 'react-testing-library'; 
import 'jest-dom/extend-expect'; 

import Dashboard from './Dashboard';

describe('<Dashboard />', () => {

  it('renders without crashing', () => {
    render(<Dashboard />);
  });

})