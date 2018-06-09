"use strict";

import React, { Component } from "react";
import {StyleSheet, ListView, Image, View, Text, TouchableOpacity, TouchableWithoutFeedback,} from "react-native";
import { StackNavigator, withNavigation } from 'react-navigation';
import { convertTime } from '../components/helper';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

const defaultCircleSize = 16;
const defaultCircleColor = "#007AFF";
const defaultLineWidth = 2;
const defaultLineColor = "#007AFF";
const defaultDotColor = "white";
const defaultInnerCircle = "none";

export default class Timeline extends Component {
  constructor(props) {
    super(props);

    this._renderRow = this._renderRow.bind(this);
    this.renderDetail = (this.props.renderDetail
      ? this.props.renderDetail
      : this._renderDetail
    ).bind(this);
    this.renderCircle = (this.props.renderCircle
      ? this.props.renderCircle
      : this._renderCircle
    ).bind(this);
    this.renderEvent = this._renderEvent.bind(this);

    this.state = {
      data: this.props.data,
      dataSource: ds.cloneWithRows(this.props.data),
      x: 0,
      width: 0,
      redCircle: null,
    };

    
  }

  calcNextAppo = () => {
    
    console.log("works");
    let closestDate = '';
    var currentDate = new Date();
    let tempCloseMs = 999999999999999;
    let rowId = null;

     for(let aid of this.state.dataSource._dataBlob.s1) {
        var tempDate = new Date(aid.startdate);
        
        if(tempDate.getTime() > currentDate) {
            var diff = tempDate.getTime() - currentDate.getTime();
            if (diff < tempCloseMs) {
                tempCloseMs = diff;
                rowId = aid.aid;
            }
        }
    }
    this.setState({redCircle: rowId})
  }

