import React, { useEffect, useState } from "react";
// import api from "../lib/axios"; // axios instance dengan baseURL
import ImageCarousel from "../components/ImageCarousel";
import Caroseldaisy from "../components/Experiments/caroseldaisy";
import Hero from "../components/Hero";
// import ExPagination from "../components/Experiments/ExPagination"
import PopUp from "../components/Experiments/PopUp";
import toast from "react-hot-toast";
import GenericCards from "../components/GenericCards";

const Tes = () => {


  // console.log(imgs);

  return(
    <div>
        <ImageCarousel/>
      <Caroseldaisy/>
      <Hero/>
      {/* <ExPagination/> */}
      <PopUp/>
      {/* <GenericCards items={imgs}/> */}
    </div>

  )
};

export default Tes;

