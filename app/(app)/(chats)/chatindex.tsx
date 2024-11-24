import ScreenContainer from "@/components/primary/ScreenContainer"
import { Pressable, ScrollView, TextInput, View } from "react-native"
import { useRouter } from "expo-router"
import React, { useRef } from "react"
import ThemeText from "@/components/primary/ThemeText"

const IndexChatScreen = React.memo(() => {
    const router = useRouter()
    const inputRef = useRef<TextInput>(null)
    
    return (
        <ScreenContainer>
            <TextInput ref={inputRef} style={{borderColor: "grey", color: "white", height: 35, borderRadius: 20, borderWidth: 1, paddingHorizontal: 14}} />
            <View style={{marginTop: 20}}>
                <ThemeText>Chat Screen Page</ThemeText>
                <ThemeText>Chats list</ThemeText>
                <ThemeText>User 1</ThemeText>
                <ThemeText>Message: my name is john</ThemeText>
                <ThemeText>User 1</ThemeText>
                <ThemeText>Message: my name is john</ThemeText> 
                <Pressable onPress={() => router.push("/(app)/(chats)/chatbox")} style={{backgroundColor: "grey", paddingVertical: 10, flexDirection: "row", gap: 10}}>
                    <View style={{width: 25, height: 25, backgroundColor: "red", borderRadius: 10}} />
                    <View>
                        <ThemeText>Study</ThemeText>
                        <ThemeText>Will: Hello bro how far that stuff</ThemeText>
                    </View>
                </Pressable>
            </View>
        </ScreenContainer>
    )
})

export default IndexChatScreen