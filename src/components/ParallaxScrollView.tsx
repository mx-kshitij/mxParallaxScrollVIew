import React, { createElement, ReactNode } from "react";
import { Animated, View } from "react-native";
import { styles } from "../ui/component-styles";

export interface ParallaxScrollViewProps {
    // name?: string;
    style?: any;
    parallaxHeaderHeight?: number;
    stickyHeaderHeight?: number;
    onScroll?: (value: number) => void;
    onSticky?: (state: boolean) => void;
    fixedHeader: () => ReactNode;
    parallaxHeader: () => ReactNode;
    stickyHeader: (value: Animated.Value) => ReactNode;
    // isSectionList?: any;
    scaleParallaxHeader?: boolean;
    onRef?: any;
    styleProps?: any;
}

export class ParallaxScrollView extends React.Component<ParallaxScrollViewProps> {
    static defaultProps = {
        scaleParallaxHeader: true
    };

    _animatedValue = new Animated.Value(0);
    opacity: any;

    constructor(props: any) {
        super(props);

        this._animatedValue.addListener(this.onScroll);
    }

    get stickyMarginTop(): number {
        const { parallaxHeaderHeight = 0, stickyHeaderHeight = 0 } = this.props;
        return Math.abs(parallaxHeaderHeight - stickyHeaderHeight);
    }

    onScroll: Animated.ValueListenerCallback = ({ value }) => {
        const { onScroll, onSticky, stickyHeaderHeight = 0 } = this.props;

        if (typeof onScroll === "function") {
            onScroll(value);
        }
        if (typeof onSticky === "function") {
            onSticky(value >= stickyHeaderHeight);
        }
    };

    renderParallaxHeader(): ReactNode {
        const { parallaxHeader, scaleParallaxHeader, parallaxHeaderHeight = 0 } = this.props;

        let animationStyle = null;
        if (scaleParallaxHeader) {
            const scaleValue = 5;
            const scale = this._animatedValue.interpolate({
                inputRange: [-parallaxHeaderHeight, 0],
                outputRange: [scaleValue * 1.5, 1],
                extrapolate: "clamp"
            });
            this.opacity = this._animatedValue.interpolate({
                inputRange: [0, 0.85 * parallaxHeaderHeight],
                outputRange: [1, 0],
                extrapolate: "clamp"
            });
            animationStyle = {
                transform: [{ scale }]
            };
        }

        return (
            <View>
                <Animated.View
                    style={[
                        styles.parallaxHeader,
                        animationStyle,
                        { height: parallaxHeaderHeight },
                        { opacity: this.opacity }
                    ]}
                >
                    <View style={{ zIndex: 2 }}>{parallaxHeader()}</View>
                </Animated.View>
            </View>
        );
    }

    render(): ReactNode {
        const { children, onRef, fixedHeader, stickyHeader, ...props } = this.props;

        const event = Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            y: this._animatedValue
                        }
                    }
                }
            ],
            { useNativeDriver: true }
        );

        return (
            <View style={{ flex: 1 }}>
                <Animated.ScrollView ref={onRef} {...props} onScroll={event} stickyHeaderIndices={[2]}>
                    {this.renderParallaxHeader()}
                    <View style={{ marginTop: this.stickyMarginTop, height: 1, zIndex: 1 }} />
                    {stickyHeader(this._animatedValue)}
                    {children}
                </Animated.ScrollView>
                <View style={styles.fixedHeader}>{fixedHeader()}</View>
            </View>
        );
    }
}

export default ParallaxScrollView;
