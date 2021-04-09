---
name: 'Storybook'
root: './src'
output: '**/*'
ignore: ['assets']
questions:
  storyName: 'Story name. (e.g. Button, Header)'
  projectName:
    message: 'Select project.'
    choices: ['common']
  layer:
    message: 'Generate Layer'
    choices: ['L1', 'L2', 'L3']
---

# `{{ inputs.projectName }}/{{ inputs.layer }}/{{ inputs.storyName | pascal }}.stories.tsx`

```typescript
/**
 * @file {{ inputs.storyName | pascal }}.stories.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */
import React from 'react';

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';

import { {{ inputs.storyName | pascal }}, I{{ inputs.storyName | pascal }}Props } from './{{ inputs.storyName | pascal }}';

export default {
  title    : '{{ inputs.projectName | replace "-" " " | pascal }}/{{ inputs.layer }}/{{ inputs.storyName | pascal }}',
  component: {{ inputs.storyName | pascal }}
} as Meta;

const Template: Story<I{{ inputs.storyName | pascal }}Props> = (args: any) => <{{ inputs.storyName | pascal }} {...args} />;

export const Primary = Template.bind({});

```

# `{{ inputs.projectName }}/{{ inputs.layer }}/{{ inputs.storyName | pascal }}.tsx`

```typescript
/**
 * @file {{ inputs.storyName | pascal }}.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */
import React from 'react';

export interface I{{ inputs.storyName | pascal }}Props {}


/**
 * Primary UI component for user interaction
 */
export const {{ inputs.storyName | pascal }} = (props: I{{ inputs.storyName | pascal }}Props): JSX.Element => {
  return (<></>);
};

```
