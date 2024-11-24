import { Platform, SafeAreaView, StatusBar } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { SafeAreaViewProps } from "react-native-safe-area-context";

const SafeAreaViewComp: FC<SafeAreaViewProps> = ({ children, ...props }) => {
    const { style, ...rest } = props;
    const [statusBarHeight, setStatusBarHeight] = useState(StatusBar.currentHeight || 0);

    useEffect(() => {
        // Set status bar height only once or monitor changes if necessary
        if (Platform.OS === "android") {
            setStatusBarHeight(StatusBar.currentHeight || 0);
        }
    }, []);

    console.log(StatusBar.currentHeight)
    
    return (
        <SafeAreaView
            style={[
                {
                    paddingTop: Platform.OS === "android" ? statusBarHeight + 10 : 0,
                    paddingHorizontal: 14,
                    paddingBottom: 20
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </SafeAreaView>
    );
};

export default SafeAreaViewComp;
