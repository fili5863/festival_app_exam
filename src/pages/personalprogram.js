import Head from "next/head";
import Anchor from "@/components/Anchor";
import Button from "@mui/material/Button";
import Navbar from "@/components/Navbar";
import React from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from "react";
import { ButtonBase, Skeleton, TextField, Checkbox } from "@mui/material";

export default function PersonalProgram({ schedule, bands }) {
  console.log("Schedule", schedule);
  const [favourites, setFavourites] = useState();
  const [dialogOpen, setDialogOpen] = React.useState([false, ""])
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedAct, setSelectedAct] = useState(null);
  const [showTime, setShowTime] = useState(false)

//HAndle the dialog when wanting to remove from favourite
  const handleDialogClickOpen = (band) => {
    setDialogOpen([true, band]);
  };
  const handleDialogKeep = () => {
    setDialogOpen([false, ""]);
  };
  const handleDialogRemove = (band) => {
    setDialogOpen([false, ""]);
  };

  // Useeffect to get data down, from local storage 
  // Make a new state with the favourites (that has all the info), so we can loop through them in the schedule
  useEffect(() => {
    const currentLocal = localStorage.getItem("favourites", JSON.stringify(favourites));

    if (currentLocal !== null) {
      const currentToArray = currentLocal.substring(0, currentLocal.length - 1).split(`/","`);
      console.log("CueToAr", currentToArray);
      // let favouriteArray = []
      // currentToArray.forEach(bandName => {
      //   for (let i = 0; i < bands.length; i++) {
      //     if (bands[i].name === bandName) {
      //       console.log(`Bingo! - ${bandName}`)
      //       favouriteArray.push(bands[i])
      //     }
      //   }
        setFavourites(currentToArray)
      // })
      // setFavourites(currentToArray);
    }
  }, []);

  //Function that listens to favourites and removes from list if they are disabled from person program
  function removeBand(bandName) {
    const filteredList = favourites.filter((band) => band.name !== bandName);
    const newUpdatedLocal = filteredList.map((band) => band + "/");
    console.log("TheFiltering", newUpdatedLocal);
    const NULJSON = JSON.stringify(newUpdatedLocal);
    const NULJSON2 = NULJSON.substring(2, NULJSON.lastIndexOf(`"]`));
    console.log("NULJSON2 - 2", NULJSON2);
    localStorage.setItem("favourites", NULJSON2);
  }



    function handleStageClick(stage) {
    setSelectedStage(stage);
  }

  function handleDayClick(day) {
    setSelectedDay(day);
    console.log(day);
  }

  function handleChange(e) {
    setSelectedAct(e.target.value);
    console.log(e.target.value);
  }


  return (
    <>
    <Head>
      <title>Personal Program</title>
    </Head>
    <div className="max-w-screen-xl my-32 m-auto bg-gradient-to-b from-color-black to-color-blue">
      <h1 className="uppercase text-center text-9xl">Program</h1>
      <TextField onChange={handleChange}></TextField>
      <FilterButtonsStage schedule={schedule} onClick={handleStageClick} />
      <FilterButtonsDay schedule={schedule} onClick={handleDayClick} />
      <button className="text-color-white p-2 border-color-white border-solid" onClick={() => console.log(favourites)}>See Fav</button>
      <Schedule schedule={schedule} selectedStage={selectedStage} selectedDay={selectedDay} selectedAct={selectedAct} bands={bands} handleDialogClickOpen={handleDialogClickOpen} favourites={favourites} />
      <Dialog
        open={dialogOpen[0]}
        onClose={handleDialogKeep}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Remove ${dialogOpen[1]} from favourites?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`
              Are you sure youn want to delete "${dialogOpen[1]}" from your favourite list? 
            `}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogKeep}>Keep as favourites</Button>
          <Button onClick={handleDialogRemove} autoFocus>
            Remove from favourites
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}

function FilterButtonsStage({ schedule, onClick }) {
  return (
    <div className="w-screen">
      <Button onClick={() => onClick("")}>All</Button>
      {Object.keys(schedule).map((stage) => (
        <Button key={stage} onClick={() => onClick(stage)}>
          {stage}
        </Button>
      ))}
    </div>
  );
}

function FilterButtonsDay({ schedule, onClick }) {
  const days = new Set();

  Object.keys(schedule).map((stage) => {
    Object.keys(schedule[stage]).map((day) => {
      days.add(day);
    });
  });

  return (
    <div className="w-screen">
      <Button onClick={() => onClick("")}>All</Button>
      {[...days].map((day) => (
        <Button key={day} onClick={() => onClick(day)}>
          {day}
        </Button>
      ))}
    </div>
  );
}

