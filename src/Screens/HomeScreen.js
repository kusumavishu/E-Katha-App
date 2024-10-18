import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ToastManager />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.btnText}>Register</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("ShowUsers")}
      >
        <Text style={styles.btnText}>Show Users</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Delete & Update")}
      >
        <Text style={styles.btnText}>Delete & update user</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.btnText}>Deal with Today</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    marginBottom: 18,
    padding: 10,
    backgroundColor: "#33db1f",
    borderRadius: 5,
  },
  btnText: {
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center",
    width: 300,
  },
});
