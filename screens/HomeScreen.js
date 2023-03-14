import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "@rneui/themed";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginLeft: 20 }}
          onPress={signOut}
        >
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            width: 80,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={{height: "100%"}}>
      <StatusBar />
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
