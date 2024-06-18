import type { Meta, StoryObj } from '@storybook/react'

import Cover from '@/assets/defaultDeckCover.png'
import DeleteIcon from '@/assets/svg/binIcon.svg?react'
import EditIcon from '@/assets/svg/editIcon.svg?react'
import PlayIcon from '@/assets/svg/playIcon.svg?react'
import Star from '@/assets/svg/ratingStar.svg?react'
import StarEmpty from '@/assets/svg/ratingStarEmpty.svg?react'
import { Table } from '@/components/ui/table/table'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    tbody: (
      <>
        <tr>
          <td>
            <img alt={'deck cover'} src={Cover} />
          </td>
          <td>Deck name</td>
          <td>Sort</td>
          <td>Name</td>
          <td>
            <Star />
            <Star />
            <Star />
            <Star />
            <StarEmpty />
          </td>
          <td>
            <PlayIcon />
            <EditIcon />
            <DeleteIcon />
          </td>
        </tr>
      </>
    ),
    thead: (
      <tr>
        <th>Cover</th>
        <th>Deck name</th>
        <th>Sort</th>
        <th>Name</th>
        <th>Rating</th>
        <th>Actions</th>
      </tr>
    ),
  },
}
