import { ReactNode } from "react"
import { StyleProp, Text, TextStyle } from "react-native"

const ThemeText = ({children, style}: {children: ReactNode, style?: StyleProp<TextStyle>}) => {
    return (
        <Text style={[{color: "white"}, style]}>
            {children}
        </Text>
    )
}

export default ThemeText