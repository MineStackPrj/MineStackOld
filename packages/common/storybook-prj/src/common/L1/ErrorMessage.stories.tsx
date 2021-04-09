/**
 * @file ErrorMessage.stories.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import React from 'react';

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';

import ErrorMessage, { IErrorMessageProps } from './ErrorMessage';

export default {
  title    : 'Common/L1/ErrorMessage',
  component: ErrorMessage
} as Meta;

const Template: Story<IErrorMessageProps> = (args: any) => <ErrorMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'Error Message'
};
