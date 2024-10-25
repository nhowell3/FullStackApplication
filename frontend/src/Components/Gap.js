import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function Gap({size = 20}){
    const styles = StyleSheet.create({
        size:{
            height: size
        }
    })

    return (
        <View style={styles.size}>
        
        </View>
    );
}