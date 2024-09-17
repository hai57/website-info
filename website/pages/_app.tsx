/* eslint-disable prettier/prettier */
import type { AppProps } from "next/app";

import { Provider } from 'react-redux'
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/router";

import { store } from '@/store'
import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <NextUIProvider navigate={router.push}>
        <Component {...pageProps} />
      </NextUIProvider>

    </Provider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
