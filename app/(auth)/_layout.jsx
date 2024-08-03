import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#161622" style="light" />
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default App;
