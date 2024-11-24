import { Children, ReactNode } from "react"
import { StyleProp, View, ViewStyle } from "react-native"

const ThemeView = ({children, style}: {children: ReactNode, style?: StyleProp<ViewStyle>}) => {
    return (
        <View style={[{backgroundColor: "#141c26", flex: 1}, style]}>
            {children}
        </View>
    )
}

export default ThemeView