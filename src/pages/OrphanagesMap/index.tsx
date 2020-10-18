import React from "react";
import { View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import MapMarker from "../../images/map-marker.png";
import { RectButton } from "react-native-gesture-handler";

function OrphanagesMaps() {
  const navigation = useNavigation();

  function handleNavigationToDetails() {
    navigation.navigate("OrphanageDetails");
  }

  function handleNavigationToCreate() {
    navigation.navigate("OrphanageData");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{ latitude: -23.558356, longitude: -46.650998, latitudeDelta: 0.008, longitudeDelta: 0.008 }}
      >
        <Marker
          icon={MapMarker}
          calloutAnchor={{ x: 2.7, y: 0.9 }}
          coordinate={{ latitude: -23.558356, longitude: -46.650998 }}
        >
          <Callout onPress={handleNavigationToDetails} tooltip>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Minha casa</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 Orfanatos encontrados</Text>
        <RectButton style={styles.createOrphangeButton} onPress={handleNavigationToCreate}>
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}

export default OrphanagesMaps;
