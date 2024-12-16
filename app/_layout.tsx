import { Stack } from "expo-router";
import ClickCountProvider from "./ClickCountContext";

export default function RootLayout() {
  return (
    <ClickCountProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="+not-found" />
      </Stack>
    </ClickCountProvider>
  );
}