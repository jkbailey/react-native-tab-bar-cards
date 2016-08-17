import React, { Component } from 'react';
import { View, Animated, Dimensions, ScrollView } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import { colors } from '../../_styles/base';

const deviceHeight = Dimensions.get('window').height;

export default class TabCard extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      offset: new Animated.Value(deviceHeight),
      top: 64,
      paddingTop: 0
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active && this.props.active === false) {
      this.closeTab();
    } else if (!prevProps.active && this.props.active === true) {
      this.openTab();
    }
  }

  componentDidMount() {
    this.openTab();
  }

  openTab() {
    dismissKeyboard();
    Animated.spring(this.state.offset, {
      toValue: 0,
      friction: 12,
      tension: 120
    })
    .start();
  }

  closeTab() {
    Animated.spring(this.state.offset, {
      toValue: deviceHeight,
      friction: 12,
      tension: 80
    })
    .start(() => !this.props.active && this.props.afterCloseTab());
  }

  handleScrollEnd(e) {
    if (e.nativeEvent.contentOffset.y < -10) {
      this.props.closeTab();
    }
  }

  handleScroll(e) {
    this.setState({
      top: Math.max(0, 64 - e.nativeEvent.contentOffset.y),
      paddingTop: Math.min(64, e.nativeEvent.contentOffset.y)
    });
  }

  render() {
    return (
      <Animated.View
        style={[_styles.card, {transform: [{translateY: this.state.offset}]}, {top: this.state.top}]}
        >
        <ScrollView
          ref="scrollView"
          scrollEventThrottle={16}
          style={{paddingTop: this.state.paddingTop}}
          onScroll={(e) => this.handleScroll(e)}
          onScrollEndDrag={(e) => this.handleScrollEnd(e)}
        >
        {this.props.children}
        </ScrollView>
      </Animated.View>
    )
  }

}

const _styles = {
  card: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: deviceHeight
  }
};
