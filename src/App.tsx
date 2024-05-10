import TextareaAutosize from 'react-textarea-autosize'

import OutIcon from '@/assets/svg/icon-out.svg?react'
import { Button } from '@/components/ui/button'
import { CheckboxComponent } from '@/components/ui/checkbox'
import { TextField } from '@/components/ui/textField'

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
      <div style={{ width: '300px' }}>
        <TextField />
        <TextField label={'email'} placeholder={'email address'} />
        <TextField variant={'password'} />
        <TextField
          errorMessage={'eeeeerrrrrrrrooor!!!!'}
          label={'error input'}
          variant={'password'}
        />
        <TextField variant={'search'} />
        <TextField disabled placeholder={'disabled'} variant={'search'} />
        <TextField disabled placeholder={'disabled'} variant={'password'} />
        <TextField as={'textarea'} placeholder={'textarea'} />
        <TextField
          as={TextareaAutosize}
          placeholder={
            'textarea from special library textarea from special librarytextarea from special library'
          }
        />
      </div>
    </div>
  )
}
