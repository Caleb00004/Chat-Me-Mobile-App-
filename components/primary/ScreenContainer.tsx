import { ReactNode } from "react"
import { ScrollView, StyleProp, View, ViewStyle } from "react-native"

const ScreenContainer = ({children, style, scroll}: {children: ReactNode, style?: StyleProp<ViewStyle>, scroll?: boolean}) => {
    return (
        scroll ? 
            <ScrollView style={[{paddingHorizontal: 14, flex: 1, backgroundColor: "#141c26"}, style]}>
                {children}
            </ScrollView> : 
            <View style={[{paddingHorizontal: 14, flex: 1, backgroundColor: "#141c26"}, style]}>
                {children}
            </View>
    )
}

export default ScreenContainer