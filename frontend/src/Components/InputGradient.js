import { LinearGradient } from "expo-linear-gradient"
import AppColors from "../styles/AppColors"

export default function InputGradient({children}){
    return(
        <LinearGradient
            colors={[AppColors.background, AppColors.accent]}
            start={[.8,0]}
            end={[.83,1]}
        >
            {children}
        </LinearGradient>
    )
}