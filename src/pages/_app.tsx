import "~/styles/globals.scss";
import "antd/dist/antd.less";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "~/app/store";
import { useRouter } from "next/router";
import AppLayout from "~/components/layout/AppLayout";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const regex =
    /^(?!.*(?:api|_next\/static|_next\/image|favicon\.ico|404|500|auth)).*/;
  const arr = router.pathname.split("/");
  return (
    <Provider store={store}>
      {arr.length > 1 && !regex.test(arr[1]) ? (
        <Component {...pageProps} />
      ) : (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      )}
    </Provider>
  );
}
