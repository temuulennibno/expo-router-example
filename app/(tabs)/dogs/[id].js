import { useRouter, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const DogDetails = () => {
  const [dog, setDog] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id, withoutImage } = useGlobalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.thedogapi.com/v1/breeds/${id}`)
        .then(({ data }) => {
          setDog(data);
        })
        .catch((err) => {
          console.log("Error:", err.message);
        });
    }
    if (withoutImage) {
      console.log("withoutImage:", withoutImage);
    }
  }, [id, withoutImage]);

  useEffect(() => {
    if (dog) {
      axios
        .get(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`)
        .then(({ data }) => {
          setImage(data.url);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dog]);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading...</Text>
      </View>
    );
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
      <ScrollView>
        <Image style={{ width: "100%", height: 600 }} source={{ uri: image }} />
        <Text style={styles.name}>Name: {dog.name}</Text>
        <Text style={styles.text}>Origin: {dog.origin}</Text>
        <Text style={styles.text}>Temperament: {dog.temperament}</Text>
        <Text style={styles.text}>Description: {dog.description}</Text>
      </ScrollView>
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

export default DogDetails;
