import React, { useState } from "react";
import { ScrollView, View, Switch, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../../services/api";
interface Position {
  latitude: number;
  longitude: number;
}

export default function OrphanageData() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as Position;

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setopenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  async function handleCreateOrphanage() {
    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));
    data.append("latitude", String(params.latitude));
    data.append("longitude", String(params.longitude));

    images.forEach((image, index) =>
      data.append("images", { name: `image_${index}.jpg`, type: "image/jpg", uri: image } as any)
    );

    try {
      api.post("/orpahange", data);

      navigation.navigate("OrphanagesMap");
    } catch (err) {
      alert("Ops! Algo deu errado, tente novamente");
    }
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== "granted") {
      return alert("Ops! Precisamos de acesso a suas fotos");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) return;

    const { uri } = result;

    setImages([...images, uri]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Sobre</Text>
      <TextInput style={[styles.input, { height: 110 }]} value={about} onChangeText={setAbout} multiline />
      {/* 
      <Text style={styles.label}>Whatsapp</Text>
      <TextInput style={styles.input} /> */}

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map((image) => {
          return <Image key={image} source={{ uri: image }} style={styles.imagePreview} />;
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput style={styles.input} value={opening_hours} onChangeText={setOpeningHours} />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          value={open_on_weekends}
          onValueChange={setopenOnWeekends}
          trackColor={{ false: "#ccc", true: "#39CC83" }}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}
