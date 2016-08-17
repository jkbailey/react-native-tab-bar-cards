import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../_styles/base';

export default class Tab extends Component {

  render() {
    return (
      <View style={this.props.selected ? _styles.selectedTab : _styles.unselectedTab}>
        <TouchableOpacity style={_styles.tab} onPress={this.props.onPress} activeOpacity={0.6}>
          <Text style={_styles.tabText} allowFontScaling={false}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const _styles = {
  tab: {
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  unselectedTab: {
    opacity: .6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedTab: {
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1
  }
};
