import React from "react"
import { SafeAreaView, StyleSheet, ScrollView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import AppColors from "../styles/AppColors"
import Gap from "./Gap"

export default function GenericPage({children}){
    return(
        <SafeAreaView style={styles.container}>
            <LinearGradient
            colors={[AppColors.background, AppColors.backgroundDarker]}
            style={styles.gradient}
            >
                <ScrollView style={styles.scrollView}>
                    <Gap size={150}/>
                    {children}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({  
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
    }
});