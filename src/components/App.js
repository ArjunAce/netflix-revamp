import React from "react";
import Home from './Home'
import Gallery from './Gallery'
import About from './About'
import Footer from './Footer'
import styles from './../styles/app.module.scss';

const App = () => {
  return (
    <React.Fragment>
      <Home />
      <Gallery />
      <About />
      <Footer />
    </React.Fragment>
  );
};

export default App;