  routingToAppo = (data) => {
    //console.log(data.aid);
    //this.props.navigation.navigate({ routeName: 'Appointment',  params: { category: '2' } });
    this.props.callbackFromParent(data);
  } 

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      dataSource: ds.cloneWithRows(nextProps.data)
    });
    
  }

  componentWillMount() {
    this.calcNextAppo();
  }

   render() {
    
    return (
      <View style={[styles.container, this.props.style]}>
        <ListView
          ref="listView"
          style={[styles.listview, this.props.listViewStyle]}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          automaticallyAdjustContentInsets={false}
          {...this.props.options}
        />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    let content = null;

      content = (
        <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
          {this.renderEvent(rowData, sectionID, rowID)}
          {this.renderCircle(rowData, sectionID, rowID)}
        </View>
      );
    return <View key={rowID}>{content}</View>;
  }

  _renderEvent(rowData, sectionID, rowID) {
    const lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth;
    const isLast = this.props.renderFullLine ? !this.props.renderFullLine : this.state.data.slice(-1)[0] === rowData;
    let lineColor = isLast
      ? "rgba(0,0,0,0)"
      : rowData.lineColor ? rowData.lineColor : this.props.lineColor;
    let opStyle = null;

    
    var tempDate2 = new Date(rowData.startdate);
    var currentDate2 = new Date();

    if(tempDate2.getTime() < currentDate2.getTime()){
      lineColor = "rgb(169,169,169)";
    }
  

    opStyle = {
      borderColor: lineColor,
      borderLeftWidth: lineWidth,
      borderRightWidth: 0,
      marginLeft: 20,
      paddingLeft: 20
    };
    
    return (
      <View
        style={[styles.details, opStyle]}
        onLayout={evt => {
          if (!this.state.x && !this.state.width) {
            const { x, width } = evt.nativeEvent.layout;
            this.setState({ x, width });
          }
        }}
      >
        <TouchableOpacity
          disabled={this.props.onEventPress == null}
          style={[this.props.detailContainerStyle]}
          onPress={() =>
            this.props.onEventPress ? this.props.onEventPress(rowData) : null
          }
        >
          
          <View style={styles.detail}>
            {this.renderDetail(rowData, sectionID, rowID)}
          </View>
          
          
          {this._renderSeparator()}
        </TouchableOpacity>
      </View>
    );
  }

  _renderDetail(rowData, sectionID, rowID) {
    let name = !rowData.chklstid ? (
      <TouchableWithoutFeedback onPressIn={() => this.routingToAppo(rowData)}>
       <View>
        <View>
        <Text style={[styles.name, this.props.nameStyle]}>
          {rowData.name}
        </Text>
        <Text style={[styles.institution, this.props.institutionStyle]}>
          {rowData.institution.name}
        </Text>
        <Text style={[styles.date, this.props.dateStyle]}>
          {convertTime(rowData.startdate)}
        </Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
    ) : (
      <TouchableWithoutFeedback onPressIn={() => this.routingToAppo(rowData)}>
        <View>
          <View>
            <View style={[styles.horizontal, this.props.horizontalStyle]}>
              <Text style={[styles.name, this.props.nameStyle]}>
              {rowData.name}
              </Text>
              <View style={styles.checkListContainer}>
                <Image
                  source={require('../img/checklist.png')}
                  style={styles.icon}
                />
              </View>
            </View>
            <View>
              <Text style={[styles.institution, this.props.institutionStyle]}>
                {rowData.institution.name}
              </Text>
              <Text style={[styles.date, this.props.dateStyle]}>
              {convertTime(rowData.startdate)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
    return <View style={styles.container}>{name}</View>;
  }

  _renderCircle(rowData, sectionID, rowID) {
    console.log("In _renderCircle");
    console.log(this.state.redCircle);

    var circleSize = rowData.circleSize
      ? rowData.circleSize
      : this.props.circleSize ? this.props.circleSize : defaultCircleSize;
    var circleColor = rowData.circleColor
      ? rowData.circleColor
      : this.props.circleColor ? this.props.circleColor : defaultCircleColor;
    var lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth ? this.props.lineWidth : defaultLineWidth;

    var circleStyle = null;
    var tempDate = new Date(rowData.startdate);
    var currentDate = new Date();
    
    if(tempDate.getTime() < currentDate.getTime()){
      circleColor = "rgb(169,169,169)";
    }

    if(this.state.redCircle == rowData.aid){
      circleColor = "rgb(70,130,180)";
    }

    circleStyle = {
      width: this.state.x ? circleSize : 0,
      height: this.state.x ? circleSize : 0,
      borderRadius: circleSize / 2,
      backgroundColor: circleColor,
      left: this.state.x - circleSize / 2 + (lineWidth - 1) / 2
    };

    var innerCircle = null;
        let dotStyle = {
          height: circleSize / 2,
          width: circleSize / 2,
          borderRadius: circleSize / 4,
          backgroundColor: rowData.dotColor
            ? rowData.dotColor
            : this.props.dotColor ? this.props.dotColor : defaultDotColor
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;

    return (
      <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
        {innerCircle}
      </View>
    );
  }

  _renderSeparator() {
    if (!this.props.separator) {
      return null;
    }
    return <View style={[styles.separator, this.props.separatorStyle]} />;
  }
}

Timeline.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle,
  columnFormat: "single-column-left",
  separator: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listview: {
    flex: 1
  },
  sectionHeader: {
    marginBottom: 15,
    backgroundColor: "#007AFF",
    height: 30,
    justifyContent: "center"
  },
  sectionHeaderText: {
    color: "#FFF",
    fontSize: 18,
    alignSelf: "center"
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
    //alignItems: 'stretch',
    justifyContent: "center"
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    position: "absolute",
    left: -8,
    alignItems: "center",
    justifyContent: "center"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: defaultDotColor
  },
  name: {
    fontSize: 18,
    fontWeight: "bold"
  },
  details: {
    borderLeftWidth: defaultLineWidth,
    flexDirection: "column",
    flex: 1,
  },
  detail: { 
    paddingTop: 0, 
    paddingBottom: 10,
  },
  institution: {
    marginTop: 4,
    color: "#555",
    fontSize: 16,
  },
  date: {
    marginTop: 3,
    color: "#555",
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#a00",
    marginTop: 10,
    marginBottom: 10
  },
  horizontal: {
    flexDirection: "row",
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  icon: {
    width: 18,
    height: 18
  },
  checkListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  }
});
