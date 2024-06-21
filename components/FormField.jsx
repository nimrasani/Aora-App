import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";

export default function FormField({
  title,
  value,
  placeholder,
  handleChageText,
  otherStyles,
  keyboardType,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-gray-100 font-medium">{title}</Text>

        <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary items-center flex-row">
          <TextInput
            value={value}
            className="flex-1 text-white text-base font-psemibold"
            placeholder={placeholder}
            placeholderTextColor={"#7b7b8b"}
            onChangeText={handleChageText}
            secureTextEntry={title === "Password" && !showPassword}
          />

          {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                className="w-6 h-6"
                source={!showPassword ? icons.eye : icons.eyeHide}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}
