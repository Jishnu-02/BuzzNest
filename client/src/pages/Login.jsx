import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SharedLogin from "../components/login/SharedLogin";

const Login = () => {
    return (
        <>
            <Navbar />
            <SharedLogin />
            <Footer />
        </>
    )
}

export default Login