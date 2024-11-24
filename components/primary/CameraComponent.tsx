

const CameraComponent = React.memo(() => {
    <CameraView 
        zoom={zoom} 
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
            <Pressable onPress={increaseZoom}>
                <Fontisto name="zoom-plus" size={25} color={"white"} />
            </Pressable>
            <Pressable onPress={decreaseZoom}>
                <Fontisto name="zoom-minus" size={25} color={"white"} />
            </Pressable>
        </View>
        <Pressable onPress={takePicture} style={{marginTop: "auto", alignSelf: "center", marginBottom: 20}}>
            <Fontisto name="record" size={45} color={"white"}/>
        </Pressable>
    </CameraView>

})