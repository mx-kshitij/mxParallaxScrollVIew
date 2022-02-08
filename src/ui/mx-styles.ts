import { TextStyle, ViewStyle, StyleSheet } from "react-native";
import { Style } from "@mendix/pluggable-widgets-tools";

export interface StyleProps {
    fixedHeaderHeight: number;
    parallaxHeaderHeight: number;
    contentHeaderHeight: number;
}
export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
    styleProps: StyleProps;
}

export const createMendixStyles = (props: StyleProps) =>
    StyleSheet.create({
        image: {
            width: "100%",
            height: "100%"
        },
        fixedHeader: {
            height: props.fixedHeaderHeight,
            width: "100%",
            justifyContent: "center"
        },
        stickyHeader: {
            height: props.fixedHeaderHeight,
            width: "100%",
            zIndex: 2
        },
        stickyHeaderBackground: {
            backgroundColor: "purple"
        },
        content: {
            width: "100%",
            height: "auto",
            flex: 1
        }
    });
