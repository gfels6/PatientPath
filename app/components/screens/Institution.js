import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class Institution extends React.Component {

    render() {
    return (
            <View style={styles.container}>
                <Text style={styles.text}> Institution </Text>
            </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    text: {
        color: '#000',
    },
});

