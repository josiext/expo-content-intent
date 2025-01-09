import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCurrentIntent } from "./useCurrentIntent";
import { downloadFile } from "./downloadFile";

const EXAMPLE_FILES = [
  "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
  "https://cdn.pixabay.com/photo/2023/03/15/20/46/background-7855413_640.jpg",
  "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
];

export default function App() {
  const { intent, setResult } = useCurrentIntent();

  const handleSetFile = async (url: string) => {
    const res = await downloadFile(url);

    await setResult({ isOK: true, uris: [res.uri] });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          Intent:
        </Text>
        <Text
          style={{
            backgroundColor: "lightgray",
            padding: 8,
            borderRadius: 8,
            fontSize: 12,
          }}
        >
          {JSON.stringify(intent, null, 2)}
        </Text>
      </View>

      {intent?.action === "android.intent.action.MAIN" && (
        <Text
          style={{
            alignSelf: "center",
            textAlign: "center",
            fontSize: 12,
            color: "gray",
          }}
        >
          Open this app from the File Picker using Gmail or any other app that
          supports file picking.
        </Text>
      )}

      {intent?.action === "android.intent.action.GET_CONTENT" && (
        <View style={{ height: 120, gap: 4 }}>
          <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
            Choose a file:
          </Text>
          <ScrollView
            horizontal
            style={{ height: 120 }}
            contentContainerStyle={{
              gap: 8,
              height: 120,
            }}
          >
            {EXAMPLE_FILES.map((url) => (
              <TouchableOpacity key={url} onPress={() => handleSetFile(url)}>
                <Image
                  source={{ uri: url }}
                  style={{ width: 120, height: 120 }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
