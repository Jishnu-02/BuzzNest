import React from "react";
import { Box, Container, Typography, IconButton, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { styled } from "@mui/system";
import Logo from "../assets/images/logo/logo2.svg";

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "#111",
    color: "#fff",
    padding: theme.spacing(4, 0),
    textAlign: "center",
    position: "relative",
}));

const SocialIconsContainer = styled(Box)(({ theme }) => ({
    margin: theme.spacing(2, 0),
}));

const FooterLink = styled(Link)(({ theme }) => ({
    color: "#fff",
    margin: theme.spacing(0, 2),
    fontWeight: 500,
    textDecoration: "none",
    "&:hover": {
        color: theme.palette.primary.main,
    },
}));

const Footer = () => {
    return (
        <FooterContainer>
            <Container>
                <Box sx={{ justifyContent: "space-around", display: "flex" }}>
                    <Box>
                        <Box>
                            <img src={Logo} alt="logo" />
                        </Box>
                        <Box>
                            <span>
                                We turn your ideas into seamless event experiences
                                <br />from planning to promotion and hassle-free ticket booking.
                            </span>
                        </Box>
                    </Box>
                    <Box>
                        <SocialIconsContainer>
                            <IconButton color="inherit" href="https://facebook.com" target="_blank">
                                <Facebook />
                            </IconButton>
                            <IconButton color="inherit" href="https://twitter.com" target="_blank">
                                <Twitter />
                            </IconButton>
                            <IconButton color="inherit" href="https://instagram.com" target="_blank">
                                <Instagram />
                            </IconButton>
                            <IconButton color="inherit" href="https://linkedin.com" target="_blank">
                                <LinkedIn />
                            </IconButton>
                        </SocialIconsContainer>
                    </Box>
                </Box>

                {/* Copyright Text */}
            </Container>
            <Box>
                <Typography variant="body2" sx={{ mt: 6, pt: 6, borderTop: 'aliceblue 2px solid' }}>
                    &copy; {new Date().getFullYear()} BuzzNest. All rights reserved.
                </Typography>
            </Box>
        </FooterContainer>
    );
};

export default Footer;
