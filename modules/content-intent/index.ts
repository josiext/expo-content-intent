import { Intent, ResultOptions } from "./src/ContentIntent.types";
import ContentIntentModule from "./src/ContentIntentModule";
import { Platform } from "react-native";

export function getIntent(): Intent | null {
  if (Platform.OS !== "android") return null;

  return ContentIntentModule.getIntent();
}

export function setResult(options: ResultOptions): void {
  if (Platform.OS !== "android") return;

  ContentIntentModule.setResult(options);
}

export { Intent, ResultOptions };
