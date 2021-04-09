/**
 * @file SideMenuSimpleItem.stories.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import React from 'react';
import { MemoryRouter } from 'react-router';

import AllInboxIcon from '@material-ui/icons/AllInbox';
import { Meta, Story } from '@storybook/react/types-6-0';

import { ISideMenuItemSimpleProps, SideMenuSimpleItem } from './SideMenuSimpleItem';

export default {
  title    : 'Common/L1/SideMenuItem',
  component: SideMenuSimpleItem
} as Meta;

const Template: Story<ISideMenuItemSimpleProps> = (args: any) =>
  <MemoryRouter initialEntries={['/', 'posts']}>
    <SideMenuSimpleItem {...args} />
  </MemoryRouter>;

export const Primary = Template.bind({});
Primary.args = {
  title      : 'サーバー',
  routingPath: '/server',
  icon       : AllInboxIcon
};
