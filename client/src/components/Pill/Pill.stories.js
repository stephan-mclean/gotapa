import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import { Pill } from './Pill';

const stories = storiesOf('Components', module);
stories.addDecorator(withKnobs);
  
stories.add('Pill', () => {
    const label = text('Label', 'Default');
    const background = text('Background', 'black');
    const color = text('Color', 'white');

    return (<Pill background={background} color={color}>{label}</Pill>);
});