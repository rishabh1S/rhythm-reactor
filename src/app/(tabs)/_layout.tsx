import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import Player from "../../components/Player";
import React, { useState } from "react";
import PlayerModal from "../../components/PlayerModal";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -10 }} {...props} />;
}

export default function TabLayout() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          marginBottom: 8,
        },
      }}
      tabBar={(props) => (
        <View>
          <Player onPress={toggleModal} />
          {isModalVisible && (
            <PlayerModal
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
            />
          )}
          <BottomTabBar {...props} />
        </View>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user-circle-o"
                    size={28}
                    color={Colors[colorScheme ?? "dark"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}
