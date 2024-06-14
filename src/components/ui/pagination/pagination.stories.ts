import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    currentPage: 2,
    onPageChange: () => {},
    pageSize: 10,
    siblingCount: 1,
    totalCount: 300,
  },
}
