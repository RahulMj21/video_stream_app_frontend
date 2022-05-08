import "../scss/index.scss";
import type { AppProps } from "next/app";
import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "react-query";
import { store } from "../store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
