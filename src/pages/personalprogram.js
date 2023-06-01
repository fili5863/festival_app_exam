import Head from "next/head";
import Anchor from "@/components/Anchor";
import { FilterbuttonsDay } from "../components/FilterbuttonsDay";
import { FilterbuttonsStage } from "../components/FilterbuttonsStage";
import Button from "@mui/material/Button";
import React from "react";
import Favorite from "@mui/icons-material/Favorite";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from "react";
import { Skeleton, TextField, Checkbox } from "@mui/material";
import apiConfig from "../../apiConfig";

export default function PersonalProgram({ schedule, bands }) {
  // console.log("Schedule", schedule);
  const [favourites, setFavourites] = useState("");
  const [dialogOpen, setDialogOpen] = React.useState([false, ""])
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedAct, setSelectedAct] = useState("");
  const [showTime, setShowTime] = useState(false)

  //Handle the dialog when wanting to remove from favourite
  const handleDialogClickOpen = (band) => {
    console.log(band);
    setDialogOpen([true, band]);
  };
  const handleDialogKeep = () => {
    setDialogOpen([false, ""]);
  };
  const handleDialogRemove = () => {
    removeBand(dialogOpen[1])
    setDialogOpen([false, ""]);
  };

  // Useeffect to get data down, from local storage 
  // Make a new state with the favourites (that has all the info), so we can loop through them in the schedule
  useEffect(() => {
    const currentLocal = localStorage.getItem("favourites");

    if (currentLocal !== null) {
      if (currentLocal === "[]") {
        localStorage.removeItem("favourites");
      } else {

        const currentToArray = currentLocal.substring(0, currentLocal.length - 1).split(`/","`);
        setFavourites(currentToArray)
      }
    }
    }, []);

  //Function that listens to favourites and removes from list if they are disabled from person program
    function removeBand(bandName) {
      const filteredList = favourites.filter((band) => band !== bandName)
      setFavourites(filteredList);

      // Send new list to local storage
      if (filteredList.length === 0) {
        localStorage.removeItem("favourites")
      } else {
        const newList = filteredList.map((band) => band + "/")
        const newListJSON = JSON.stringify(newList)
        const newListJSON2 = newListJSON.substring(2, newListJSON.lastIndexOf(`"]`))
        localStorage.setItem("favourites", newListJSON2)
      }
    }


    function handleStageClick(stage) {
    setSelectedStage(stage);
  }

  function handleDayClick(day) {
    setSelectedDay(day);
  }

  function handleChange(e) {
    setSelectedAct(e.target.value);
  }


  return (
    <>
    <Head>
      <title>Personal Program</title>
    </Head>
    <div className="max-w-screen-xl my-32 m-auto bg-gradient-to-b from-color-black to-color-blue">
            <h1 className="uppercase text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
       Your program
      </h1>
      <p className="text-center mt-16 max-w-prose mx-auto">We collected all your favourite bands, in your own personal program below.</p>
      <p className="text-center mt-5 max-w-prose mx-auto">Want to remove a band from your favourites? Just press the heart and we'll remove them.</p>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row-reverse justify-center gap-2 mt-16">
          <div className=" flex justify-center w-64 sm:w-80 md:w-96 mx-auto lg:mx-0">
          <TextField
            className="w-full"
            onChange={handleChange}
            label="Search for band"
            ></TextField>
            </div>
          <FilterbuttonsStage
            schedule={schedule}
            onClick={handleStageClick}
            selectedAct={selectedAct}
          />
        </div>
        <FilterbuttonsDay
          schedule={schedule}
          onClick={handleDayClick}
          selectedAct={selectedAct}
          selectedDay={selectedDay}
        />
      </div>
      {favourites === null ? <>
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rectangular" width={210} height={60} />
      </>
      : 
      <Schedule schedule={schedule} selectedStage={selectedStage} selectedDay={selectedDay} selectedAct={selectedAct} bands={bands} handleDialogClickOpen={handleDialogClickOpen} favourites={favourites} />
      }
      <Dialog
        open={dialogOpen[0]}
        onClose={handleDialogKeep}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Remove "${dialogOpen[1]}", from favourites?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`
              Are you sure youn want to delete "${dialogOpen[1]}" from your favourite list? 
            `}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="success" onClick={handleDialogKeep}>Keep as favourites</Button>
          <Button variant="outlined" color="error" onClick={handleDialogRemove} autoFocus>
            Remove from favourites
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}

function Schedule({ schedule, selectedStage, selectedDay, selectedAct, bands, handleDialogClickOpen, favourites }) {


  return (
    <div className="schedule">
      {/* Denne function gør at vi kan filtrere på hvilke scener der skal vises */}
      {Object.keys(schedule)
        .filter(stage => (!selectedStage || stage === selectedStage))
        .map(stage => {
          if(selectedStage === (stage)) { 
{/* ----------------------------------------- */}
            return <div key={stage}>
            <ObjectDay
              schedule={schedule}
              stage={...schedule[stage]}
              selectedDay={selectedDay}
              selectedAct={selectedAct}
              bands={bands}
              handleDialogClickOpen={handleDialogClickOpen}
              favourites={favourites}
              />
          </div>} else {
{/* ----------------------------------------- */}
            return <div key={stage}>
            <h2 className="uppercase text-4xl text-center my-20 mt-40">{stage}</h2>
            <ObjectDay
              schedule={schedule}
              stage={...schedule[stage]}
              selectedDay={selectedDay}
              selectedAct={selectedAct}
              bands={bands}
              handleDialogClickOpen={handleDialogClickOpen}
              favourites={favourites}
            />
          </div>
          }
})}
    </div>
  );
}

