import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import { createGlobalStyle } from 'styled-components';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const inline = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  .d-inline{
    display: inline-block;
   }
`;


const GlobalStyles = createGlobalStyle`
.mainRow{
  width:80%;
  @media only screen and (max-width: 1024px) {
    width: 90%;
    }
@media only screen and (max-width: 500px) {
width:100%
}
}
.h5TextHead{
  font-weight: 100 !important; 
}
`;


const slidermainparticle = () => {
  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          // background: {
          //   // color: {
          //   //   value: "#00000033",
          //   // },
          //   position: 'absolute'
          // },
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999
          },
          fpsLimit: 1200,

          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="container" style={{ "display": "flex", "alignItems": "center", "alignContent": "center", "justifyContent": "center", "width": "100%", "padding": "0px", "textAlign": "center", "height": "90vh" }}>
        <GlobalStyles />
        <div className="row align-items-center mainRow">
          <div className="col-md-12">
            <div className='innerMainRow'>

              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
                <h1 className="col-white SectionSubSecBoxShadow">Hello NFT :)</h1>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
                <h2 className="col-white SectionSubSecBoxShadow">Create, Sell or Collect Digital Items.</h2>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
                <h5 className="col-white SectionSubSecBoxShadow h5TextHead">
                  Nexible is an NFT Marketplace built on XRPL for almost zero fees and lightning fast speed 
                  <br/>
                  {/* <br/> */}
                  We make NFTs simple...
                  <br/>
                  {/* <br/> */}
                  Our Mission is Charity and Helping those who cannot help themselves
                </h5>
              </Reveal>

              <div className="spacer-10"></div>
              <Reveal className='onStep d-inline' keyframes={inline} delay={800} duration={900} triggerOnce>
                <span onClick={() => window.open("#", "_self")} className="btn-main inline lead"><span className='whiteBackground'></span> <span>Explore</span></span>
                {/* <span onClick={() => window.open("#", "_self")} className="btn-main inline lead"
                  onMouseOver={(ev) => { ev.currentTarget.classList.add('mouseIn'); ev.currentTarget.classList.remove('mouseOut'); }}
                  onMouseLeave={(ev) => { ev.currentTarget.classList.add('mouseOut'); ev.currentTarget.classList.remove('mouseIn'); setTimeout(() => { ev.currentTarget?.classList.remove('mouseOut'); }, 500) }}><span className='whiteBackground'></span> <span>Explore</span></span> */}
                <span onClick={() => window.open("#", "_self")} className="btn-main inline white lead">Create</span>
                <div className="mb-sm-30"></div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

    </>

  )
};
export default slidermainparticle;