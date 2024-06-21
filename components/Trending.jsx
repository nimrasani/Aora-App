import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import WebView from "react-native-webview";
import { VideoView, useVideoPlayer } from "expo-video";

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1.1 },
};
const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <>
          {/* <WebView
            className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
            allowsFullscreenVideo
            scrollEnabled={false}
            automaticallyAdjustContentInsets
            source={{
              html: `
            <html>
              <body>
              <div>
                <iframe src="${item.video}" style="position:absolute;top:0;left:0;width:100%;height:90%;" 
                        frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
              </div>
              
              <script src="https://player.vimeo.com/api/player.js"></script>
              </body>
            </html>
          `,
            }}
          /> */}

          <WebView
            source={{ uri: item.video }} // Replace with the desired website URL
            // style={{ width: '100%', height: '100%' }} // Set width and height to match the screen dimensions
            className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          />

          {/* <Video
            //source={{ uri: item.video }}
            // source={{
            //   uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            // }}
            className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              // console.log("play status", status);
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          /> */}

        </>
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black-40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default function Trending({ posts }) {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      horizontal
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
    />
  );
}
