import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import type { InputBaseProps } from "@mui/material";

//TODO: remove if it's not needed
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    position: "relative",
    border: "1px solid #fff",
    padding: "10px 26px 10px 0px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    fontSize: "20px",
    fontWeight: 500,
    "&:focus": {
      border: "1px solid #fff",
      backgroundColor: "rgba(25, 118, 209, 0.08)",
      borderRadius: 10,
    },
    "&::placeholder": {
      color: "black",
      opacity: 1,
      position: "absolute",
      top: 5,
      left: 0,
      fontSize: "20px",
      fontWeight: 500,
      ml: 10,
    },
  },
}));

type CustomInputProps = InputBaseProps & {
  name?: string;
  placeholder?: string;
  onChange?: () => void;
  endAdornment?: React.JSX.Element;
  defaultValue?: string;
};

const CustomInput = ({
  name,
  placeholder,
  onChange,
  endAdornment,
  defaultValue,
  ...rest
}: CustomInputProps) => {
  return (
    <BootstrapInput
      fullWidth
      id={name}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      endAdornment={endAdornment}
      {...rest}
    />
  );
};

export default CustomInput;
