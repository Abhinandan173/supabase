import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>

                    {/* Left side: Home Icon */}
                    <IconButton color="inherit" onClick={() => navigate("/")}>
                        <HomeIcon />
                    </IconButton>

                    {/* Center Title (Optional) */}
                    <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
                        Village Connect
                    </Typography>

                    {/* Right side: Hamburger icon */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>

            {/* Drawer opens from RIGHT */}
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <List sx={{ width: 250 }}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { navigate("/"); setOpen(false); }}>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>

                    <Divider />

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { navigate("/create-store"); setOpen(false); }}>
                            <ListItemText primary="Create Store" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default Header;
