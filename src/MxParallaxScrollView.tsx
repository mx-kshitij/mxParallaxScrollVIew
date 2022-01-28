import React, {
  createElement,
} from "react";

import { Style } from "@mendix/pluggable-widgets-tools";

import { ParallaxScrollView } from "./components/ParallaxScrollView";
import { MxParallaxScrollViewProps } from "../typings/MxParallaxScrollViewProps";
// const ParallaxScrollView = require("./components/ParallaxScrollView");

import {
  Animated,
  View,
  SafeAreaView,
  StyleSheet,
  TextStyle,
  ViewStyle
} from 'react-native';

export interface CustomStyle extends Style {
  container: ViewStyle;
  label: TextStyle;
  styleProps: styleProps;
}

export interface styleProps {
  fixedHeaderHeight: number;
  parallaxHeaderHeight: number;
  contentHeaderHeight: number;
}

export class MxParallaxScrollView extends React.Component<MxParallaxScrollViewProps<CustomStyle>> {
  renderParallaxHeader = (_value: any, _styleProps: any) => {
    return (<View>{this.props.parallaxHeader}</View>)
  };

  renderFixedHeader = (_value: any, styleProps: any) => {
    return (
      <View style={Styles(styleProps).fixedHeader}>
        {this.props.fixedHeader}
      </View>
    );
  };

  renderStickyHeader = (value: any, styleProps: any) => {
    const opacity = value.interpolate({
      inputRange: [0, 150, 200],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={Styles(styleProps).stickyHeader}>
        <Animated.View style={[Styles(styleProps).stickyHeaderBackground, { opacity }]} />
      </View>
    );
  };

  render(): React.ReactNode {
    // const IHeight = 250;
    // const HeaderHeight = 50;
    const styleProps = {
      fixedHeaderHeight: this.props.fixedHeaderHeight,
      parallaxHeaderHeight: this.props.parallaxHeaderHeight,
      contentHeaderHeight: this.props.contentHeaderHeight
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ParallaxScrollView
          style={{ flex: 1 }}
          parallaxHeaderHeight={this.props.parallaxHeaderHeight}
          stickyHeaderHeight={this.props.fixedHeaderHeight}
          parallaxHeader={this.renderParallaxHeader}
          fixedHeader={this.renderFixedHeader}
          stickyHeader={this.renderStickyHeader}
          styleProps={styleProps}>
          <View style={Styles(styleProps).content}>
            {/* <Text>Content</Text> */}
            {this.props.content}
          </View>
        </ParallaxScrollView>
      </SafeAreaView>
    );
  }
}


const Styles = (props: styleProps) => StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  fixedHeader: {
    height: props.fixedHeaderHeight,
    width: '100%',
    // padding: 10,
    justifyContent: 'center',
  },
  stickyHeader: {
    height: props.fixedHeaderHeight,
    width: '100%',
    zIndex: 2
    // backgroundColor: 'rgba(0,0,0,0.4)',
  },
  stickyHeaderBackground: {
    //   ...StyleSheet.absoluteFill,
    backgroundColor: 'purple',
  },
  content: {
    width: '100%',
    height: 'auto',
    flex: 1
    // height: props.contentHeaderHeight,
    // padding: 20,
    // backgroundColor: 'green',
  },
});