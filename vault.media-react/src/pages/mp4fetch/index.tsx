import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import MP4FetchPanel from "@/components/mp4fetch/MP4FetchPanel";
import React, { ReactElement, useEffect, useState } from "react";
import ResultRow from "@/components/global/ResultRow";

export default function MP4Fetch() {
  const [content, setContent] = useState<{ [key: string]: string }[]>([]);
  const [triggerEffect, setTriggerEffect] = useState(false);

  useEffect(() => {
    if (triggerEffect) {
      setTriggerEffect(false);
    }
  }, [triggerEffect]);

  const addContent = (components: { [key: string]: string }[]) => {
    setContent(components);
    setTriggerEffect(true);
  };

  function changeContent(components: { [key: string]: string }[]) {
    setContent(components);
    setTriggerEffect(true);
  }

  return (
    <>
      <Head>
        <title>Vault Media MP4</title>
        <meta name="description" content="Vault Multi Media downloader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/media/vault-logo-title.png" />
      </Head>
      <main>
        <Navbar name="mp4" />
        <MP4FetchPanel onFetch={addContent} onChange={changeContent} />
        <div className="container my-5 py-5">
          <table className="table">
            <thead>
              <tr className="tr">
                <th scope="col" className="footer-highlight col-2">
                  Thumbnail
                </th>
                <th scope="col" className="footer-highlight col-3">
                  Title
                </th>
                <th scope="col" className="footer-highlight col-2">
                  Author
                </th>
                <th scope="col" className="footer-highlight col-3">
                  File name
                </th>
                <th scope="col" className="footer-highlight col-1">
                  Status
                </th>
                <th scope="col" className="footer-highlight col-1">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {content.map((component) => (
                <ResultRow
                  thumbnail_url={component["thumbnail_url"]}
                  title={component["title"]}
                  author={component["author"]}
                  file_name={component["file_name"]}
                  file_download={component["file_download"]}
                  status={component["status"]}
                  key={component["key"]}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </>
  );
}
