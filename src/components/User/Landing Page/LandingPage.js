import React from "react";
import { useHistory } from "react-router-dom";
// import Footer from "../Footer";
import Header from "./Header";
import LandingBrands from "./LandingBrands";
import LandingMakeOwn from "./LandingMakeOwn";
// import LandingSponsors from "./LandingSponsors";
// import PurpleSearchBox from "./PurpleSearchBox";
import UpcomingEvents from "./UpcomingEvents";

function LandingPage({ events, sponsors }) {
  const history = useHistory();
  function handleToEvents() {
    history.push("/events");
  }
  

  return (
    <div className="">
      <Header handleToEvents={handleToEvents} />
      {/* <PurpleSearchBox /> */}
      <UpcomingEvents events={events}/>
      <div className="mx-8">
        {/* <LandingSponsors sponsors={sponsors}/> */}
        <LandingMakeOwn />
        <LandingBrands />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default LandingPage;
