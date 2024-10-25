import { StyleSheet } from "react-native";
import AppColors from "./AppColors";

const GlobalStyling = StyleSheet.create({
    text: {
        fontSize: 24,
        color: AppColors.text,
        textAlign: "center",
    },
    header: {
        fontSize: 42,
        textAlign: "center",
        color: AppColors.text,
    },
    headerAccent: {
        fontSize: 42,
        textAlign: "center",
        color: AppColors.accent,
    },
})

export default GlobalStyling;