function ObjectDay({stage, selectedDay, selectedAct, bands, handleDialogClickOpen, favourites }) {

  const fullDayName = (day) => {
    if (day === "mon") {
      return "Monday"
    } else if (day === "tue") {
      return "Tuesday"
  } else if (day === "wed") {
      return "Wednesday"
  } else if (day === "thu") {
      return "Thursday"
  } else if (day === "fri") {
      return "It's Friday, Friday, Gotta get down on Friday"
  } else if (day === "sat") {
      return "Saturday"
  } else if (day === "sun") {
      return "Sunday"
  }
}

  {/*  Denne function gør at vi kan filtrere på hvilken dag der skal vises program for */}
  return Object.keys(stage)
    .filter(day => (!selectedDay || day === selectedDay))
    .map(day => {
{/* ----------------------------------------- */}
if (selectedDay === (day) ){
  return <div  key={day}>
        <h3 className="text-3xl uppercase text-center my-16" >{fullDayName(day)}</h3>
        <div key={day} className="bandList grid sm:grid-cols-1 md:grid-cols-2 md:mb-4 lg:grid-cols-3 ">
        <ObjectBand days={...stage[day]} selectedAct={selectedAct} bands={bands} handleDialogClickOpen={handleDialogClickOpen} favourites={favourites} />
        </div>
      </div>
    } else { 
      {/* ----------------------------------------- */}
      return <div key={day}>
        <h3 className="text-3xl uppercase text-center mt-20 mb-14" >{fullDayName(day)}</h3>
        <div key={day} className="bandList grid sm:grid-cols-1 md:grid-cols-2 md:mb-4 lg:grid-cols-3">
        <ObjectBand days={...stage[day]} selectedAct={selectedAct} bands={bands} handleDialogClickOpen={handleDialogClickOpen} favourites={favourites} />
        </div>
      </div>
}});
}

function ObjectBand({ days, selectedAct, bands, handleDialogClickOpen, favourites }) {

const [checked, setChecked] = React.useState(true)

  const bandSlug = (name) => {
    for (let i = 0; i < bands.length; i++) {
      if (name === bands[i].name) {
        return bands[i].slug
      }
    }
  }

  {/* Baggrundsbillede */}
    const backgroundImage = (name) => {
    for (let i = 0; i < bands.length; i++) {
      if (name === bands[i].name) {
        return bands[i].logo.startsWith("https://") ? `url("${bands[i].logo}"` : `url("https://scratched-bronze-lingonberry.glitch.me/logos/${bands[i].logo}")`;
      }
    }
  };

 {/* Søgefunktion */}
  return (
    Object.values(days).filter(band => band.act.toLowerCase() !== "break" && (!selectedAct || band.act.toLowerCase().includes(selectedAct)) && favourites.includes(band.act)).map(band => (

    <div key={band.act} 
    style={{ backgroundImage: backgroundImage(band.act) }} 
    className="bandcontainer relative grid items-start justify-items-center bg-cover bg-no-repeat h-96 pb-110 border-b-2 border-color-white last:border-none  md:border-none" >
      
      <div className="iconContainer absolute top-5 right-5 w-3 h-3 bg-color-yellow p-5 rounded-full flex items-center justify-center">
      <Checkbox
      onClick={() => handleDialogClickOpen(band.act)}
      checked={checked}
      // handleChange={handleChange}
      value={band.act}
      className="p-0"
      icon={<Favorite />}
      checkedIcon={<Favorite />}
      color="error"
      sx={{
        "& .MuiSvgIcon-root": { fontSize: 30 },
      }}
      />
      
      </div>
      
      <Anchor  href={`/bands/${bandSlug(band.act)}`}  className="flex flex-col w-full h-full justify-between bg-color-black bg-opacity-50 lg:hover:bg-opacity-0 transition">
      <span className="text-color-black font-sans uppercase font-bold pt-5 place-self-center w-fit px-6 mx-6 mt-20 py-3 text-3xl text-center bg-color-white">{band.act}</span>
      <span className="timeslot text-color-black font-sans uppercase font-bold pt-2 place-self-center w-max px-6 mx-6 mb-20 py-1 text-2xl text-center bg-color-white lg:opacity-0 md:transition">
      {band.start} - {band.end}
      </span>
      </Anchor>
      </div>
  )))
  }
    
export async function getServerSideProps() {
  const apiUrl = apiConfig[process.env.NODE_ENV].apiUrl;

  {/* Fetch post data from API using the ID parameter */}

  const [res1, res2, res3] = await Promise.all([fetch(`${apiUrl}/bands`), fetch(`${apiUrl}/schedule`), fetch(`${apiUrl}/events`)]);

  const bands = await res1.json();
  const schedule = await res2.json();
  const event = await res3.json();

  {/* Pass the post data as props to the page */}
  return {
    props: {
      bands,
      schedule,
      event,
    },
  };
}
