import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CatDetails = () => {
  const [cat, setCat] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetch(`https://api.thecatapi.com/v1/breeds/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setCat(json);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (cat) {
      fetch(`https://api.thecatapi.com/v1/images/${cat.reference_image_id}`)
        .then((response) => response.json())
        .then((data) => {
          setImage(data.url);
        });
    }
  }, [cat]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255,.5)",
        }}
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <View>
        <Image style={{ width: "100%", height: 300 }} source={{ uri: image }} />
        <Text style={styles.name}>Name: {cat.name}</Text>
        <Text style={styles.text}>Origin: {cat.origin}</Text>
        <Text style={styles.text}>Temperament: {cat.temperament}</Text>
        <Text style={styles.text}>Description: {cat.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
});

export default CatDetails;
