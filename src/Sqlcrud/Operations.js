import { Toast } from "toastify-react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("example.db");

export const AddUser = async (db, newValue) => {
  console.log("Adding item:", newValue);

  try {
    // Prepare the SQL statement for insertion
    const statement = await db.prepareAsync(
      `INSERT INTO UsersTable (UUID ,Name, PhoneNumber, Address) VALUES (?, ?, ?, ?)`
    );

    // Execute the prepared statement with the provided values
    await statement.executeAsync([
      newValue.uuid,
      newValue.Name,
      newValue.PhoneNumber,
      newValue.Address,
    ]);

    console.log("Item added successfully");
    // Show success toast
    Toast.success("User added successfully!");
  } catch (error) {
    // Log any errors encountered
    console.log("Error while adding the item to the UsersTable:", error);

    // Show error toast
    Toast.error("Failed to add user. Please try again.");
  }
};

export const GetAllUser = async (db) => {
  try {
    const allRows = await db.getAllAsync("SELECT * FROM UsersTable");
    // setStudents(allRows);
    console.log(">>>", allRows);
    return allRows;
  } catch (error) {
    console.log("Error while loading students: ", error);
    return [];
  }
};

import { openDatabaseAsync } from "expo-sqlite";

export const UpdateUserByUUID = async (id, newValue) => {
  // console.log("in Operation", { newValue, UUID });

  try {
    const db = await openDatabaseAsync("example.db");

    // Log to verify the UUID and values
    console.log("Updating user with UUID:", id);
    console.log("New values:", newValue);

    // First check if the UUID exists in the database
    const checkQuery = `SELECT * FROM UsersTable WHERE UUID = ?`;
    const checkResult = await db.execAsync(checkQuery, [id]);

    if (checkResult?.rows.length === 0) {
      console.log(`No user found with UUID: ${id}`);
      return;
    }

    const query = `
    UPDATE UsersTable 
    SET Name = ?, PhoneNumber = ?, Address = ? 
    WHERE id = ?`;

    const values = [
      "newValue.Name",
      "newValue.PhoneNumber",
      "newValue.Address",
      "id",
    ];

    const result = await db.execAsync(query, values);

    // const result = await db.executeSql(query, [
    //   newValue.Name,
    //   newValue.PhoneNumber,
    //   newValue.Address,
    //   UUID,
    // ]);

    console.log("Result of update operation:", result);

    if (result && result.rowsAffected > 0) {
      console.log(`Rows affected: ${result.rowsAffected}`);
    } else {
      console.log("No rows were affected by the update.");
    }

    console.log("Update successful for user with UUID: " + id);
  } catch (error) {
    console.log("Error while updating the user: ", error);
  }
};

// export const UpdateUserByUUID = async (uuid, newValue) => {
//   console.log("in Operation", { newValue, uuid });

//   try {
//     return new Promise((resolve, reject) => {
//       db.transaction((tx) => {
//         tx.executeSql(
//           `UPDATE UsersTable SET Name = ?, PhoneNumber = ?, Address = ? WHERE UUID = ?`,
//           [newValue.Name, newValue.PhoneNumber, newValue.Address, uuid],
//           (txObj, results) => {
//             resolve(results);
//           },
//           (txObj, err) => {
//             reject(err);
//           }
//         );
//       });
//     });
//   } catch (error) {
//     console.log(
//       "Error while updating the user, transaction rolled back: ",
//       error
//     );
//   }
// };

// import * as SQLite from "expo-sqlite";

// const dbs = SQLite.openDatabase("example.db");

// export const updateRow = () => {
//   const id = 2;
//   const newValue = {
//     Name: "Siri",
//   };
//   dbs.transaction((tx) => {
//     tx.executeSql(
//       "UPDATE SET Name = ? WHERE id = ?",
//       [newValue.Name, id],
//       (txObj, resultSet) => {
//         console.log("Row updated successfully");
//       },
//       (txObj, error) => {
//         console.error("Error updating row: ", error);
//       }
//     );
//   });
// };
