import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import SortBy from "./SortBy";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { getVideos } from "../utils/CTS3.js";

import VideoData from "./videos.json";
import Others from "../pages/upload";
import WallCard from "./WallCard";
import Header from "./header";

function mf(i) {
  const file = "b";
  return { file, id: Math.random() };
}

const init = {
  feed: new Array(6).fill(0).map((x, i) => mf(i)),
};

// @inject('store')
function Page() {
  const [state, setState] = useState(init);
  const [sampleData, setSampleData] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    try {
      getVideos(setVideos);
      // console.log(videos);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // Logic could be recycled for different bottom drawer solution.

  // const [isVisible, setIsVisible] = React.useState(false);
  // const openDrawer = React.useCallback(() => setIsVisible(true), []);
  // const closeDrawer = React.useCallback(() => setIsVisible(false), []);

  return (
    <>
      <Head>
        <title>DFAME</title>
      // TODO: Add tab icon
      </Head>
      <div>
        <div className="fixed flex flex-col">
          <Header>
          </Header>
        </div>
        <div className="absolute snap snap-y snap-mandatory">
          {videos.map((videoDetail, index) => {
            return (
              <WallCard
                key={index}
                file={videoDetail}
                tags={videoDetail.tags}
                title={videoDetail.title}
                gif={videoDetail.gif}
                video={videoDetail.video}
              />
            );
          })}
        </div>
      </div>

      {/*Should be replaced with Iconify icon.
      <div class="fixed bottom-0 right-0 mr-5 mb-20">
        <Fab size="small" color="black" aria-label="add" onClick={openDrawer}>
          <AddIcon />
        </Fab>
      </div>
      </div>*/}

      {/*<DynamicStoriesWithNoSSR />*/}
    </>
  );
}

export default Page;

// <SortBy />