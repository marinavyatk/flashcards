import type { Meta, StoryObj } from '@storybook/react'

import { AppPagination } from '@/components/layouts/appPagination/appPagination'

const meta = {
  component: AppPagination,
  tags: ['autodocs'],
  title: 'Components/PaginationApp',
} satisfies Meta<typeof AppPagination>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    paginationProps: {
      currentPage: 2,
      onPageChange: () => {},
      siblingCount: 1,
      totalCount: 300,
    },
  },
}
