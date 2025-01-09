import * as FileSystem from "expo-file-system";

export const downloadFile = async (url: string) => {
  const fileName = url.split("/").pop() || "file.txt";
  const filePath = FileSystem.documentDirectory + fileName;

  const result = await FileSystem.downloadAsync(url, filePath);

  return result;
};
