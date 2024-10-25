import { Switch } from "react-native";

export default function SwitchStyled({onValueChange, value}){
    return(
        <Switch
            onValueChange={onValueChange}
            value={value}
        />
    );
}