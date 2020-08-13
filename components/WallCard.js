import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon, InlineIcon } from "@iconify/react";
import playSolid from "@iconify/icons-la/play-solid";
import lockSolid from "@iconify/icons-la/lock-solid";
import heartSolid from "@iconify/icons-la/heart-solid";
import ellipsisVSolid from '@iconify/icons-la/ellipsis-v-solid';
import commentsSolid from "@iconify/icons-la/comments-solid";
import shareAltSquareSolid from "@iconify/icons-la/share-alt-square-solid";
import baselineShare from "@iconify/icons-ic/baseline-share";
import ProfileHeader from "./profileHeader";

import * as UserData from "../utils/UserData";

export default function WallCard({ tags, title, video, gif, file }) {
  const [videoObj, setVideo] = useState({});
  // Sample file retrieval logic

  // const [images, setImages] = useState([]);
  // const [files, setFiles] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [term, setTerm] = useState('');
  //
  // useEffect(() => {
  //   if (file) {
  //     setFiles(...file.file)
  //   } else {
  //     setFiles(`https://source.unsplash.com/random`)
  //   }
  // }, []);

  //  Parent css removed: h-auto max-w-screen-sm

  const address = file.address;

  useEffect((x) => {
    async function run() {
      const box = await UserData.forUser(address);
      // console.log("file.id", file.id);

      box.getVideo(file.id).then((x) => {
        // console.log("video", x);
        if (x) setVideo(x);
      });
    }
    run();
  }, []);

  if (!videoObj) return null;

  return (
    <div className="relative w-screen h-full px-4 pt-2 snap-center always-stop z-0">
      <Link href="/post/[slug]" as={"/post/" + file.id}>
        <div className="mb-8 rounded-md shadow-lg h-full mx-auto w-auto max-w-md w-full cursor-pointer bg-gray-800 bg-opacity-75">
          <img
            className="rounded-md h-full w-full object-cover opacity-75"
            src={gif}
          />
          <div className="flex absolute top-0 p-6">
            <ProfileHeader />
            <Icon icon={ellipsisVSolid} color="white" className="justify-right mx-0 h-8 w-8" />
          </div>
          <div className="absolute bottom-0 mx-6 mb-24">
            <Icon className="w-10 h-10" icon={lockSolid} color="white" />
            <div className="break-words font-extrabold text-4xl mb-4 p-2 text-white">
              {videoObj.title || "Loading..."}
            </div>

            <div className="w-full">
              <button className="flex bg-white hover:bg-gray-300 text-black font-medium tracking-wide py-2 px-4 w-64 rounded-lg mr-2 items-center button-gradient">
                <Icon className="m-1" icon={playSolid} color="black" />
                <span>
                  Own {videoObj.tokens} {videoObj.tokenName} to Unlock
                </span>
              </button>
            </div>

            {/*<div className="inline-block bg-gray-200 bg-opacity-50 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2">

              Tags: {tags}
  </div>*/}
          </div>
        </div>
      </Link>
    </div >
  );
}

// <Icon icon={commentsSolid} height="3em" className="text-white" />
// <Icon icon={baselineShare} height="3em" className="text-blue-600" />

/*
<div className="absolute bottom-0 right-0 space-y-8 mx-6 my-8">
          <Icon
            icon={heartSolid}
            height="3em"
            className="text-red-700 animate-pulse"
          />
        </div>
*/
