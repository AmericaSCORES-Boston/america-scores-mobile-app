import React from 'react';
import renderer from 'react-test-renderer';

import SitePage from '../config/SitePage.js';
import { sites } from '../config/mockData.js';

it('renders a SitePage using Snapshots', () => {
  const component = renderer.create(
    <SitePage
      sites={sites}
      selectSite={jest.fn}
    />
  );
  expect(component).toMatchSnapshot();
});
