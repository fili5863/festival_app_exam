import Button from "@mui/material/Button";
import { useState } from "react";

export default function Program({ schedule }) {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  function handleStageClick(stage) {
    setSelectedStage(stage);
  }

  function handleDayClick(day) {
    setSelectedDay(day);
    console.log(day);
  }
  return (
    <div>
      <h1>Program</h1>
      <FilterbuttonsStage schedule={schedule} onClick={handleStageClick} />
      <FilterbuttonsDay schedule={schedule} onClick={handleDayClick} />
      <Schedule schedule={schedule} selectedStage={selectedStage} selectedDay={selectedDay} />
    </div>
  );
}

function FilterbuttonsStage({ schedule, onClick }) {
  return (
    <div className="w-screen">
      <Button onClick={() => onClick("")}>All</Button>
      {Object.keys(schedule).map(stage => (
        <Button key={stage} onClick={() => onClick(stage)}>
          {stage}
        </Button>
      ))}
    </div>
  );
}

function FilterbuttonsDay({ schedule, onClick }) {
  const days = new Set();

  Object.keys(schedule).map(stage => {
    Object.keys(schedule[stage]).map(day => {
      days.add(day);
    });
  });

  return (
    <div className="w-screen">
      {[...days].map(day => (
        <Button key={day} onClick={() => onClick(day)}>
          {day}
        </Button>
      ))}
    </div>
  );
}

function Schedule({ schedule, selectedStage }) {
  return (
    <div className="schedule">
      {Object.keys(schedule)
        .filter(stage => !selectedStage || stage === selectedStage)
        .map(stage => (
          <div key={stage}>
            <h2>{stage}</h2>
            {Object.keys(schedule[stage]).map(day => (
              <div key={day}>
                <h3>{day}</h3>
                {schedule[stage][day].map(timeslot => (
                  <div key={`${timeslot.start}-${timeslot.end}`}>
                    <span>{timeslot.start}</span> - <span>{timeslot.end}</span>
                    <span>{timeslot.act}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export async function getServerSideProps() {
  const api = "http://localhost:8080/schedule";
  const res = await fetch(api);
  const data = await res.json();
  console.log(data);

  return {
    props: {
      schedule: data,
    },
  };
}
