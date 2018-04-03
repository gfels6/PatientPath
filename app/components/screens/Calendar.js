import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class Calendar extends React.Component {

    render() {
    return (
            <View style={styles.container}>
                <Text style={styles.text}> Calendar </Text>
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

