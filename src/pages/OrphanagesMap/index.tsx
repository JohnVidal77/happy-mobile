import React, { useState } from "react";
import { View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import styles from "./styles";

import MapMarker from "../../images/map-marker.png";
import { RectButton } from "react-native-gesture-handler";
import api from "../../services/api";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    url: string;
    id: number;
  }>;
}

function OrphanagesMaps() {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  function handleNavigationToDetails(id: number) {
    navigation.navigate("OrphanageDetails", { id });
  }

  function handleNavigationToCreate() {
    navigation.navigate("SelectMapPosition");
  }

  useFocusEffect(() => {
    api.get("/orphanages").then((res) => {
      setOrphanages(res.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{ latitude: -23.558356, longitude: -46.650998, latitudeDelta: 0.008, longitudeDelta: 0.008 }}
      >
        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={MapMarker}
            calloutAnchor={{ x: 2.7, y: 0.9 }}
            coordinate={{ latitude: orphanage.latitude, longitude: orphanage.longitude }}
          >
            <Callout onPress={() => handleNavigationToDetails(orphanage.id)} tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados</Text>
        <RectButton style={styles.createOrphangeButton} onPress={handleNavigationToCreate}>
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}

export default OrphanagesMaps;
