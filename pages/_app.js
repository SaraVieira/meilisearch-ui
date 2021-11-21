import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

import Head from "next/head";

import { useCreateStore, Provider } from "../lib/store";
import { ReactQueryDevtools } from "react-query/devtools";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  const createStore = useCreateStore(pageProps.initialZustandState);
  const queryClient = new QueryClient();
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>MeiliSearch GUI</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider createStore={createStore}>
          <Layout>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Layout>
        </Provider>
      </QueryClientProvider>
    </React.Fragment>
  );
}