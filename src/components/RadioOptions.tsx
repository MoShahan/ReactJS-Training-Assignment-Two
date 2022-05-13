import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { RadioOptionsProps } from '../types'

const RadioOptions = ({ options, value, handleChange }: RadioOptionsProps) => {
    // console.log("Radio Options == ", options)
    // options.map((option) => {
    //     console.log("option == " + option)
    // })
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={value}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <FormControlLabel
                        // key={option}
                        key={option[0]}
                        // value={option}
                        value={option[0] + "," + option[1]}
                        control={<Radio />}
                        // label={option}
                        label={option[0]}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioOptions