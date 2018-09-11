import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Themes from '../../utils/ThemeUtil';

import Nav from './Nav';

const stories = storiesOf('Components', module);

stories.add('Nav', () => (
    <ThemeProvider theme={Themes.main}>
        <Nav>Nav</Nav>
    </ThemeProvider>
    
));