import axios from "axios";
import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Result {
  thumbnail_url?: string;
  title?: string;
  author?: string;
  file_name?: string;
  file_download?: string;
  status?: string;
}

const ResultRow = ({
  thumbnail_url,
  title,
  author,
  file_name,
  file_download,
  status,
}: Result) => {
  const download = async (file_name: string, file_download: string) => {
    await axios({
      url: process.env.DOWNLOAD_API_URL || "",
      method: "POST",
      responseType: "blob",
      data: {
        file_name: file_name,
      },
    }).then((response) => {
      const file = URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = file;
      link.download = file_download;
      link.click();

      URL.revokeObjectURL(file);
    });
  };

  return (
    <tr className="trcell">
      <td scope="col" className="py-4">
        <div
          style={{ backgroundImage: "url('" + thumbnail_url + "')" }}
          className="thumbnail"
        ></div>
      </td>
      <td scope="col" className="table-text align-middle py-4">
        {title}
      </td>
      <td scope="col" className="table-text align-middle py-4">
        {author}
      </td>
      <td scope="col" className="table-text align-middle py-4">
        {file_download}
      </td>
      <td
        scope="col"
        className={
          "table-text py-4 align-middle" +
          (status === "ready" ? " txt-success" : " txt-warning")
        }
      >
        {status}
      </td>
      <td scope="col" className="table-loader py-4 align-middle">
        {status === "ready" ? (
          <button
            className="download-button p-2"
            onClick={async (event) => {
              try {
                await download(file_name || "", file_download || "");
              } catch (error) {
                console.log(error);
                status = "";
              }
            }}
          >
            Download
          </button>
        ) : (
          <BiLoaderAlt className="loader" />
        )}
      </td>
    </tr>
  );
};

export default ResultRow;
