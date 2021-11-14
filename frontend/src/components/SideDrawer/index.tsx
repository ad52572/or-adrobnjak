import { Button, SwipeableDrawer } from "@material-ui/core";
import { Fragment, ReactElement, useState } from "react";
import SideDrawerProps from "./models/SideDrawerProps";
import MenuIcon from "@material-ui/icons/Menu";
import { colors } from "../../constants/colors";

const SideDrawer = ({ children }: SideDrawerProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Fragment key={"right"}>
        <Button onClick={toggleDrawer}>
          <MenuIcon style={{ fill: colors.white }} />
        </Button>
        <SwipeableDrawer
          anchor={"right"}
          open={isOpen}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
          disableSwipeToOpen
          minFlingVelocity={600}
        >
          {children}
        </SwipeableDrawer>
      </Fragment>
    </>
  );
};

export default SideDrawer;
