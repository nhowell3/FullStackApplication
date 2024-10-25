import { Pressable, Text, StyleSheet, View } from "react-native"
import InputGradient from "./InputGradient"
import AppColors from "../styles/AppColors"

export default function ButtonStyled({title, onPress}){
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <InputGradient>
                    <Text style={styles.button}>{title}</Text>
                </InputGradient>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignSelf: 'center',
        width: '70%',
        display: 'flex',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: AppColors.accent,
        overflow: 'hidden',
        borderRadius: 50,
        marginBottom: 15,
        elevation: 5,
    },
    button: {
        color: AppColors.text,
        borderRadius: 50,
        padding: 3,
        fontSize: 30,
        textAlign: 'center',
    }
})