import React from "react";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

export function FilterbuttonsStage({ schedule, onClick, selectedAct }) {
  if (selectedAct !== "") {
    return;
  }

  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex justify-center">
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        className=""
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
      >
        <Tab
          sx={{ color: "#fff" }}
          value="one"
          label="All stages"
          onClick={() => onClick("")}
        />
        {Object.keys(schedule).map(stage => (
          <Tab
            sx={{
              color: "#fff",
            }}
            key={stage}
            value={stage}
            label={stage}
            onClick={() => onClick(stage)}
          />
        ))}
      </Tabs>
    </div>
  );
}
