import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { Box, FormControl, Input, Stack, Button, NativeBaseProvider, Text } from 'native-base';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const onSubmit = () => {
    if (!email || !password) return;
    auth().signInWithEmailAndPassword(email, password);
  };

  if (!user) {
    return (
      <NativeBaseProvider>
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
          <Box alignItems="center">
            <Box w="100%" maxWidth="300px">
              <FormControl isRequired>
                <Stack mx="4">
                  <FormControl.Label>Email</FormControl.Label>
                  <Input type="text" placeholder="email" onChangeText={setEmail} />
                </Stack>
                <Stack mx="4">
                  <FormControl.Label>Password</FormControl.Label>
                  <Input type="password" placeholder="password" onChangeText={setPassword} />
                </Stack>
                <Button onPress={onSubmit}>Login</Button>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Text>Welcome {user.email}</Text>
      </Box>
    </NativeBaseProvider>
  );
}
