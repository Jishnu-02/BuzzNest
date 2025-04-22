import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo/logo2.svg";

// Styled Components
const TransparentAppBar = styled(AppBar)({
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(1px)",
    boxShadow: "none",
});

const LogoImg = styled("img")({
    height: 40,
});

const NavButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    margin: theme.spacing(0, 1),
    fontWeight: 500,
    position: "relative",
    "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: "rgba(255,255,255,0.1)",
    },
    "&.active": {
        color: theme.palette.primary.main,
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "50%",
            height: 2,
            backgroundColor: theme.palette.primary.main,
        },
    },
}));

const FullScreenDrawer = styled(Box)(({ theme }) => ({
    height: "100vh",
    width: "100vw",
    backgroundColor: "#111",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
}));

const MobileNavItem = styled(Typography)(({ theme }) => ({
    fontSize: "1.8rem",
    margin: theme.spacing(2, 0),
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "white",
    fontWeight: 600,
    "&:hover": {
        color: theme.palette.primary.main,
        transform: "scale(1.1)",
    },
    "&.active": {
        color: theme.palette.primary.main,
        transform: "scale(1.1)",
    },
}));

const CloseButton = styled(IconButton)({
    position: "absolute",
    top: 20,
    right: 20,
    color: "#fff",
});

const Navbar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];

    const handleDrawerToggle = () => setOpenDrawer(!openDrawer);

    const handleNavigation = (path) => {
        navigate(path);
        setOpenDrawer(false);
    };

    return (
        <>
            <TransparentAppBar position="absolute">
                <Toolbar sx={{ justifyContent: "space-between", minHeight: "70px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LogoImg src={Logo} alt="logo" />
                    </Box>

                    {/* Desktop Nav */}
                    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                        {navItems.map((item) => (
                            <NavButton
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={location.pathname === item.path ? "active" : ""}
                                sx={{fontWeight: "600", fontSize: "1rem"}}
                            >
                                {item.label}
                            </NavButton>
                        ))}
                    </Box>

                    <Box sx={{ display: { xs: "none", sm: "flex" }, fontWeight: "600", fontSize: "1rem" }}>
                        Login/Signup
                    </Box>

                    {/* Hamburger Icon */}
                    <IconButton
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ display: { xs: "block", sm: "none" }, color: "white" }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </TransparentAppBar>

            {/* Fullscreen Drawer */}
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={handleDrawerToggle}
                transitionDuration={400}
                PaperProps={{ sx: { backgroundColor: "transparent", boxShadow: "none" } }}
            >
                <FullScreenDrawer>
                    {/* Close button */}
                    <CloseButton onClick={handleDrawerToggle}>
                        <CloseIcon />
                    </CloseButton>

                    {/* Logo at the top of drawer */}
                    <Box sx={{ position: "absolute", top: 20, left: 20, display: "flex", alignItems: "center", gap: 1 }}>
                        <LogoImg src={Logo} alt="logo" />
                    </Box>

                    {/* Nav items */}
                    <List sx={{ mt: 12 }}> {/* pushes nav items down below logo */}
                        {navItems.map((item) => (
                            <MobileNavItem
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={location.pathname === item.path ? "active" : ""}
                            >
                                {item.label}
                            </MobileNavItem>
                        ))}
                    </List>
                </FullScreenDrawer>
            </Drawer>

        </>
    );
};

export default Navbar;
