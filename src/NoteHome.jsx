import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const NoteHome = () => {
  const [userCurrent, setUserCurrent] = useState(undefined);
  const [task, setTask] = useState("");
  const [listTask, setListTask] = useState([]);
  const [priority, setPriority] = useState("");
  const [statusHandle, setStatusHandle] = useState(false);
  const [editTask, setEditTask] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const checkLogin = await AsyncStorage.getItem("user");
      console.log("check login", checkLogin);
      if (checkLogin) {
        const data = await JSON.parse(checkLogin);
        setUserCurrent(data);
        const getTasks = await fetch(
          `https://6549d5a1e182221f8d51f431.mockapi.io/take-note/api/task?user_id=${data?.id}`,
          {
            method: "get",
          }
        );
        const dataTask = await getTasks?.json();
        if (dataTask) {
          setListTask(dataTask);
        }
      }
    })();
  }, [statusHandle]);

  const handleAddTask = async () => {
    const dataNewTask = {
      name_task: task,
      user_id: userCurrent?.id,
      priority: priority,
      long_time: null,
      status: false,
    };
    if (editTask === "") {
      await fetch(
        "https://6549d5a1e182221f8d51f431.mockapi.io/take-note/api/task",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataNewTask),
        }
      );
      setStatusHandle(!statusHandle);
    } else {
      await fetch(
        `https://6549d5a1e182221f8d51f431.mockapi.io/take-note/api/task/${editTask}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataNewTask),
        }
      );
      setPriority("");
      setTask("");
      setEditTask("");
      setStatusHandle(!statusHandle);
    }
  };

  const handleDelete = async (id) => {
    await fetch(
      `https://6549d5a1e182221f8d51f431.mockapi.io/take-note/api/task/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "delete",
      }
    );
    setStatusHandle(!statusHandle);
  };

  const handleFinish = async (task) => {
    await fetch(
      `https://6549d5a1e182221f8d51f431.mockapi.io/take-note/api/task/${task.id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...task, status: true }),
      }
    );
    setStatusHandle(!statusHandle);
  };

  const handleEditTask = async (taskEdit) => {
    setTask(taskEdit.name_task);
    setPriority(taskEdit.priority);
    setEditTask(taskEdit.id);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: "20px" }}>
        Hello {userCurrent?.user_name}
      </Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <TextInput
            style={{
              borderWidth: "2px",
              height: "35px",
              width: "350px",
              marginTop: "20px",
              marginBottom: "20px",
              borderRadius: "20px",
            }}
            value={task}
            onChangeText={(value) => setTask(value)}
          ></TextInput>
        </View>
        <View>
          <TextInput
            style={{
              borderWidth: "2px",
              height: "35px",
              width: "350px",
              marginTop: "20px",
              marginBottom: "20px",
              borderRadius: "20px",
            }}
            value={priority}
            onChangeText={(value) => setPriority(value)}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={{
            width: "100px",
            height: "30px",
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: "20px",
            alignItems: "center",
          }}
          onPress={handleAddTask}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <View>
        {listTask &&
          listTask?.map((el) => {
            return (
              <View
                style={{
                  marginTop: "30px",
                  padding: "10px",
                  width: "350px",
                  height: "110px",
                  backgroundColor: `${el.status ? "black" : "green"}`,
                  marginBottom: "20px",
                  borderRadius: "10px",
                  shadowOffset: "#2196F3",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {el?.name_task}
                </Text>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Status : {el?.status ? "Hoàn thành" : "Chưa hoàn thành"}
                </Text>
                <View style={{ flexDirection: "row", marginTop: "20px" }}>
                  <View style={{ marginRight: "10px" }}>
                    <TouchableOpacity
                      style={{
                        width: "100px",
                        height: "30px",
                        backgroundColor: "red",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        borderRadius: "20px",
                        alignItems: "center",
                      }}
                      onPress={() => handleDelete(el?.id)}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginRight: "10px" }}>
                    <TouchableOpacity
                      onPress={() => handleEditTask(el)}
                      style={{
                        width: "100px",
                        height: "30px",
                        backgroundColor: "red",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        borderRadius: "20px",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{
                        width: "100px",
                        height: "30px",
                        backgroundColor: "red",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        borderRadius: "20px",
                        alignItems: "center",
                      }}
                      onPress={() => handleFinish(el)}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Finished
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default NoteHome;
