import { GetServerSideProps } from "next";
import { serverFetch } from "@/lib/fetch";
import { PartnerProps } from "@/components/home-section/PartnerSection";
import FrontLayout from "@/components/common/layout/FrontLayout";
import AdoptionSection from "@/components/home-section/AdoptionSection";
import AdoptionStepSection from "@/components/home-section/AdoptionStepSection";
import HelpSection from "@/components/home-section/HelpSection";
import PartnerSection from "@/components/home-section/PartnerSection";
import Head from "next/head";

export default function Home({ partners }: { partners: PartnerProps[] }) {
  // console.log(partners);
  return (
    <>
      <Head>
        <title>毛孩不哭 | Furkid don&apos;t cry</title>
      </Head>
      <FrontLayout includeTitle={false}>
        <AdoptionSection />
        <AdoptionStepSection />
        <HelpSection />
        <PartnerSection partners={partners} />
      </FrontLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await serverFetch("/partners");
    // console.log(response);

    if (!response.success)
      return {
        props: {
          partners: [],
        },
      };

    // console.log(response);
    return {
      props: {
        partners: response.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        partners: [],
      },
    };
  }
};
