import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "@rneui/themed";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={tw`flex-row justify-between mr-1 w-24`}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={21} color="white" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="call" size={21} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={90}
        style={tw`flex-1`}
      >
        <>
          <ScrollView>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.reciever}>
                  <Avatar
                    source={{ uri: data.photoURL }}
                    rounded
                    size={30}
                    position="absolute"
                    bottom={-15}
                    right={-5}
                  />
                  <Text style={styles.recieverText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.sender}>
                  <Avatar
                    source={{ uri: data.photoURL }}
                    rounded
                    size={30}
                    position="absolute"
                    bottom={-15}
                    left={-5}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.senderName}>{data.displayName}</Text>
                </View>
              )
            )}
          </ScrollView>

          <View style={tw`flex-row items-center p-8 w-full`}>
            <TextInput
              style={{
                bottom: 0,
                height: 40,
                flex: 1,
                marginRight: 10,
                borderColor: "transparent",
                backgroundColor: "#ECECEC",
                borderWidth: 1,
                padding: 10,
                color: "grey",
                borderRadius: 30,
              }}
              placeholder="Signal Message"
              value={input}
              onChangeText={(text) => setInput(text)}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white"
  }
});

export default ChatScreen;
