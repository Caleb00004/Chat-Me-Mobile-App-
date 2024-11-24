import React, { useEffect, useRef, useState } from "react"
import { Button, Image, Pressable, Text, View } from "react-native"
import { CameraView, CameraType, useCameraPermissions, CameraMode, useMicrophonePermissions } from "expo-camera"
import ThemeView from "@/components/primary/ThemeView";
import ThemeText from "@/components/primary/ThemeText";
import { AntDesign, FontAwesome5, FontAwesome6, Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Video } from "expo-av";
// import {ex} from "expo-av"
// For the camara and video functionlaities
// install expo-camer: npx install expo-camera [will handle video and video recording functionalities] after installing, adding something to app.json plugins check docs
// Remeber to request for permissions first (camera and audio) - use the useCameraPermissions hook
// Install expo-av - provides functionality to play recorded videos. Note: after installing, will add something to app.json plugins check docs
// and i think gets audio permissions

const CameraScreen = React.memo(() => {
    const [facing, setFacing] = useState<CameraType>('back'); // [back or front] camera
    const [cameraMode, setCameraMode] = useState<CameraMode>("picture") // picture or video
    const [permission, requestPermission] = useCameraPermissions()
    const [micPermission, requestMicPermission] = useMicrophonePermissions()
    const cameraRef = useRef<CameraView>(null)
    const [photo, setPhoto] = useState(null);
    const [video, setVideo] = useState(null)
    const [isRecording, setIsRecording] = useState(false)
    const [flash, setFlash] = useState(false)
    const [cameraZoom, setCameraZoom] = useState(0)
    const zoomTranslateY = useSharedValue(-20)
    const zoomOpacity = useSharedValue(0)

    const rZoombtn = useAnimatedStyle(() => {
        return {
            transform: [{translateY: withTiming(zoomTranslateY.value)}], opacity: zoomOpacity.value
        }
    })

    useEffect(() => {
        zoomTranslateY.value = withSpring(0, {duration: 500})
        zoomOpacity.value = withTiming(1, {duration: 1500})
    },[])

    if (!permission || !micPermission) {
        // Camera permissions are still loading.
        return <View />
    }

    if (!permission.granted || !micPermission.granted) {
    // Camera permissions are not granted yet.
        return (
        <ThemeView style={{flex: 1}}>
            <ThemeText>We need your permission to show the camera</ThemeText>
            {!permission.granted && <Button onPress={requestPermission} title="grant permission" />}
            {!micPermission.granted && <Button onPress={requestMicPermission} title="Mic Permission" />}
        </ThemeView>
        );
    } 

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
    
    const handleCamera = async () => {
        if (cameraMode === "picture") {
            if (cameraRef.current) {
                const photo = await cameraRef.current?.takePictureAsync()
                console.log(photo?.uri)
                setPhoto(photo?.uri); // Save the photo URI
            }
        } else {
            if(cameraRef.current && !isRecording) {
                try {
                    setIsRecording(true)
                    const video = await cameraRef.current.recordAsync()
                    setVideo(video?.uri)
                    setIsRecording(false)
                } catch (error) {
                    console.error(error)
                    setIsRecording(false)
                }
            }
        }
    }

    const stopRecording = () => {
        if (cameraRef.current && isRecording) {
            cameraRef.current.stopRecording()
        }
    }

    const increaseZoom = () => {
        // setCameraZoom(prev => prev < 1 ? prev + 0.15 : 1)
        // setCameraZoom((prev) => Math.min(prev + 0.01, 1)); 
        if (cameraZoom < 1) {
            setCameraZoom((prevValue) => prevValue + 0.01);
        }

    }

    const decreaseZoom = () => {
        // setCameraZoom((prev) => Math.max(prev - 0.01, 0))
        // setCameraZoom(prev => prev > 0 ? prev - 0.15 : 0 )
        if (cameraZoom > 0) {
            setCameraZoom((prevValue) => prevValue - 0.01);
        }
    }

    return (
        <View style={{flex: 1}}>
            {photo ? 
                <View style={{flex: 1}}>
                    <Image source={{ uri: photo }} style={{ flex: 1}} />
                    <Button title="Retake" onPress={() => setPhoto(null)} />
                </View> :
            video ? 
                <View style={{flex: 1}}>
                    <Video
                        source={{uri: video}}
                        style={{flex: 1}}
                        useNativeControls
                    />
                </View> 
                : 
                    <CameraView 
                        mode={cameraMode}
                        zoom={cameraZoom}
                        // ratio="16:9"
                        // videoQuality="1080p"
                        enableTorch={flash ? true : false} 
                        ref={cameraRef} 
                        facing={facing} 
                        style={{flex: 1, paddingHorizontal: 14, paddingTop: 14}}
                    >
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Pressable onPress={() => setFlash(prev => !prev)}>
                                {flash ? <Ionicons name="flash"size={25}color={"white"} /> : <Ionicons name="flash-off"size={25}color={"white"} />}
                            </Pressable>
                            <Pressable onPress={toggleCameraFacing}>
                                <AntDesign size={25} color={"white"} name="camerao" />
                            </Pressable>
                        </View>
                        <View style={{gap: 15, alignSelf: "flex-end", marginTop: 15}}>
                            <Animated.View style={rZoombtn}>
                                <Pressable onPress={increaseZoom}>
                                    <Fontisto name="zoom-plus" size={25} color={"white"} />
                                </Pressable>
                            </Animated.View>
                            <Animated.View style={rZoombtn}>
                                <Pressable onPress={decreaseZoom}>
                                    <Fontisto name="zoom-minus" size={25} color={"white"} />
                                </Pressable>
                            </Animated.View>
                        </View>

                        <View style={{marginTop: "auto", alignSelf: "center", marginBottom: 20}}>
                            {cameraMode === "picture" ? 
                                <Pressable onPress={handleCamera}><Fontisto name="record" size={45} color={"white"}/></Pressable> :
                                <View style={{flexDirection: "row", gap: 13}}>
                                    <Pressable onPress={handleCamera} ><MaterialCommunityIcons name="record-circle-outline" color={"red"} size={45} /></Pressable>
                                    {isRecording && <Pressable onPress={stopRecording}><FontAwesome5 name="stop" size={45} color={"red"} /></Pressable>}
                                </View>
                            }
                        </View>
                        <View style={{flexDirection: "row", alignContent: "center", justifyContent: "center", gap: 10, marginBottom: 30}}>
                            <Pressable 
                                onPress={() => setCameraMode("video")} 
                                style={({pressed}) => [pressed && {backgroundColor: "grey"}, cameraMode === "video" && {backgroundColor: "grey"}, {borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2}]}
                            >
                                <Text style={{color: "white"}}>Video</Text>
                            </Pressable>
                            <Pressable 
                                onPress={() => setCameraMode("picture")} 
                                style={({pressed}) => [pressed && {backgroundColor: "grey"}, cameraMode === "picture" && {backgroundColor: "grey"} , {borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2}]}
                            >
                                <Text style={{color: "white"}}>Photo</Text>
                            </Pressable>
                        </View>
                    </CameraView>
            }
        </View>
    )
})

export default CameraScreen
