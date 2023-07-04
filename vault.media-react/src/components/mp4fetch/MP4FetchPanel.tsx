import axios from "axios";
import React, { useState } from "react";

const fetch_data = async (
  urls: string[],
  setContent: (content: { [key: string]: string }[]) => void
) => {
  var content = [];
  for (const url in urls) {
    const result = await axios.post(process.env.FETCH_API_URL || "", {
      url: urls[url],
    });
    if (
      result.status == 200 &&
      result.data.hasOwnProperty("title") &&
      result.data.hasOwnProperty("thumbnail_url") &&
      result.data.hasOwnProperty("author")
    ) {
      const thumbnail_url = result.data["thumbnail_url"];
      const title = result.data["title"];
      const author = result.data["author"];
      content.push({
        thumbnail_url: thumbnail_url,
        title: title,
        author: author,
        file_name: "",
        status: "waiting",
        key: url,
      });
    } else {
      throw "Error while fetching data.";
    }
  }
  setContent(content);
  return content;
};

const convert_urls = async (
  urls: string[],
  changeContent: (content: { [key: string]: string }[]) => void,
  content: { [key: string]: string }[]
) => {
  for (const url in urls) {
    const result = await axios.post(process.env.CONVERT_API_URL || "", {
      url: urls[url],
      extension: "mp4",
    });
    if (
      result.status == 200 &&
      result.data.hasOwnProperty("file_name") &&
      result.data.hasOwnProperty("file_download")
    ) {
      content[url]["status"] = "ready";
      content[url]["file_name"] = result.data["file_name"];
      content[url]["file_download"] = result.data["file_download"];
      changeContent(content);
    } else {
      throw "Error while fetching data.";
    }
  }
};

interface Props {
  onFetch: (content: { [key: string]: string }[]) => void;
  onChange: (content: { [key: string]: string }[]) => void;
}

const FetchPanel = ({ onFetch, onChange }: Props) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 my-4">
          {/* <input
            type="text"
            className="form-control fetch-input"
            placeholder="Enter youtube video url"
          ></input> */}
          <textarea
            rows={8}
            className="form-control fetch-input"
            placeholder="Enter youtube video urls"
            onChange={(event) => {
              try {
                const tmp: string[] = [];
                const urls = event.target.value.split(",");
                for (const key in urls) {
                  const url = urls[key].trim();
                  if (!tmp.includes(url) && url !== "") tmp.push(url);
                }
                setUrls(tmp);
                setMessage("");
              } catch (error) {
                console.log(error);
                setMessage("Invalid input string of urls.");
              }
            }}
          ></textarea>
          <p className="error-message pt-4">{message}</p>
        </div>
        <div className="col-12 my-2 mb-4">
          <button
            className="fetch-button"
            onClick={async (event) => {
              try {
                const content = await fetch_data(urls, onFetch);
                await convert_urls(urls, onChange, content);
                setMessage("");
              } catch (error) {
                console.log(error);
                onFetch([]);
                setMessage("Error while fetching data.");
              }
            }}
          >
            Fetch MP4 video
          </button>
        </div>
      </div>
    </div>
  );
};

export default FetchPanel;
