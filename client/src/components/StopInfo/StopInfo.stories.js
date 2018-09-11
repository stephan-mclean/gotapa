import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Themes from '../../utils/ThemeUtil';

import StopInfo from './StopInfo';

const stories = storiesOf('Components', module);

const testStop = {
    stopId: "4319",
    stopName: "Heuston Station",
    operators: [
        {
            name: "bac"
        }
    ]
}

stories.add('StopInfo', () => (
    <ThemeProvider theme={Themes.main}>
        <StopInfo {...testStop}></StopInfo>
    </ThemeProvider>
));