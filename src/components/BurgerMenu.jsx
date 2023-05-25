import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import classNames from "classnames";
import Anchor from "./Anchor";
import { useState } from "react";

export default function TemporaryDrawer() {
  const [opened, setOpened] = useState(false);
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = anchor => event => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpened(!opened);
    setState(prevState => ({
      ...prevState,
      [anchor]: !prevState[anchor],
    }));
  };

  const list = anchor => (
    <Box
      className="flex flex-col justify-items-center"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor)}
      onKeyDown={toggleDrawer(anchor)}
    >
      <List>
        {["Program", "Tickets", "News", "Volunteer"].map(text => (
          <ListItem
            className="flex"
            key={text}
            disablePadding
          >
            <ListItemButton>
              <Anchor
                className="font-sans"
                href={`./${text.toLowerCase()}`}
              >
                <p className="font-sans text-3xl font-black uppercase text-color-white">{text}</p>
              </Anchor>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="flex">
      {["right"].map(anchor => (
        <React.Fragment key={anchor}>
          <Example
            toggleDrawer={toggleDrawer(anchor)}
            opened={opened}
            setOpened={setOpened}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

function Example({ toggleDrawer, opened, setOpened }) {
  function handleClick() {
    toggleDrawer();
    setOpened(!opened);
  }

  return (
    <div className="py-4 px-4">
      <div
        onClick={handleClick}
        className={classNames("tham tham-e-squeeze tham-w-6", {
          "tham-active": opened,
        })}
      >
        <div className="tham-box">
          <div className="tham-inner bg-color-white" />
        </div>
      </div>
    </div>
  );
}
