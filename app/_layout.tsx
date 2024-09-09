import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { createContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer'
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '@/redux/store';
const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ArchiveRegular: require('../assets/fonts/Archive-Regular.ttf'),
    SourceSansProExtraLightItalic: require('../assets/fonts/SourceSansPro-ExtraLightItalic.ttf'),
    BrandonGrotesqueLight: require('../assets/fonts/BrandonGrotesque-Light.ttf'),
    SourceSansProItalic: require('../assets/fonts/SourceSansPro-Italic.ttf'),
    BrandonGrotesqueRegular: require('../assets/fonts/BrandonGrotesque-Regular.ttf'),
    SourceSansProLight: require('../assets/fonts/SourceSansPro-Light.ttf'),
    SourceSansProBlack: require('../assets/fonts/SourceSansPro-Black.ttf'),
    SourceSansProLightItalic: require('../assets/fonts/SourceSansPro-LightItalic.ttf'),
    SourceSansProBlackItalic: require('../assets/fonts/SourceSansPro-BlackItalic.ttf'),
    SourceSansProRegular: require('../assets/fonts/SourceSansPro-Regular.ttf'),
    SourceSansProBold: require('../assets/fonts/SourceSansPro-Bold.ttf'),
    SourceSansProSemiBold: require('../assets/fonts/SourceSansPro-SemiBold.ttf'),
    SourceSansProBoldItalic: require('../assets/fonts/SourceSansPro-BoldItalic.ttf'),
    SourceSansProSemiBoldItalic: require('../assets/fonts/SourceSansPro-SemiBoldItalic.ttf'),
    SourceSansProExtraLight: require('../assets/fonts/SourceSansPro-ExtraLight.ttf'),
    SpaceMonoRegular: require('../assets/fonts/SpaceMono-Regular.ttf'),
    GeistMonoBlack:require('../assets/fonts/GeistMono-Black.ttf'),
    GeistMonoBold:require('../assets/fonts/GeistMono-Bold.ttf'),
    GeistMonoLight:require('../assets/fonts/GeistMono-Light.ttf'),
    GeistMonoMedium:require('../assets/fonts/GeistMono-Medium.ttf'),
    GeistMonoRegular:require('../assets/fonts/GeistMono-Regular.ttf'),
    GeistMonoSemiBold:require('../assets/fonts/GeistMono-SemiBold.ttf'),
    GeistMonoThin:require('../assets/fonts/GeistMono-Thin.ttf'),
    GeistMonoUltraBlack:require('../assets/fonts/GeistMono-UltraBlack.ttf'),
    GeistMonoUltraLight:require('../assets/fonts/GeistMono-UltraLight.ttf'),


  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
            <Provider store={store}>
    <ThemeProvider value={DefaultTheme}>
      <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView >
      <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          {/* <Stack.Screen name='chatPlayground' options={{ headerShown: false}} /> */}
          </Stack>
      </GestureHandlerRootView>
        </QueryClientProvider>
    </ThemeProvider>
            </Provider>
  );
}
