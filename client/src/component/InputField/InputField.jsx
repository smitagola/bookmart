import { TextField } from "@mui/material"

const InputField = (props) => {
    const { variant, size } = props;
    return(
        <>
            <TextField 
                variant={variant}
                size={size}
            />
        </>
    )
}
export default InputField