import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { inject, observer, useObserver } from "mobx-react";
import Clock from "../components/Clock";
import { Button } from "@material-ui/core";
import WallCard from "../components/WallCard";
import SortBy from "../components/SortBy";
import Head from "next/head";
import useScript from 'react-script-hook';

const init = {
  feed: [{ file: "small", refresh: 0 }],
};

// @inject('store')
function Wall() {
  const [state, setState] = useState(init);

  const videoRef = useRef();

  function setup() {
    if(!window.videojs) return;
    if(state.setup) return;

    var player = window.videojs(videoRef.current, {
      autoplay: "any",
    })
    .ready(function () {
      // self.player = this;
      // self.player.on('play', self.handlePlay);
    });
    setState((x) => ({ ...x, setup: true }));
  }

  useScript({
    src: "https://vjs.zencdn.net/7.8.4/video.js",
    checkForExisting: true,
    onload: () => {
      setState((x) => ({ ...x, refresh: x.refresh + 1 }));
      setup();
    },
  });

  useEffect((x) => {
    setup();
  }, [state]);

  const name = "small";
  const file = `https://collabtube-encoded-east1.s3.amazonaws.com/${name}.m3u8`;

  return useObserver(() => (
    <section className="text-center mx-auth w-full">
      <Head>
        <title>Player</title>
        <link
          href="https://vjs.zencdn.net/7.8.4/video-js.css"
          rel="stylesheet"
        />
      </Head>
      <h1 className="text-x1">TITLE</h1>
      <div id="video" className="w-full">
        <video
          ref={videoRef}
          id="my-video"
          className="video-js mx-auto"
          controls
          preload="auto"
        >
          <source src={file} type="application/x-mpegURL" />
        </video>
      </div>
    </section>
  ));
}

export default Wall;
