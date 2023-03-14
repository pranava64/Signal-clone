import { View, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
import tw from "tailwind-react-native-classnames";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
    });
  }, [navigation]);

  const createChat = async () => {
    await db.collection('chats').add({
        chatName: input
    }).then(() => {
        navigation.goBack();
    }).catch((error) => alert(error));
  }

  return (
    <View style={tw`bg-white h-full p-6`}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button disabled={!input} onPress={createChat} title="Create new Chat" />
    </View>
  );
};

export default AddChatScreen;
