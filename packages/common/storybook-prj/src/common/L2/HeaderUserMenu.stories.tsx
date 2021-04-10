/**
 * @file HeaderUserMenu.stories.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */
import React from 'react';

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';

import { HeaderUserMenu } from './HeaderUserMenu';

export default {
  title    : 'Common/L2/HeaderUserMenu',
  component: HeaderUserMenu
} as Meta;

const Template: Story = (args: any) => <HeaderUserMenu {...args} />;

export const Default = Template.bind({});
