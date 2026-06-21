import { Stack } from "expo-router";
import React from "react";
import { useColors } from "@/hooks/useColors";

export default function AuthLayout() {
  const colors = useColors();
  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade", contentStyle: { backgroundColor: colors.primary } }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="intro" />
      <Stack.Screen name="login" options={{ contentStyle: { backgroundColor: colors.background } }} />
      <Stack.Screen name="signup" options={{ contentStyle: { backgroundColor: colors.background } }} />
      <Stack.Screen name="otp" options={{ contentStyle: { backgroundColor: colors.background } }} />
      <Stack.Screen name="forgot-password" options={{ contentStyle: { backgroundColor: colors.background } }} />
      <Stack.Screen name="reset-password" options={{ contentStyle: { backgroundColor: colors.background } }} />
      <Stack.Screen name="create-profile" options={{ contentStyle: { backgroundColor: colors.background } }} />
      <Stack.Screen name="interests" options={{ contentStyle: { backgroundColor: colors.background } }} />
      <Stack.Screen name="fitness-goals" options={{ contentStyle: { backgroundColor: colors.background } }} />
      <Stack.Screen name="location" options={{ contentStyle: { backgroundColor: colors.background } }} />
      <Stack.Screen name="permissions" options={{ contentStyle: { backgroundColor: colors.background } }} />
    </Stack>
  );
}
