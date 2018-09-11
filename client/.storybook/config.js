import { configure } from '@storybook/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';

import '../src/index.css';

library.add(faSpinner, faSearch);

configure(
  () => {
    const req = require.context('../src/components', true, /.stories.js$/);
    req.keys().forEach((filename) => req(filename));
  },
  module
);