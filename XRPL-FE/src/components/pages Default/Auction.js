import React from 'react';
import ColumnAuctionRedux from '../components/ColumnAuctionRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';

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



const explore= () => (
<div>
<GlobalStyles/>
  <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'./img/background/subheader.jpg'})`}}>
    <div className='mainbreadcumb'>
      <div className='container'>
        <div className='row m-10-hor'>
          <div className='col-12'>
            <h1 className='text-center'>Live Auction</h1>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className='container'>
    <ColumnAuctionRedux/>
  </section>


  <Footer />
</div>

);
export default explore;