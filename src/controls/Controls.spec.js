import React from 'react';

import { render } from 'react-testing-library'; 
import 'jest-dom/extend-expect'; 

import Controls from './Controls';

describe('<Controls />', () => {

  it('renders without crashing', () => {
    render(<Controls />);
  });

})