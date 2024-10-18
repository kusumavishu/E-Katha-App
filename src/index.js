import React from "react";
import { SQLiteProvider } from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Screens/HomeScreen";
import Register from "./Screens/Register";
import ShowAllUser from "./Screens/ShowAllUser";
import DeleteUser from "./Screens/DeleteUser";
import SelectedUser from "./Screens/SelectedUser";
import UpdateUser from "./Screens/UpdateUser";

async function initilizeDatabase(db) {
  try {
    await db.execAsync(`
        PRAGMA journal_mode=WAL;
    `);
    console.log("Database initilise successful");
  } catch (error) {
    console.log("Error while Initilizing database: ", error);
  }

  // creating a userstable
  try {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS UsersTable (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          UUID TEXT NOT NULL,
          Name TEXT NOT NULL,
          PhoneNumber TEXT NOT NULL,
          Address TEXT 
        );
      `);
    console.log("UsersTable creation successful");
  } catch (error) {
    console.log("Error while creating table: ", error);
  }

  //creating a BillItems Tables
  try {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS BillItems (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTERGER,
          Date TEXT,
          Items TEXT,
          Extraitems TEXT NULL,
          Amount INTEGER,          
          Total INTEGER
        );
      `);
    console.log("BillingTable creation successful");
  } catch (error) {
    console.log("Error while creating table: ", error);
  }
}

const Stack = createNativeStackNavigator();

const Screens = () => {
  return (
    <SQLiteProvider databaseName="example.db" onInit={initilizeDatabase}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ShowUsers" component={ShowAllUser} />
          <Stack.Screen name="Delete & Update" component={DeleteUser} />
          <Stack.Screen name="SelectedUser" component={SelectedUser} />
          <Stack.Screen name="Update user" component={UpdateUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
};

export default Screens;
