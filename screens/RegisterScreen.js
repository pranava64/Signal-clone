import { View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

//
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={tw`flex-1 items-center justify-center p-5`}>
      <StatusBar style="light" />
      <Text h4 style={{ marginBottom: 50, textAlign: "center" }}>
        Create a Signal account Now!
      </Text>

      <View style={tw`w-full`}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          autoFocus
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={tw`w-48`}
        raised
        title="Register"
        onPress={register}
      />
      <View style={{ height: 20 }}></View>
    </View>
  );
};

export default RegisterScreen;
