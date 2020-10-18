import React from "react";
import { View, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

interface IProps {
  title: string;
  showCancel?: boolean;
}
function Header(props: IProps) {
  const navigation = useNavigation();
  const { title, showCancel = true } = props;

  function handleNavigationToHomepage() {
    navigation.navigate("OrphanagesMap");
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleNavigationToHomepage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View></View>
      )}
    </View>
  );
}

export default Header;
