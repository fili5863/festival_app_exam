import React from "react";
import { ObjectDay } from "@/components/ObjectDay";
import { SearchedBands } from "@/components/SearchedBands";

export function Schedule({ schedule, selectedStage, selectedDay, selectedAct, bands, LocalStorageFavourite, localChecked }) {

  if (selectedAct !== "") {
    return <SearchedBands bands={bands} schedule={schedule} selectedAct={selectedAct} LocalStorageFavourite={LocalStorageFavourite} localChecked={localChecked} />;
  }

  return (
    <div className="schedule">
      {/* Denne function gør at vi kan filtrere på hvilke scener der skal vises */}
      {Object.keys(schedule)
        .filter(stage => !selectedStage || stage === selectedStage)
        .map(stage => {
          if (selectedStage === (stage)) {
            /* --------------------------------------- */
            return <div key={stage}>
              <ObjectDay
                schedule={schedule}
                stage={...schedule[stage]}
                selectedDay={selectedDay}
                selectedAct={selectedAct}
                bands={bands}
                LocalStorageFavourite={LocalStorageFavourite}
                localChecked={localChecked} />
            </div>;
          } else {
            /* --------------------------------------- */
            return <div key={stage}>
              <h2 className="uppercase text-4xl md:text-5xl lg:text-7xl text-center my-6 md:my-10 lg:my-20 md:mt-18 lg:mt-30">{stage}</h2>
              <ObjectDay
                schedule={schedule}
                stage={...schedule[stage]}
                selectedDay={selectedDay}
                selectedAct={selectedAct}
                bands={bands}
                LocalStorageFavourite={LocalStorageFavourite}
                localChecked={localChecked} />
            </div>;
          }
        })}
    </div>
  );
}
