import { FC } from "react"
import { Text, Pressable } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import SafeAreaViewComp from "../Safeareaviewcomp"
import type {NativeStackHeaderProps} from "@react-navigation/native-stack"

const CustomHeader:FC<NativeStackHeaderProps & {title?: string}> = ({route, navigation, title}) => {
    console.log(route)
    console.log("LLO") 
  return (
    <SafeAreaViewComp style={{flexDirection: "row", gap: 13, backgroundColor: "#0d142b", alignItems: "flex-end"}}>
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={20} color={"white"} />
      </Pressable>
      <Text style={{ color: "white", fontSize: 20}}>{title ?? route?.name}</Text>
    </SafeAreaViewComp>
  )
}

export default CustomHeader