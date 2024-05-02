import OutIcon from '@/assets/svg/icon-out.svg?react'
import { Button } from '@/components/ui/button'
import { CheckboxComponent } from '@/components/ui/checkbox'

export function App() {
  return (
    <div>
      Hello123
      <CheckboxComponent checked label={'Checkbox Checked'} />
      <CheckboxComponent checked={false} label={'Checkbox неChecked'} title={'checkbox'} />
      <Button>
        <OutIcon /> Кнопочка
      </Button>
      <Button as={'a'}>
        <OutIcon /> Кнопочка
      </Button>
    </div>
  )
}
