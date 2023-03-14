import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
      return unsubscribe;
  }, []);

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        source={{
          uri: chatMessages?.[0]?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        }}
        rounded
      />

      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>

        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
