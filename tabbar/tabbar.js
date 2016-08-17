import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { colors } from '../../_styles/base';
import Tab from './tab';
import TabCard from './tab_card';

class Tabbar extends Component {

  constructor(props, context) {
    super(props, context);

    let { children } = props;
    let tabViews = {};

    for (let i=0; i < children.length; i++) {
      tabViews[children[i].props.title] = false;
    }

    this.state = {
      selectedTabIndex: -1,
      tabViews
    }
  }

  toggleTab(i) {
    if (i === this.state.selectedTabIndex) {
      // deselect tab
      // on render a prop will set view to close
      this.setState({
        selectedTabIndex: -1
      });
    } else {
      // select tab and set view to show
      this.setState({
        selectedTabIndex: i,
        tabViews: {
          ...this.state.tabViews,
          [this.props.children[i].props.title]: true
        }
      });
    }
  }

  // unselect the tab
  // only set to negative one if it is the tab selected
  // prevents it from being set to -1 if another tab had already been selected
  closeTab(tab) {
    if (this.state.selectedTabIndex === this.props.children.indexOf(tab)) {
      this.setState({ selectedTabIndex: -1 });
    }
  }

  // once the modal is done animating out it calls closeTab
  // this unmounts the component by setting it to false in tabViews
  unmountTab(tab) {
    this.setState({
      tabViews: {
        ...this.state.tabViews,
        [tab.props.title]: false
      }
    });
  }

  // Its possible two tabs will be shown at the same time
  // one animating in and one animating out, so we need to keep both rendered
  renderSelectedTab(selectedTab) {
    let viewsShown = this.props.children.filter((tab) => this.state.tabViews[tab.props.title]);
    let views = viewsShown.map((tab) =>
      <TabCard
        key={tab.props.title}
        style={_styles.contentContainer}
        active={tab === selectedTab}
        closeTab={() => this.closeTab(tab)}
        afterCloseTab={() => this.unmountTab(tab)}
      >
        {tab.props.component}
      </TabCard>
    );

    return views;
  }

  render() {
    const selectedTab = this.props.children[this.state.selectedTabIndex];
    const childrenWithProps = React.Children.map(this.props.children,
      (child, i) =>  React.cloneElement(child, {
        selected: child === selectedTab,
        onPress: (e) => this.toggleTab(i)
      })
    );

    return (
      <View style={_styles.container}>
        <View style={_styles.rootContainer}>
          {this.props.rootComponent}
        </View>
        <View style={_styles.tabContainer}>
          {childrenWithProps}
        </View>
        {this.renderSelectedTab(selectedTab)}
      </View>
    );
  }
}

Tabbar.Tab = Tab;
export default Tabbar;

const _styles = {
  container: {
    flex: 1,
    paddingTop: 64
  },
  tabContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 5,
    paddingTop: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff'
  }
};
