import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { GetAllUser } from "../Sqlcrud/Operations";
import { useSQLiteContext } from "expo-sqlite";
import { BottomSheet } from "react-native-sheet";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const DeleteUser = () => {
  const db = useSQLiteContext();

  const [UserDetails, setUserDetails] = useState();
  const [SelectedUser, setSelectedUser] = useState();

  useEffect(() => {
    writeUsers();
  }, []);

  const writeUsers = async () => {
    const response = await GetAllUser(db);
    if (response) {
      console.log("userdetails", response);
      setUserDetails(response);
    }
  };

  const HandleDeleteUser = () => {
    bottomSheet.current.hide();
    Alert.alert(
      "Are you sure you want to proceed?",
      `do you want to  Delete the user "${
        SelectedUser ? SelectedUser.Name : "NULL"
      }"`,
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
            setSelectedUser("");
          },
          style: "cancel",
        },
        {
          text: "Confirm",
          // onPress: () => {
          //   UpdateTextField(tableName);
          // },
          onPress: async () => {
            console.log("update Pressed");
          },
          style: "destructive",
        },
      ]
    );
  };

  const UserViewer = ({ item }) => {
    if (!item) return null;
    const backgroundColor = item.id % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#E8E8E8]";
    return (
      <TouchableOpacity
        className={`${backgroundColor}`}
        onPress={() => {
          console.log("selectedUUID", item.UUID);
          setSelectedUser(item);
          bottomSheet.current.show();
        }}
      >
        <Text className="hidden">{item.UUID}</Text>
        <View style={styles.row}>
          <Text style={[styles.cell, { flex: 0.4 }]}>{item.id}</Text>
          <Text style={styles.cell}>{item.Name}</Text>
          <Text style={styles.cell}>{item.PhoneNumber}</Text>
          <Text style={styles.cell}>{item.Address}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const bottomSheet = useRef(null);
  const navigation = useNavigation();

  return (
    <>
      <View>
        <Text>DeleteUser</Text>
      </View>
      <View style={styles.Listcontainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, { flex: 0.3 }]}>Id</Text>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Phone</Text>
          <Text style={styles.headerCell}>Address</Text>
        </View>
        <FlatList
          data={UserDetails}
          renderItem={UserViewer}
          keyExtractor={(item) => item.UUID.toString()}
        />
      </View>
      {/* BottomSheet */}
      <BottomSheet height={180} ref={bottomSheet}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <View style={{ marginHorizontal: "auto", marginTop: 20 }}>
          <Text style={{ fontSize: 20 }}>
            Do you want to upadate or delete the user?
          </Text>
          <Text
            style={{
              marginHorizontal: "auto",
              fontSize: 15,
              marginVertical: 5,
              color: "red",
            }}
          >
            selected user:"{SelectedUser ? SelectedUser.Name : "Null"}"
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 15,
          }}
        >
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => HandleDeleteUser()}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              navigation.navigate("Update user", {
                updatePerson: SelectedUser ? SelectedUser : null,
              });
              console.log("letsee", SelectedUser);
            }}
          >
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};

export default DeleteUser;

const styles = StyleSheet.create({
  Listcontainer: {
    flex: 1,
    padding: 10,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    height: 50,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  updateButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    height: 50,
  },
  updateText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
