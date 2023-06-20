import React from "react";
import { ObjectDay } from "@/components/ObjectDay";
import { SearchedBands } from "@/components/SearchedBands";
import { ObjectBand } from "./ObjectBand";

export function Schedule({ schedule, selectedStage, selectedDay, selectedAct, selectedFav, selectedChar, bands, LocalStorageFavourite, localChecked, favourites }) {

  if (selectedAct !== "") {
    return <SearchedBands bands={bands} schedule={schedule} selectedAct={selectedAct} LocalStorageFavourite={LocalStorageFavourite} localChecked={localChecked} />;
  }

  return (
    <div className="schedule">
      {/* Denne function gør at vi kan filtrere på hvilke scener der skal vises */}
      {Object.keys(schedule)
        .filter(stage => !selectedStage || stage === selectedStage)
        .map(stage => {
            /* --------------------------------------- */
            return <div key={stage}>
            {/* Har lavet h2 om til ternary for at spare plads og kodelinjer */}
            {selectedStage !== (stage) && selectedChar == "" ? <h2 className="uppercase text-4xl md:text-5xl lg:text-7xl text-center my-6 md:my-10 lg:my-20 md:mt-18 lg:mt-30">{stage}</h2> : ""}  
              <ObjectDay
                schedule={schedule}
                stage={...schedule[stage]}
                selectedDay={selectedDay}
                selectedAct={selectedAct}
                selectedFav={selectedFav}
                selectedChar={selectedChar}
                bands={bands}
                LocalStorageFavourite={LocalStorageFavourite}
                localChecked={localChecked} 
                favourites={favourites}/>
            </div>;
          }
        )}
    </div>
  );
}
