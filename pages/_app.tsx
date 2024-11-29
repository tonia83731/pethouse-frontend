import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Noto_Sans_TC, Nunito } from "next/font/google";
import { FormProvider } from "@/context/FormContext";
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
    <div
      id="main"
      className={`${noto_san.variable} ${nunito.variable} font-noto_sans`}
    >
      <FormProvider>
        <Component {...pageProps} />
      </FormProvider>
    </div>
  );
}
