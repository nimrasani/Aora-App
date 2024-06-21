import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";
import { router, usePathname } from "expo-router";

export default function SearchInput({ initialQuery }) {
  const [showPassword, setShowPassword] = useState(false);
  const [query, setQuery] = useState(initialQuery || "");
  const pathname = usePathname(false);
  return (
    <>
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary items-center flex-row space-x-4">
        <TextInput
          value={query}
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          placeholder={"Search for a video topic"}
          placeholderTextColor={"#cdcde0"}
          onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
          onPress={() => {
            if (!query) {
              return Alert.alert(
                "Missing Query",
                "Please enter something to search results across database"
              );
            }

            if (pathname.startsWith("/search")) {
              router.setParams({ query });
            } else {
              router.push(`/search/${query}`);
            }
          }}
        >
          <Image
            className="w-5 h-5"
            source={icons.search}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
