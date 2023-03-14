import { View, Text } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { Button, Input, Image } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

const HomeScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if(authUser){
        navigation.replace("Home");
      }
    })
    return unsubscribe;
  }, [])

  const navigation = useNavigation();

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch(error => alert(error));
  }

  return (
    <KeyboardAvoidingView behavior="height" style={tw`items-center justify-center flex-1 p-10 bg-white`}>
      <StatusBar style="light" />
      <Image
        style={{ width: 120, height: 120, borderRadius: 8 }}
        source={{
          uri: "https://images.hindustantimes.com/tech/img/2021/05/12/1600x900/signal_app_1610868805441_1610868819838_1620837476101.png",
        }}
      />

      <View style={tw`w-full pt-3`}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      <Button containerStyle={tw`mt-2 w-56`} title="Login" onPress={signIn} />
      <Button onPress={() => navigation.navigate("Register")} containerStyle={tw`mt-3 w-56`} title="Register" type="outline" />
      <View style={{height: 50}} />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
