import React, { useEffect, useState } from "react";
import Page from "../components/Page";
import { ethers } from "ethers";
import { getProfile, setProfile } from "../utils/UserData";
import useAddress from "../utils/Address";
// import Box from "3box";
{
  /*const Box = require("3box");*/
}

export default function Index() {
  /*{
    const [profile, setProfile] = useState(null);
  async function getProfile() {
    const _profile = await Box.getProfile(
      "0xffaDc07f1BFb127F4312e8652fE94aB0c771b54D"
    );
    console.log(_profile);
    setProfile(_profile);
  }
  useEffect(() => {
    getProfile();
  }, []);
  }
  '0x489e4CFfa9B59784C597C51cd24000b1db506c20'
  '0xffaDc07f1BFb127F4312e8652fE94aB0c771b54D'
*/
  const [box, setBox] = useState();
  const [address, setAddress] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: '',
    description: '',
    emoji: '',
    image: [],
    location: '',
    website: '',
  });

  let provider;
  let signer;
  let myAddress;
  let metaMask;
  const defaultProvider = ethers.getDefaultProvider();
  const infuraProvider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/7cc1f1e700c443a7840540140f931831"
  );

  // if (typeof window !== "undefined") {
  //   provider = new ethers.providers.Web3Provider(window.ethereum)
  //   signer = provider.getSigner()
  //   console.log(provider.address[0])
  // }

  // This is an expendable private key created only to be used for this purpose
  // Can also use ethers.Wallet.createRandom() to create a test wallet
  const pk =
    "0xd2c63861bd5482b97f25303187772f0d7b94d0f0d2a628e724b3a92041887e8c";
  const walletInstance = new ethers.Wallet(pk, defaultProvider);

  const init3Box = async () => {
    // const box = await Box.create();
    // setBox(box);
    const address = walletInstance.address;
    console.log(address);
  };

  const auth3Box = async () => {
    const infuraProvider = new ethers.providers.JsonRpcProvider(
      "https://mainnet.infura.io/v3/7cc1f1e700c443a7840540140f931831"
    );
    // const box = await Box.create();
    // setBox(box);
    const address = walletInstance.address;
    console.log(address);
    try {
      const spaces = ["myDapp"];
      console.log(infuraProvider);
      //await box.auth([], { address: address[0], provider: infuraProvider })
    } catch (e) {
      console.error(e);
    }
  };

  let userAddress = useAddress();
  if (address !== userAddress) {
    setAddress(userAddress);
  }

  const get3BoxProfile = async (addr) => {
    const userProfile = await getProfile(addr);
    setUserProfile({
      name: userProfile.name,
      description: userProfile.description,
      emoji: userProfile.emoji,
      image: Object.values(userProfile.image[0].contentUrl),
      location: userProfile.location,
      website: userProfile.website,
    });
  }

  useEffect(() => {
    if (!address) return;
    get3BoxProfile(address);
  }, [address])

  return (
    <div>
      <div className="container mx-auto max-w-md overflow-hidden py-3">
        <div className="relative mb-2 bg-white rounded-lg shadow-lg">
          <img
            className="w-full h-64 object-cover"
            src="https://images.unsplash.com/photo-1518549945153-64368b032957?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
            alt="Profile picture"
          />
          <div className="text-center absolute w-full"></div>
          <div className="flex justify-center">
            <div className="sm:align-middle rounded rounded-t-lg overflow-hidden shadow max-w-md my-3">
              <div className="flex justify-center mt-10">
                <img
                  src={`https://ipfs.infura.io/ipfs/${userProfile.image[0]}`}
                  className="rounded-full border-solid border-white border-2 -mt-3"
                />
              </div>
              <div className="text-center px-3 pb-6 pt-2">
                <h1 className="text-black text-lg bold font-sans">
                  {userProfile.name} {userProfile.emoji}
                </h1>
                <p className="mt-2 font-sans font-light text-grey-dark">
                  {userProfile.description}
                </p>
                <p className="mt-2 font-sans font-light text-grey-dark">
                  {userProfile.website}
                </p>
                <p className="mt-4">
                  Wallet Address: <br />
                  <span style={{ fontSize: "0.8em" }}>{useAddress()}</span>
                </p>
              </div>
              <div className="flex justify-center pb-3 text-grey-dark ml-10 mr-10 mb-3">
                <div className="text-center mr-3 border-r pr-3">
                  <p className="text-xl">34</p>
                  <span className="text-gray-600 text-sm">Memberships</span>
                </div>
                <div className="text-center">
                  <p className="text-xl">42</p>
                  <span className="text-gray-600 text-sm">Followers</span>
                </div>
                <div className="text-center ml-3 border-l pl-3">
                  <p className="text-xl">34</p>
                  <span className="text-gray-600 text-sm">Networth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}