function Schedule({ schedule, selectedStage, selectedDay, selectedAct, bands, handleDialogClickOpen, favourites }) {

  //   function LocalStorageFavourite(e) {
  //   console.log(e);
  //   if (e.target.checked) {
  //     setSnackOpen([true, e.target.value, `${e.target.value} has been added to favourites.`]);
  //   }
  // }

  //   function closeSnack() {
  //   setSnackOpen([false, "", ""]);
  // }



  return (
    <div className="schedule">
      {/* Denne function gør at vi kan filtrere på hvilke scener der skal vises */}
      {Object.keys(schedule)
        .filter(stage => !selectedStage || stage === selectedStage)
        .map(stage => {
          if(selectedStage === (stage)) { 
/* --------------------------------------- */
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
/* --------------------------------------- */
            return <div key={stage}>
            <h2 className="uppercase text-8xl text-center my-20 mt-40">{stage}</h2>
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

  // {
  //   /* Denne function gør at vi kan filtrere på hvilken dag der skal vises program for */
  // }
  return Object.keys(stage)
    .filter(day => !selectedDay || day === selectedDay)
    .map(day => {
{/* --------------------------------------- */}
     if (selectedDay === (day) ){
      return <div  key={day}>
        <h3 className="text-5xl uppercase text-center my-16" >{fullDayName(day)}</h3>
        <div key={day} className="bandList grid sm:grid-cols-1 md:grid-cols-2 md:mb-4 lg:grid-cols-3 ">
        <ObjectBand days={...stage[day]} selectedAct={selectedAct} bands={bands} handleDialogClickOpen={handleDialogClickOpen} favourites={favourites} />
        </div>
      </div>
    } else { 
 /* --------------------------------------- */
      return <div key={day}>
        <h3 className="text-5xl uppercase text-center mt-28 mb-14" >{fullDayName(day)}</h3>
        <div key={day} className="bandList grid sm:grid-cols-1 md:grid-cols-2 md:mb-4 lg:grid-cols-3">
        <ObjectBand days={...stage[day]} selectedAct={selectedAct} bands={bands} handleDialogClickOpen={handleDialogClickOpen} favourites={favourites} />
        </div>
      </div>
}});
}

function ObjectBand({ days, selectedAct, bands, handleDialogClickOpen, favourites }) {

const [checked, setChecked] = React.useState(true)

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  

  const bandSlug = (name) => {
    for (let i = 0; i < bands.length; i++) {
      if (name === bands[i].name) {
        return bands[i].slug
      }
    }
  }




  /* Baggrundsbillede */
    const backgroundImage = (name) => {
     /* console.log(name); */
    // console.log("bands", bands);
    for (let i = 0; i < bands.length; i++) {
      if (name === bands[i].name) {
        return bands[i].logo.startsWith("https://") ? `url("${bands[i].logo}"` : `url("https://scratched-bronze-lingonberry.glitch.me/logos/${bands[i].logo}")`;
      }
    }
  };
/* Søgefunktion */
  return Object.values(days).filter(band => band.act.toLowerCase() !== "break" && (!selectedAct || band.act.toLowerCase().includes(selectedAct))).map(band => (
    /* --------------------------------------- */
    <div key={band.act} 
    style={{ backgroundImage: backgroundImage(band.act) }} 
    className="bandcontainer relative grid items-start justify-items-center bg-cover bg-no-repeat h-96 pb-110 border-b-2 border-color-white last:border-none  md:border-none" >
      
      <div className="iconContainer absolute top-5 right-5 w-3 h-3 bg-color-yellow p-5 rounded-full flex items-center justify-center">
      <Checkbox
      onClick={() => handleDialogClickOpen(band.act)}
      checked={checked}
      onChange={handleChange}
      value={band.act}
      className="p-0"
      icon={<FavoriteBorder />}
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
      /* --------------------------------------- */
  ))
    }
    
export async function getServerSideProps() {
  // const band = context.params.band;

  // Fetch post data from API using the ID parameter

  const [res1, res2, res3] = await Promise.all([fetch(`http://localhost:8080/bands`), fetch(`http://localhost:8080/schedule`), fetch(`http://localhost:8080/events`)]);

  const bands = await res1.json();
  const schedule = await res2.json();
  const event = await res3.json();

  // Pass the post data as props to the page
  return {
    props: {
      bands,
      schedule,
      event,
    },
  };
}
