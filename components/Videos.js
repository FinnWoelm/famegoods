import { useEffect, useState } from "react";
import { getVideos } from "../utils/CTS3.js";
import WallCard from "./WallCard";

export default function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    try {
      getVideos(setVideos);
      // console.log(videos);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      {videos.map((videoDetail, index) => {
        return (
          <WallCard
            key={index}
            title={videoDetail.title}
            gif={videoDetail.gif}
            file={videoDetail}
            // tags={videoDetail.tags}
            // video={videoDetail.video}
          />
        );
      })}
    </>
  );
}
