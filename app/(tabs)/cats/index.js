import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Cats = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/breeds?limit=20")
      .then(({ data }) => {
        setCats(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <Link href={`/cats/${item.id}`} asChild>
      <Pressable style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <View>
      <TextInput />
      <FlatList
        data={cats}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Cats;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
