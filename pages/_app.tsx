import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import type { AppProps } from "next/app";
import { Noto_Sans_TC, Nunito } from "next/font/google";
import { store } from "../store";
import { Provider } from "react-redux";

const noto_san = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal"],
  variable: "--font-noto-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-nunito",
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div
        id="main"
        className={`${noto_san.variable} ${nunito.variable} font-noto_sans`}
      >
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
