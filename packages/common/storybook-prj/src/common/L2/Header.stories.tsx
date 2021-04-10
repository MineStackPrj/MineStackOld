/**
 * @file Header.stories.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */
import React from 'react';

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';

import { Header, IHeaderProps } from './Header';

export default {
  title    : 'Common/L2/Header',
  component: Header
} as Meta;

const Template: Story<IHeaderProps> = (args: any) => <Header {...args} />;

export const LoginHeader = Template.bind({});
export const NormalHeader = Template.bind({});
NormalHeader.args = {
  isSignIn: true
};
