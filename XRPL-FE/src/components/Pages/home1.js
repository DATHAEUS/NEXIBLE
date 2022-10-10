import React from 'react';
import Particle from '../components/Particle';
import SliderMainParticle from '../components/SliderMainParticle';
import FeatureBox from '../components/FeatureBox';
import CarouselCollectionRedux from '../components/CarouselCollectionRedux';
import ColumnNewRedux from '../components/ColumnNewRedux';
import AuthorListRedux from '../components/AuthorListRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import Heading from '../components/Heading/index';
import Wallet from '../components/wallet';
import ColumnNewsound from '../components/ColumnNewsound';
import ColumnAuctionRedux from '../components/ColumnAuctionRedux';

const GlobalStyles = createGlobalStyle`
 @media only screen and (max-width: 1199px) {
    .navbar{
      background: rgb(4, 17, 243) ;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;


const homeOne = () => (
  <div>
    <GlobalStyles />
    <section className="jumbotron no-bg" style={{ backgroundImage: `url(${'./img/background/2.jpg'})` }}>
      <Particle />
      <SliderMainParticle />
    </section>

    <section className='container' style={{ paddingBottom: "0px" }}>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='text-center'>
            <Heading text={"LIVE AUCTIONS"} />
          </div>
        </div>
      </div>
      <ColumnAuctionRedux />
    </section>

    <section className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='text-center'>
            <Heading text={"BROWSE BY CATEGORY"} />
          </div>
        </div>
      </div>
      <ColumnNewsound />
    </section>

    <section className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='text-center'>
            <Heading text={"TOP SELLERS"} />
          </div>
        </div>
        <div className='col-lg-12'>
          <AuthorListRedux />
        </div>
      </div>
    </section>

    <section className='container-fluid bg-gray'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='text-center'>
            <Heading text={"EXCLUSIVE NFT DROPS"} />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <CarouselCollectionRedux />
          </div>
        </div>
      </div>
    </section>


    <section className='container-fluid bg-gray'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='text-center'>
            <Heading text={"OUR BLOG POSTS"} />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <CarouselCollectionRedux />
          </div>
        </div>
      </div>
    </section>

    <Footer />

  </div>
);
export default homeOne;