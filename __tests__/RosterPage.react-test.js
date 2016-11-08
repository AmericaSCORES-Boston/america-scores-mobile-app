import React from 'react';
import renderer from 'react-test-renderer';

import RosterItem from '../config/RosterItem.js';
import { rosters } from '../config/mockDataRoster.js';
import RosterPage from '../config/RosterPage.js';

it('renders a RosterPage using Snapshots', () => {
  const component = renderer.create(
    <RosterPage
      rosters={rosters}
      selectRoster={jest.fn}
    />
  );
  expect(component).toMatchSnapshot();
});
