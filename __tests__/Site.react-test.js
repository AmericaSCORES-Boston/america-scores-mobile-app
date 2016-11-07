import React from 'react';
import renderer from 'react-test-renderer';

import Site from '../config/Site.js';
import { sites } from '../config/mockData.js';
import SitePage from '../config/SitePage.js';

it('renders a Site using Snapshots', () => {
  expect(renderer.create(
    <Site
      site={sites[0]}
      selectSite={jest.fn}
    />
  )).toMatchSnapshot();
});

it('renders a selected Site using Snapshots', () => {
  expect(renderer.create(
    <Site
      isSelected
      site={sites[0]}
      selectSite={jest.fn}
    />
  )).toMatchSnapshot();
});
