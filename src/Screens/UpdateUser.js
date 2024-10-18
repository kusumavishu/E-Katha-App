import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Touchable,
} from "react-native";
import { ErrorSchema } from "../FomikSchema/FeildsSchema";
import { useFormik } from "formik";
import { updateRow, UpdateUserByUUID } from "../Sqlcrud/Operations";
import { useNavigation } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

const UpdateUser = ({ route }) => {
  const { updatePerson } = route.params;

  //   console.log(updatePerson);

  const db = useSQLiteContext();
  // const db = SQLite.openDatabaseAsync("example.db");

  const [UniqueID, setUniqueID] = useState();

  useEffect(() => {
    if (updatePerson) {
      console.log("updatePerson", updatePerson); // Log updatePerson directly to see its values
      setFieldValue("Name", updatePerson.Name);
      setFieldValue("PhoneNumber", updatePerson.PhoneNumber);
      setFieldValue("Address", updatePerson.Address);
      setUniqueID(updatePerson.id);
    }
  }, []);

  const onSubmit = async (values) => {
    console.log("values onSubmit", values);
    console.log("onsubmit id", UniqueID);
    if (UniqueID) {
      UpdateUserByUUID(UniqueID, values);
      navigation.navigate("Delete & Update");
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
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

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Name: {updatePerson.Name}</Text>
        <Text style={styles.text}>Number: {updatePerson.PhoneNumber}</Text>
        <Text style={styles.text}>Address: {updatePerson.Address}</Text>
      </View>

      <Text style={styles.promptText}>
        Do You Want to Update the User Details?
      </Text>

      <View style={styles.inputContainer}>
        <Text>Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Name"
          value={values.Name}
          onChangeText={handleChange("Name")}
          onBlur={handleBlur("Name")}
        />
        {touched.Name && errors.Name && (
          <Text style={styles.errorText}>{errors.Name}</Text>
        )}

        <Text>Mobile Number*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the PhoneNumber"
          value={values.PhoneNumber}
          onChangeText={handleChange("PhoneNumber")}
          onBlur={handleBlur("PhoneNumber")}
        />
        {touched.PhoneNumber && errors.PhoneNumber && (
          <Text style={styles.errorText}>{errors.PhoneNumber}</Text>
        )}

        <Text>Address*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Address"
          value={values.Address}
          onChangeText={handleChange("Address")}
          onBlur={handleBlur("Address")}
        />
        {touched.Address && errors.Address && (
          <Text style={styles.errorText}>{errors.Address}</Text>
        )}

        <View style={{ paddingVertical: 10 }}></View>
        <Button title="Update" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  box: {
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    color: "#333",
  },
  promptText: {
    fontSize: 20,
    color: "green",
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderColor: "#585858",
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginVertical: 5,
  },
});
