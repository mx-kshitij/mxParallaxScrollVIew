import { createElement, ReactNode, useCallback } from "react";

import { ParallaxScrollView } from "./components/ParallaxScrollView";
import { MxParallaxScrollViewProps } from "../typings/MxParallaxScrollViewProps";

import { Animated, View, SafeAreaView } from "react-native";
import { createMendixStyles, CustomStyle, StyleProps } from "./ui/mx-styles";

const MxParallaxScrollView = ({
    parallaxHeaderHeight,
    fixedHeaderHeight,
    contentHeaderHeight,
    content,
    parallaxHeader,
    fixedHeader
}: MxParallaxScrollViewProps<CustomStyle>): ReactNode => {
    const styleProps: StyleProps = { parallaxHeaderHeight, fixedHeaderHeight, contentHeaderHeight };
    const styles = createMendixStyles(styleProps);

    const renderParallaxHeader = useCallback(() => <View>{parallaxHeader}</View>, [parallaxHeader]);
    const renderFixedHeader = useCallback(
        () => <View style={styles.fixedHeader}>{fixedHeader}</View>,
        [fixedHeader, styles.fixedHeader]
    );

    const renderStickyHeader = useCallback(
        (value: Animated.Value) => {
            const opacity = value.interpolate({
                inputRange: [0, 150, 200],
                outputRange: [0, 0, 1],
                extrapolate: "clamp"
            });
            return (
                <View style={styles.stickyHeader}>
                    <Animated.View style={[styles.stickyHeaderBackground, { opacity }]} />
                </View>
            );
        },
        [styles.stickyHeader, styles.stickyHeaderBackground]
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ParallaxScrollView
                style={{ flex: 1 }}
                parallaxHeaderHeight={parallaxHeaderHeight}
                stickyHeaderHeight={fixedHeaderHeight}
                parallaxHeader={renderParallaxHeader}
                fixedHeader={renderFixedHeader}
                stickyHeader={renderStickyHeader}
                styleProps={styleProps}
            >
                <View style={styles.content}>{content}</View>
            </ParallaxScrollView>
        </SafeAreaView>
    );
};

MxParallaxScrollView.displayName = "MxParallaxScrollView";

export { MxParallaxScrollView };
