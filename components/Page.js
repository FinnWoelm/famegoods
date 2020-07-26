import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import { inject, observer, useObserver } from "mobx-react";
import Clock from "./Clock";
import WallCard from "./WallCard";
import SortBy from "./SortBy";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Drawer from "react-bottom-drawer";
import Others from "../pages/upload";

import TestCard from "./TestCard";
import FeedCard from "./FeedCard";
import Slider from "react-slick";

function mf(i) {
  const file = "b";
  return { file, id: Math.random() };
}

const init = {
  feed: new Array(6).fill(0).map((x, i) => mf(i)),
};

const DynamicStoriesWithNoSSR = dynamic(() => import("./StoryFeed"), {
  ssr: false,
});



// @inject('store')
function Page() {
  const [state, setState] = useState(init);
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    fetch(`http://jsonplaceholder.typicode.com/photos?_limit=15`).then(res => res.json()).then(data => {
      setSampleData(data);
    })
  }, []);

  const SampleNextArrow = () => {
    return (
      <div
        className="block bg-gray-300"
        onClick={(e) => {
          e.preventDefault()
          Slider.slickNext()
        }}
      />
    );
  }

  const SamplePrevArrow = () => {
    return (
      <div
        style={{ display: "block", background: "red" }}
        onClick={(e) => {
          e.preventDefault()
          Slider.slickPrev()
        }}
      />
    );
  }

  const settings = {
    infinite: false,
    speed: 1000,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    className: "z-auto"
  };

  const [isVisible, setIsVisible] = React.useState(false);
  const openDrawer = React.useCallback(() => setIsVisible(true), []);
  const closeDrawer = React.useCallback(() => setIsVisible(false), []);

  return useObserver(() => (
    <>
      <Head>
        <title>DFAME</title>
      // TODO: Add tab icon
      </Head>
      <div className="container mx-auto">

        <Slider {...settings}>
          {sampleData.map(data => (
            <TestCard key={data.id} id={data.id} name={data.title} url={data.url} />
          ))}
        </Slider>
      </div>

      <div class="fixed bottom-0 right-0 mr-5 mb-20">
        <Fab size="small" color="black" aria-label="add" onClick={openDrawer}>
          <AddIcon />
        </Fab>
      </div>

      <Drawer
        duration={320}
        hideScrollbars={true}
        onClose={closeDrawer}
        isVisible={isVisible}
      >
        <Others />
      </Drawer>
      {/*<DynamicStoriesWithNoSSR />*/}
    </>
  ));
}

export default Page;

// <SortBy />
