import { StyleSheet, Text } from "react-native";

import GlobalStyling from "../styles/GlobalStyling";

export default function PersonalizedGreeting( {userData, greeting} ){
    return (
        <>
            <Text style={GlobalStyling.headerAccent}>{greeting}</Text>
            <Text style={GlobalStyling.header}>{userData.username}</Text>
        </>
    );
}


