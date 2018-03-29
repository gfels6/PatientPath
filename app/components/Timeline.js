import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

export default class Timeline extends Component {
  constructor() {
    super();

    this.renderRow = this.renderRow.bind(this);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'row 1',
        'row 2',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut venenatis felis. Donec at tempus neque. Morbi vitae sem et nisi porta ornare. Cras at venenatis tellus. Curabitur consequat lacinia lacus, et luctus tortor dignissim nec. Suspendisse scelerisque aliquet vehicula. Integer at ante elit.',
        'Suspendisse potenti. Proin varius risus ac venenatis elementum. Morbi fringilla ante et nibh accumsan, ultricies tempor est porta. Nunc molestie neque a efficitur posuere. Nunc egestas, massa vitae hendrerit feugiat, ligula sem ullamcorper ante, quis ultricies quam turpis ac lectus. Praesent luctus, sapien imperdiet sagittis iaculis, nibh lacus convallis velit, sed placerat enim justo ornare tortor. Phasellus sed dui id odio lobortis imperdiet. Duis sollicitudin tellus sed eros commodo ultrices. Donec auctor nunc id quam suscipit, tempus tincidunt elit placerat. Sed nec odio vel ligula maximus varius. Nullam vulputate augue non gravida lacinia. Nam ac lobortis libero, id sollicitudin nulla.']),
    };
  }

  renderRow(rowData, section, row) {
    const total = this.state.dataSource.getRowCount();
    const topLineStyle = row == 0 ? [styles.topLine, styles.hiddenLine] : styles.topLine;
    const bottomLineStyle = row == total - 1 ? [styles.bottomLine, styles.hiddenLine] : styles.bottomLine;

    return (
      <View style={styles.row}>
        <View style={styles.timeline}>
          <View style={styles.line}>
            <View style={topLineStyle} />
            <View style={bottomLineStyle} />
          </View>
          <View style={styles.dot} />
        </View>
        <View style={styles.content}>
          <Text>{rowData}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  row: {
    padding: 4,
    paddingLeft: 0,
  },
  content: {
    marginLeft: 40,
  },
  timeline: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 40,
    justifyContent: 'center', // center the dot
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    top: 0,
    left: 18,
    width: 4,
    bottom: 0,
  },
  topLine: {
    flex: 1,
    width: 4,
    backgroundColor: 'black',
  },
  bottomLine: {
    flex: 1,
    width: 4,
    backgroundColor: 'black',
  },
  hiddenLine: {
    width: 0,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'black',
  },
});