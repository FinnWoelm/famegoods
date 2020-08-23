import React, { useState, useRef, useEffect } from "react";
import Page from "../components/Page";
import { TextField, Slider, Typography, Button } from "@material-ui/core";
import { addVideo } from "../utils/CTS3";
import { Alert, AlertTitle } from "@material-ui/lab";
// import { createGif } from "../utils/GifUtil";
import LoadingOverlay from "../components/LoadingOverlay";
import { Icon, InlineIcon } from "@iconify/react";
import cloudUploadAltSolid from '@iconify/icons-la/cloud-upload-alt-solid';
import uploadSolid from '@iconify/icons-la/upload-solid';
import Link from "next/link";
import SetTicket from "../components/upload/SetTicket";
import useAddress from "../utils/Address";
import Lottie from 'react-lottie';
import { useOvermind } from "../stores/Overmind";
import MetaMask from "../components/MetaMask"
import blueConfirmation from '../src/lotties/blueConfirmation';


export default function Other() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: blueConfirmation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const address = useAddress();

  const [state, setState] = useState({ progress: 0 });
  const [formdata, setFormData] = useState({ tokens: 1 });

  const { state: ostate, actions } = useOvermind();

  useEffect(() => {
    if (ostate.user.balances.length === 0) actions.refreshUser();
  }, [ostate.user.balances, ostate.user]);

  async function onSubmit() {
    const _files = hiddenFileInput.current; // document.getElementById("videoupload");
    if (!_files.files || _files.files.length === 0) {
      alert("Please add a video");
      return;
    }
    console.log(_files.files);

    const title = window.document.getElementById("videoTitle").value;
    // console.log("title", title);

    if (!title || title.length === 0) {
      alert("please add a title");
      return;
    }

    // const gif = await createGif(_files.files[0]);
    // console.log("gif finished", gif);
    // setState(gif);

    const onProgress = (p) => {
      setState((x) => ({ ...x, progress: p || 0 }));
    };

    try {
      setState((x) => ({ ...x, loading: true, progress: 0 }));

      const videoObj = {
        title: title,
        tokenSet: formdata.tokens,
        tokens: formdata.tokens["1"].amount,
        tokenName: formdata.tokens["1"].name,
      };

      // console.log("videoObj", videoObj);
      // return;
      addVideo(_files.files, address, videoObj, onProgress)
        .then((x) => {
          // if() setState((x) => ({ ...x, progress: 99 }));
          setTimeout((_) => {
            setState((x) => ({ ...x, loading: false }));
            alert(
              "Video uploaded! After processing completes in a few minutes it will be publically available."
            );
          }, 100);
        })
        .catch((e) => {
          throw new Error(e);
        });
    } catch (e) {
      //window.alert(e);
      setState((x) => ({ ...x, error: e.toString(), loading: false }));
      return;
    }
  }

  // These variables can't be referenced/identified by the functions being rendered below because they are trapped inside FileUploader's local scope. I broke them out just so the page would work, but this may not be optimal.

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // The structure of FileUploader breaks the rules of hooks and can result in the error referenced here: https://reactjs.org/warnings/invalid-hook-call-warning.html

  // TL;DR: The solution is to not include hooks like useRed inside event handlers. The #2 reason listed in the above mentioned documentation.

  // const FileUploader = props => {
  //   const hiddenFileInput = React.useRef(null);
  //
  //   const handleClick = event => {
  //     hiddenFileInput.current.click();
  //   };
  //
  // }

  function onFileChange() {
    const fileUploaded = hiddenFileInput.current.files;
    if (!fileUploaded || fileUploaded.length === 0) return;

    setState((x) => ({ ...x, fileUploaded: fileUploaded[0], uploadFilename: fileUploaded[0].name }));
  }

  function onTokenChange(tokens) {
    // console.log("onTokenChange", tokens);

    setFormData((x) => ({ ...x, tokens }));
  }

  if (!address) {
    return <MetaMask></MetaMask>;
  }

  return (
    <>
      {state.loading && (
        <LoadingOverlay open={state.loading} progress={state.progress} />
      )}
      <div className="h-screen flex justify-center align-middle">
        <figure className="flex-auto bg-white rounded-md m-2 p-4 max-w-md mx-auto">
          {state.error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {state.error}
            </Alert>
          )}
          {state.gif && <img src={state.gif} width="200" height="200" />}
          <form>
            <div className="w-full h-full">
              <div className="my-2">
                <h1 className="ml-2 my-4 font-extrabold text-2xl text-gray-900 text-opacity-100 pb-2">
                  <span alt="camera-emoji">📷</span> Upload a Video
                </h1>

                <div className="mt-6">
                  <label className="text-gray-800 uppercase tracking-wide font-bold">Video Title</label>
                  <input
                    className="leading-tight text-xl appearance-none border-2 rounded w-full p-2 placeholder-gray-400 font-medium leading-tight focus:outline-none focus:shadow-outline pt-3 pb-2 mt-2 tracking-wide"
                    id="videoTitle"
                    type="text"
                    required
                  ></input>


                  <div className="relative mt-4">
                    <label className="text-gray-800 uppercase tracking-wide font-bold mb-2">Description</label>
                    <textarea
                      id="VideoDescription"
                      style={{}}
                      name="description"
                      cols="40"
                      rows="4"
                      className="leading-tight tracking-wide appearance-none border-2 mt-2 p-2 rounded-lg w-full placeholder-gray-600 font-normal leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                  </div>

                  <div className="flex-col items-center">
                    <button
                      onClick={handleClick}
                      className="mt-6 bg-gray-100 hover:bg-gray text-md text-black font-semibold w-full px-2 py-2 rounded-md border-b-8 border-gray-800 shadow-lg"
                    >
                      {state.fileUploaded && (
                        <div className="flex flex-row items-center justify-between m-auto">
                          <div className="ml-2 flex-1">
                            <Lottie
                              options={defaultOptions}
                              height={60}
                              width={60}
                            />
                          </div>
                          <label className="text-blue-600 text-md font-normal lowercase">
                            {state.uploadFilename}
                          </label>
                          <span className="flex-1"></span>
                        </div>
                      )}
                      {!state.fileUploaded && (
                        <div className="flex flex-row items-center justify-between m-auto">
                          <Icon icon={uploadSolid} className="h-8 w-8 ml-2 flex-1" />
                          <label className="text-md uppercase tracking-normal">Upload a Video File
                        </label>
                          <span className="flex-1"></span>
                        </div>)}
                    </button>

                    <input
                      ref={hiddenFileInput}
                      style={{
                        display: "none",
                      }}
                      onChange={onFileChange}
                      id="videoupload"
                      type="file"
                      name="myfile"
                      accept="video/*;capture=camcorder"
                    />
                  </div>
                  {ostate.user.balances.length > 0 && (
                    <SetTicket
                      tokens={ostate.user.balances}
                      onChange={onTokenChange}
                    ></SetTicket>
                  )}
                  {ostate.user.balances.length === 0 &&
                    <p>You currently do not have any tokens</p>}

                  <div className="flex justify-start">
                    <button
                      onClick={onSubmit}
                      className="mt-10 w-full flex-auto h-12 bg-black rounded-lg hover:bg-gray-700 text-white font-semibold rounded shadow-lg sm:h-16"
                    >
                      Publish Video
                </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </figure>
      </div>
      <style jsx>{`
          .upload-btn-wrapper {
            position: relative;
            overflow: hidden;
            display: inline-block;
            margin-right: 1rem;
          }
          .btn {
            border: 2px solid gray;
            color: gray;
            background-color: white;
            padding: 8px 20px;
            border-radius: 8px;
            font-size: 20px;
            font-weight: bold;
          }
          .upload-btn-wrapper input[type="file"] {
            font-size: 100px;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
          }
        `}</style>
    </>
  );
}
