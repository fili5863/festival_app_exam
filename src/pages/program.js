import Button from "@mui/material/Button";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import Anchor from "@/components/Anchor";
import Link from "next/link";
import { TextField, Checkbox, Snackbar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { BadgeRounded } from "@mui/icons-material";

export default function Program({ schedule, bands }) {
  // console.log(schedule);
  // console.log(bands);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedAct, setSelectedAct] = useState("");
  const [snackOpen, setSnackOpen] = useState([false, ""]);
  const [favourites, setFavourites] = useState()
  const [showTime, setShowTime] = useState(false)

    useEffect(()=> {
    const currentLocal = localStorage.getItem("favourites", JSON.stringify(favourites))
    console.log("CurrentLocal", currentLocal);
   
    if (currentLocal !== null) {
      const currentToArray = currentLocal.split(`","`)
      console.log("currentToArray", currentToArray);
      setFavourites(currentToArray)
    } 
    else {
      console.log("LocalStorage is Empty")
    }
  },[])

    useEffect(()=> {
      const favToString = JSON.stringify(favourites)
      console.log("FavToString", favToString);
      if (favToString !== undefined || favToString === []) {
        const editFav = favToString.substring(2, favToString.lastIndexOf(`"]`))
        localStorage.setItem("favourites", editFav)
        // console.log("editFav", editFav);
      } else {
        localStorage.removeItem("favourites")
      }
  }, [favourites])

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
    console.log("length", setSelectedAct.length);
  }

  const sleep = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

const LocalStorageFavourite = (e) => {
    // console.log(e)
    if (snackOpen[0] === true) {
      closeSnack
      sleep(500).then(() => {
      if(e.target.checked === true) {
        setSnackOpen([true, `${e.target.value} has been added to favourites`])
        // localStorage.setItem("favourites", JSON.stringify(favourites));
      } else {
        setSnackOpen([true, `${e.target.value} has been removed from favourites`])
      }
    })
      } else if (snackOpen[0] === false) {
      e.target.checked === true ?
      setSnackOpen([true, `${e.target.value} has been added to favourites`])
      :
      setSnackOpen([true, `${e.target.value} has been removed from favourites`])
      }
      CheckFavourites(e.target.value, e.target.checked)
    }

    function closeSnack() {
    setSnackOpen([false, ""]);
  }

  function CheckFavourites(band, i) {
    if (i === true) {
      if (favourites === undefined) {
        setFavourites([`${band}/`])
      } else {
        setFavourites([...favourites, `${band}/`])
      }
    } else {
      if (favourites.length === 0) {
        setFavourites()
      } else {
        const newFavourites = favourites.filter(fav => fav != `${band}/`)
        setFavourites(newFavourites)
      }
    }
    console.log("CheckFav", favourites)
  }

    const action = (
    <>
    <Anchor href="personalprogram">
      <Button color="success" size="small">
        See Personal Program
      </Button>
    </Anchor>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const localChecked = (band) => {
    if (favourites !== undefined) {
      for (let i = 0; i < favourites.length; i++) {
        if (favourites[i].substring(0,favourites[i].lastIndexOf("/") ) === band) {
          console.log(favourites[i].substring(0,favourites[i].lastIndexOf("/")))
          console.log(band)
          return "checked"
        }
      } 
    } else {
      return ""
    }
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
    <div className="max-w-screen-xl my-32 m-auto bg-gradient-to-b from-color-black to-color-blue">
      <h1 className="uppercase text-center text-9xl">Program</h1>
      <TextField onChange={handleChange} placeholder="Search for band"></TextField>
      <FilterbuttonsStage schedule={schedule} onClick={handleStageClick} selectedAct={selectedAct} />
      <FilterbuttonsDay schedule={schedule} onClick={handleDayClick} selectedAct={selectedAct}/>
      <span className="text-color-white text-xl">{favourites}</span>
      <Schedule schedule={schedule} selectedStage={selectedStage} selectedDay={selectedDay} selectedAct={selectedAct} bands={bands} LocalStorageFavourite={LocalStorageFavourite} localChecked={localChecked} />
      <Snackbar open={snackOpen[0]} autoHideDuration={4000} onClose={closeSnack} message={snackOpen[1]} action={action} />;
    </div>
  );
}

function FilterbuttonsStage({ schedule, onClick, selectedAct }) {
if (selectedAct !== "") {
  return
}

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

function FilterbuttonsDay({ schedule, onClick, selectedAct }) {
  
  const days = new Set();

  Object.keys(schedule).map((stage) => {
    Object.keys(schedule[stage]).map((day) => {
      days.add(day);
    });
  });

  if (selectedAct !== "") {
    return
  }

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

function Schedule({ schedule, selectedStage, selectedDay, selectedAct, bands, LocalStorageFavourite, localChecked }) {

  //   function LocalStorageFavourite(e) {
  //   console.log(e);
  //   if (e.target.checked) {
  //     setSnackOpen([true, e.target.value, `${e.target.value} has been added to favourites.`]);
  //   }
  // }

  //   function closeSnack() {
  //   setSnackOpen([false, "", ""]);
  // }




if (selectedAct !== "") {
  return <SearchedBands bands={bands} schedule={schedule} selectedAct={selectedAct}LocalStorageFavourite={LocalStorageFavourite} localChecked={localChecked}/>
}

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
              LocalStorageFavourite={LocalStorageFavourite}
              localChecked={localChecked}
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
              LocalStorageFavourite={LocalStorageFavourite}
              localChecked={localChecked}
            />
          </div>
          }
})}
    </div>
  );
}

