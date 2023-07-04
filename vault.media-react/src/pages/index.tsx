import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vault Media</title>
        <meta name="description" content="Vault Multi Media downloader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/media/vault-logo-title.png" />
      </Head>
      <main>
        <Navbar name="home" />
      </main>

      <Footer />
    </>
  );
}
