import { StyleSheet, Image, View } from 'react-native';
import { useAssets } from 'expo-asset';

// import icon from '../assets/ProfileIcon.png'

export default function ProfileImage(){
    const [assets, error] = useAssets([require('../assets/ProfileIcon.png')]);

    return(
        <>
            <View style={styles.container}>
              <Image source={assets ? assets[0] : ''} alt='profile icon' style={styles.image}/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 20,
      elevation: 10,
    },
    image: {
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 20,
    },
});