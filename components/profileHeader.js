import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon, InlineIcon } from "@iconify/react";
import { getProfile, setProfile } from "../utils/UserData";
import useAddress from "../utils/Address";

export default function ProfileHeader() {

  const [box, setBox] = useState();
  const [address, setAddress] = useState("");
  const [userProfile, setUserProfile] = useState({
    name: "",
    description: "",
    emoji: "",
    image: [],
    location: "",
    website: "",
  });

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
      image: userProfile.image
        ? Object.values(userProfile.image[0].contentUrl)
        : [],
      location: userProfile.location,
      website: userProfile.website,
    });
  };

  useEffect(() => {
    if (!address) return;
    get3BoxProfile(address);
  }, [address]);

  return (
    <div className="flex flex-auto">
      <img
        className="h-12 w-12 object-cover rounded-full border-solid border-white border-2"
        src={`https://ipfs.infura.io/ipfs/${userProfile.image[0]}`}
        alt="Your Profile Picture"
      />
      <div className="flex-auto">
        <p className="ml-4 text-extrabold tracking-wide text-white text-lg align-text-top">
          {userProfile.name}
        </p>
      </div>
    </div>
  );
}