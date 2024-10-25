import { StyleSheet, View, TextInput } from "react-native";
import InputGradient from "./InputGradient";
import AppColors from "../styles/AppColors";

export default function TextFieldStyled({placeholder, value, onChangeText, keyboardType, secureTextEntry}) {
    return(
        <View style={styles.container}>  
            <InputGradient>
                <TextInput
                    style={styles.textField}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={AppColors.placeholder}
                />
            </InputGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignSelf: 'center',
        width: '70%',
        display: 'flex',
        justifyContent: 'space-between',
        color: AppColors.text,
        borderWidth: 1,
        borderColor: AppColors.accent,
        overflow: 'hidden',
        marginBottom: 15,
        elevation: 5,
    },
    textField: {
        color: AppColors.text,
        borderRadius: 50,
        padding: 3,
        fontSize: 30,
        textAlign: 'center',
        boxShadow: '5px 5px 5px black',
    }
});