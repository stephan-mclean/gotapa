import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Themes from '../../utils/ThemeUtil';
import Pager from './Pager';


const stories = storiesOf('Components', module);

stories.add('Pager', () => {
    return (
        <ThemeProvider theme={Themes.main}>
            
            <Pager items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} itemsPerPage={4} />

        </ThemeProvider>
    );
});