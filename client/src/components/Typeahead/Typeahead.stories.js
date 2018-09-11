import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import Themes from '../../utils/ThemeUtil';

import Typeahead from './Typeahead';

const store = new Store({
    options: []
});

const stories = storiesOf('Components', module);

const onChange = (e) => {
    store.set({
        options: e.target.value.split('')
    });
};

stories.add('Typeahead', () => (
    <ThemeProvider theme={Themes.main}>
        <State store={store}>

            <Typeahead label="Test" placeholder="Test" onChange={onChange} options={store.options} onOptionSelected={action('typeahead-option-selected')}></Typeahead>

        </State>
    </ThemeProvider>
));