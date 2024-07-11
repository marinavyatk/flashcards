import type { Meta, StoryObj } from '@storybook/react'

import { LoaderLine } from '@/components/ui/loaderLine/loaderLine'

const meta = {
  component: LoaderLine,
  tags: ['autodocs'],
  title: 'Components/LoaderLine',
} satisfies Meta<typeof LoaderLine>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