function ObjectDay({stage, selectedDay, selectedAct, bands, LocalStorageFavourite, localChecked }) {

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
     if (selectedDay === (day)){
      return <div  key={day}>
      
        <div key={day} className="bandList grid sm:grid-cols-1 md:grid-cols-2 md:mb-4 lg:grid-cols-3 ">
        <ObjectBand days={...stage[day]} selectedAct={selectedAct} bands={bands} LocalStorageFavourite={LocalStorageFavourite} localChecked={localChecked} />
        </div>
      </div>
    } else { 
 /* --------------------------------------- */
      return <div key={day}>
        <h3 className="text-5xl uppercase text-center mt-28 mb-14" >{fullDayName(day)}</h3>
        <div key={day} className="bandList grid sm:grid-cols-1 md:grid-cols-2 md:mb-4 lg:grid-cols-3">
        <ObjectBand days={...stage[day]} selectedAct={selectedAct} bands={bands} LocalStorageFavourite={LocalStorageFavourite} localChecked={localChecked} />
        </div>
      </div>
}});
}

function ObjectBand({ days, selectedAct, bands, LocalStorageFavourite, localChecked }) {

  // console.log("days", days)
  // console.log("selectedAct", selectedAct)
 /*  console.log("bands", bands) */
  
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
{/* --------------------------------------- */}
    <div className="iconContainer absolute top-5 right-5 w-3 h-3 bg-color-yellow p-5 rounded-full flex items-center justify-center">
      <Checkbox
        onClick={LocalStorageFavourite}
        checked={localChecked(band.act)}
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
{/* --------------------------------------- */}
      <Anchor  href={`/bands/${bandSlug(band.act)}`}  className="flex flex-col w-full h-full justify-between bg-color-black bg-opacity-50 lg:hover:bg-opacity-0 transition">
      <span className="text-color-black font-sans uppercase font-bold pt-5 place-self-center w-fit px-6 mx-6 mt-20 py-3 text-3xl text-center bg-color-white">{band.act}</span>
      <span className="timeslot text-color-black font-sans uppercase font-bold pt-2 place-self-center w-max px-6 mx-6 mb-20 py-1 text-2xl text-center bg-color-white lg:opacity-0 md:transition">
      {band.start} - {band.end}
      </span>
      </Anchor>
      </div>
))

}


function SearchedBands({bands, schedule, selectedAct, LocalStorageFavourite, localChecked}) {
   
let allBands = []
/* Tager alle acts ud af dage og stages og smider i et stort array */
Object.values(schedule).map(stage => {Object.values(stage).map(day =>  { for (let i = 0; i < day.length; i++) {
  allBands.push(day[i])}
  
})})

 /* var midArray = schedule.Midgard
  var VanaArray = schedule.Vanaheim
  var JotunArray = schedule.Jotunheim */

/* Object.values(midArray).map(day =>  { for (let i = 0; i < day.length; i++) {
  bandSearchList.push(day[i])}
  
})
Object.values(VanaArray).map(day =>  { for (let i = 0; i < day.length; i++) {
  bandSearchList.push(day[i])}
  
})
Object.values(JotunArray).map(day =>  { for (let i = 0; i < day.length; i++) {
  bandSearchList.push(day[i])}
  
}) */


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

  return <div className="bandList grid sm:grid-cols-1 md:grid-cols-2 md:mb-4 lg:grid-cols-3 ">
  {allBands.filter(band => band.act.toLowerCase() !== "break" && (!selectedAct || band.act.toLowerCase().includes(selectedAct))).map(band => (
    /* --------------------------------------- */
    <div key={band.act} 
    style={{ backgroundImage: backgroundImage(band.act) }} 
    className="bandcontainer relative grid items-start justify-items-center bg-cover bg-no-repeat h-96 pb-110 border-b-2 border-color-white last:border-none  md:border-none" >
{/* --------------------------------------- */}
    <div className="iconContainer absolute top-5 right-5 w-3 h-3 bg-color-yellow p-5 rounded-full flex items-center justify-center">
      <Checkbox
        onClick={LocalStorageFavourite}
        checked={localChecked(band.act)}
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
{/* --------------------------------------- */}
      <Anchor  href={`/bands/${bandSlug(band.act)}`}  className="flex flex-col w-full h-full justify-between bg-color-black bg-opacity-50 lg:hover:bg-opacity-0 transition">
      <span className="text-color-black font-sans uppercase font-bold pt-5 place-self-center w-fit px-6 mx-6 mt-20 py-3 text-3xl text-center bg-color-white">{band.act}</span>
      </Anchor>
      </div>
))}
  </div>
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
