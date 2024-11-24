import ScreenContainer from "@/components/primary/ScreenContainer"
import ThemeText from "@/components/primary/ThemeText"
import { AntDesign } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

const SettingsIndex = React.memo(() => {
    const router = useRouter()

    return (
        <ScreenContainer scroll>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "white"}}>
                <View>
                    <ThemeText style={{fontSize: 20}}>Caleb</ThemeText>
                    <ThemeText>Carpe Diem</ThemeText>
                </View>
                <AntDesign name="plus" size={24} color={"white"} />
            </View>
            <Pressable android_ripple={{color: "grey"}} style={{paddingVertical: 14}} onPress={() => router.push("/(settings)/account")}>
                <ThemeText>Account</ThemeText>
                <ThemeText style={{color: "grey"}}>Security, notifications, chnage number</ThemeText>
            </Pressable>
            <Pressable android_ripple={{color: "grey"}} style={{paddingVertical: 14}} onPress={() => router.push("/(settings)/privacy")}>
                <ThemeText>Privacy</ThemeText>
                <ThemeText style={{color: "grey"}}>Block contacts, disappearing messages</ThemeText>
            </Pressable>
            <Pressable android_ripple={{color: "grey"}} style={{paddingVertical: 14}} onPress={() => router.push("/(settings)/avatar")}>
                <ThemeText>Avatar</ThemeText>
                <ThemeText style={{color: "grey"}}>Create, edit, profile photo</ThemeText>
            </Pressable>

        </ScreenContainer>
    )
})

export default SettingsIndex