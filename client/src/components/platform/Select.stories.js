import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Themes from '../../utils/ThemeUtil'; 
import Select from './Select';

const stories = storiesOf('Components', module);

stories.add('Select', () => (
    <ThemeProvider theme={Themes.main}>
        <div>
            <Select options={[1, 2, 3]} />

            <Select label="With Label" options={[4, 5, 6]} />

            <Select label="With Inline Label" inline options={[7, 8, 9]} />

            <Select label="With Render By" 
                    options={[{ name: 'ONE', value: 'one' }, { name: 'TWO', value: 'two' }]}
                    renderOptionsBy="name" />
        </div>
    </ThemeProvider>
));