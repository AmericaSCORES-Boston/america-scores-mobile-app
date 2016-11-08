import React from 'react';
import renderer from 'react-test-renderer';

import RosterItem from '../config/RosterItem.js';
import { rosters } from '../config/mockDataRoster.js';
import RosterPage from '../config/RosterPage.js';

it('renders a RosterItem using Snapshots', () => {
  expect(renderer.create(
    <RosterItem
      roster={rosters[0]}
      selectRoster={jest.fn}
    />
  )).toMatchSnapshot();
});

it('renders a selected RosterItem using Snapshots', () => {
  expect(renderer.create(
    <RosterItem
      isSelected
      roster={rosters[0]}
      selectRoster={jest.fn}
    />
  )).toMatchSnapshot();
});
