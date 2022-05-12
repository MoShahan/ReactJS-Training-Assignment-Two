import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { CheckboxOptionsProps } from '../types'

const CheckboxOptions = ({ options, handleChange }: CheckboxOptionsProps) => {
    return (
        <FormGroup>
            {options.map((option: any) => (
                <FormControlLabel
                    key={option.option}
                    name={option.option+" "+option.isCorrect}
                    // name={option.option}
                    onChange={handleChange}
                    control={<Checkbox checked={option.value || false} />}
                    label={option.option}
                />
            ))}
        </FormGroup>
    )
}

export default CheckboxOptions