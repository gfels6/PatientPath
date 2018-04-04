import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig, } from 'react-native-calendars';

LocaleConfig.locales['de'] = {
    monthNames: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    monthNamesShort: ['Jan.','Feb.','März','April','Mai','Juni','Jul.','Aug.','Sept.','Okt.','Nov.','Dez.'],
    dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
    dayNamesShort: ['So.','Mo.','Di.','Mi.','Do.','Fr.','Sa.']
  };
  
  LocaleConfig.defaultLocale = 'de';

export default class Cal extends React.Component {

    render() {
    return (
            <View style={styles.container}>
                <Text style={styles.text}> Here comes the calendar. </Text>
                <Calendar
                        style={styles.calendar}
                        current={'2018-04-04'}
                        minDate={'2018-01-01'}
                        maxDate={'2018-12-31'}
                        showWeekNumbers={true}
                        firstDay={1}
                        markedDates={{
                            '2018-04-07': {marked: true},
                            '2018-04-09': {marked: true, dotColor: 'green'},
                            '2018-04-10': {marked: true, dotColor: 'red'},
                            '2018-04-14': {marked: true},
                            '2018-04-19': {disabled: true, activeOpacity: 0}
                        }}
                        // disabledByDefault={true}
                        hideArrows={true}
                        />
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

