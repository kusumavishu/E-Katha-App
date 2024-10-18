import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useSQLiteContext } from "expo-sqlite";
import { AddUser, GetAllUser } from "../Sqlcrud/Operations";
import { FlatList } from "react-native";
import { ErrorSchema } from "../FomikSchema/FeildsSchema";
import { TouchableOpacity } from "react-native";

import uuid from "react-native-uuid";

const Register = () => {
  const db = useSQLiteContext();

  const [UserDetails, setUserDetails] = useState();

  useEffect(() => {
    writeUsers();
  }, []);

  const onSubmit = async (values) => {
    console.log("values onSubmit", values);
    const newValues = { ...values, uuid: uuid.v4() };

    AddUser(db, newValues); //ading

    resetForm();
    writeUsers();
  };

  const writeUsers = async () => {
    const response = await GetAllUser(db);
    if (response) {
      console.log("userdetails", response);
      setUserDetails(response);
    }
  };

  const UserViewer = ({ item }) => {
    if (!item) return null;
    const backgroundColor = item.id % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#E8E8E8]";
    return (
      <TouchableOpacity
        className={`${backgroundColor}`}
        onPress={() => console.log("selectedUUID", item.UUID)}
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

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    resetForm,
    handleBlur,
  } = useFormik({
    initialValues: {
      Name: "",
      PhoneNumber: "",
      Address: "",
    },
    validationSchema: ErrorSchema,
    onSubmit,
  });

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.Input}
          placeholder="enter the Name"
          name="Name"
          id="Name"
          value={values.Name}
          onChangeText={(text) => handleChange("Name")(text)}
          onBlur={handleBlur("Name")}
        ></TextInput>
        {touched.Name && errors.Name ? (
          <View>
            <Text className="text-sm text-red-600">{errors.Name}</Text>
          </View>
        ) : null}
        <TextInput
          style={styles.Input}
          placeholder="enter the PhoneNumber"
          name="PhoneNumber"
          id="PhoneNumber"
          value={values.PhoneNumber}
          onChangeText={(text) => handleChange("PhoneNumber")(text)}
          onBlur={handleBlur("PhoneNumber")}
        ></TextInput>
        {touched.PhoneNumber && errors.PhoneNumber ? (
          <View>
            <Text className="text-sm text-red-600">{errors.PhoneNumber}</Text>
          </View>
        ) : null}
        <TextInput
          style={styles.Input}
          placeholder="enter the Address"
          name="Address"
          id="Address"
          value={values.Address}
          onChangeText={(text) => handleChange("Address")(text)}
          onBlur={handleBlur("Address")}
        ></TextInput>
        {touched.Address && errors.Address ? (
          <View>
            <Text className="text-sm text-red-600 mb-1">{errors.Address}</Text>
          </View>
        ) : null}

        <Button title="Add" onPress={handleSubmit}></Button>
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
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginHorizontal: "auto",
    padding: 15,
    backgroundColor: "#E8E8E8",
  },
  Input: {
    borderColor: "#585858",
    height: 35,
    borderRadius: 5,
    borderWidth: 0.5,
    marginVertical: 5,
    paddingLeft: 8,
  },

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
});
