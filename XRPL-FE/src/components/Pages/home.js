import React, { useEffect } from "react";
import ColumnNewsound from "../components/ColumnNewsound";
import AuthorListRedux from "../components/AuthorListRedux";
import Catgor from "../components/Catgor";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import Particle from "../components/Particle";
import SliderMainParticle from "../components/SliderMainParticle";
import Heading from "../components/Heading";
import ColumnWithOutTime from "../components/ColumnWithOutTime";
import VideoMob from "../../assets/Images/VideoMob.mp4";
import Video from "../../assets/Images/Video.mp4";
import thumbnail from "../../assets/Images/thumbnail.png";
import thumbnailMob from "../../assets/Images/thumbnailMob.png";
import FeatureBox from "../components/FeatureBox";
import { getAllBlogs } from "../../store/actions/thunks";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NexibleLogoFit from "../../assets/Images/Nexible.png";
const GlobalStyles = createGlobalStyle`
.h-vh{
  height: 100vh !important;
}
.Video{
  height:90vh;
    width: 100vw;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: cover;
    object-position: 0px 67.2%;
    /* top: 0; */
    -webkit-transform: scaley(0.9);
    -webkit-transform: scalex(1);
    @media only screen and (max-width: 1024px) {
      object-position: right;
      }
      @media only screen and (max-width: 500px) {
        object-position: 78% 0px;
        }
  }
  .videoMob{
display: none
  }
  .SectionSubSecBoxShadow{
    z-index: 100;
  }
  @media only screen and (max-width: 500px) {
  .Video{height:100vh}
  .videoPc{
   display: none 
  }
  .videoMob{
    display: block
  }
  .SectionMain{height:100vh !important,position:relative}
  }
@media only screen and (max-width: 1199px) {
  .navbar{
    background: rgb(4, 17, 243) ;
  }
  .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
    background: #fff;
  }
  .item-dropdown .dropdown a{
    color: #fff !important;
    import { *asYup } from 'yup';

  }
  `;

// Video Old Style
// .Video{
//   height: auto; width: 100vw; position: absolute; right: 0; bottom: 0; left: 0; top: 0
// }
// @media only screen and (max-width: 800px) {
//   .Video{
//     height: 100vh; width: auto; position: absolute; right: 0; bottom: 0; left: 0; top: 0
//   }
// }
// @media only screen and (max-width: 500px) {
//   .Video{
//     height: 150vh; width: auto; position: absolute; right: 0; bottom: 0; left: 0; top: 0
//   }
// }
export const dateFormat = (dateData) => {
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let newDate = new Date(dateData);
  let currMonth = month[newDate.getMonth()];
  let date = newDate.getDate();
  let year = newDate.getFullYear();

  return `${currMonth} ${date}, ${year}`;
};

const Hometwo = (props) => {
  const [visible, setVisible] = useState(3);
  const blogs = useSelector((e) => e.blogs.blogs);
  console.log("blogs=>", blogs);
  useEffect(() => {
    window.scrollTo(0, 0);
    props.getAllBlogs();

    // var e = document.getElementById("myVideo");
    // e.style.opacity = 0;

    // var vid = document.getElementById("myVideo");
    // vid.oncanplaythrough = function () {
    //   setTimeout(function () {
    //     var e = document.getElementById('myVideo');
    //     fade(e);
    //   }, 5000);
    // };

    // var e = document.getElementById("myVideoMob");
    // e.style.opacity = 0;

    // var vidMob = document.getElementById("myVideoMob");
    // vidMob.oncanplaythrough = function () {
    //   setTimeout(function () {
    //     var e = document.getElementById('myVideoMob');
    //     fade(e);
    //   }, 5000);
    // };
  }, []);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };
  function fade(element) {
    var op = 10;
    var timer = setInterval(function () {
      if (op === 0) clearInterval(timer);
      element.style.opacity = 1;
      element.style.filter = `blur(${op ? op : 0}px)`;
      op -= 1;
    }, 250);
  }
  return (
    <div>
      <GlobalStyles />
      <section
        className="jumbotron no-bg SectionMain"
        style={{
          height: "90vh",
          width: "100vw",
          position: "relative",
          overflow: "hidden",
          paddingTop: "0px",
        }}
      >
        <video
          id="myVideo"
          poster={thumbnail}
          autoPlay
          muted
          loop
          className="Video videoPc"
        >
          <source src={Video} type="video/mp4"></source>
        </video>
        <video
          id="myVideoMob"
          poster={thumbnailMob}
          autoPlay
          muted
          loop
          className="Video videoMob"
        >
          <source src={VideoMob} type="video/mp4"></source>
        </video>
        <div className="overlayVideo"></div>
        {/* <Particle /> */}
        <SliderMainParticle />
      </section>

      <section className="container-fluid pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <Heading text={"Live Auction"} />
              </div>
            </div>
          </div>
          <ColumnNewsound />
        </div>
      </section>

      <section className="container pt-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <Heading text={"BROWSE BY CATEGORY"} />
            </div>
          </div>
        </div>
        <Catgor />
      </section>

      <section className="container-fluid pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <Heading text={"TOP SELLERS"} />
              </div>
            </div>
          </div>
          <AuthorListRedux />
        </div>
      </section>

      <section
        className="container-fluid pb-0"
        style={{ marginBottom: "50px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <Heading text={"EXCLUSIVE NFT DROPS"} />
              </div>
            </div>
          </div>
          <ColumnWithOutTime />
        </div>
      </section>

      <section className="container pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <Heading text={"OUR BLOG POSTS"} />
            </div>
          </div>
          {blogs &&
            blogs
              .slice(0, visible)
              .map((item, index) => <BlogItem key={index} item={item} />)}
          {/* {visible < blogs.length && (
            <div className="col-md-12 wrap-inner load-more text-center">
              <span className="btn-main" onClick={showMoreItems}>
                Read more
              </span>
            </div>
          )} */}
          {/* <div className="col-lg-4 col-md-6  blogPost">
          <div className="bloglist item" style={{ "border": "2px solid transparent", "borderImage": "linear-gradient(124deg, rgb(126 146 225) 38%, rgb(42 243 4) 96%)", "borderImageSlice": "1", padding: "10px" }}>
              <div className="post-content">
                <div className="post-image">
                  <img alt="" src="./img/news/news-1.jpg" className="lazy" />
                </div>
                <div className="post-text">
                  <span className="p-tagline">Tips &amp; Tricksss</span>
                  <span className="p-date">October 28, 2020</span>
                  <h4><span>The next big trend in crypto<span></span></span></h4>
                  <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>
                  <span className="btn-main">Read more</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6  blogPost">
            <div className="bloglist item" style={{ "border": "2px solid transparent", "borderImage": "linear-gradient(124deg, rgb(126 146 225) 38%, rgb(42 243 4) 96%)", "borderImageSlice": "1", padding: "10px" }}>
              <div className="post-content">
                <div className="post-image">
                  <img alt="" src="./img/news/news-2.jpg" className="lazy" />
                </div>
                <div className="post-text">
                  <span className="p-tagline">Tips &amp; Tricks</span>
                  <span className="p-date">October 28, 2020</span>
                  <h4><span>The next big trend in crypto<span></span></span></h4>
                  <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>
                  <span className="btn-main">Read more</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6  blogPost">
            <div className="bloglist item" style={{ "border": "2px solid transparent", "borderImage": "linear-gradient(124deg, rgb(126 146 225) 38%, rgb(42 243 4) 96%)", "borderImageSlice": "1", padding: "10px" }}>
              <div className="post-content">
                <div className="post-image">
                  <img alt="" src="./img/news/news-3.jpg" className="lazy" />
                </div>
                <div className="post-text">
                  <span className="p-tagline">Tips &amp; Tricks</span>
                  <span className="p-date">October 28, 2020</span>
                  <h4><span>The next big trend in crypto<span></span></span></h4>
                  <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>
                  <span className="btn-main">Read more</span>
                </div>
              </div>
            </div>
          </div> */}
          {visible < blogs.length && (
            <div className="col-lg-12">
              <div className="spacer-single"></div>
              <span className="btn-main  lead m-auto" onClick={showMoreItems}>
                Read more
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="container-fluid bg-gray">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <Heading bg={"bg-gray"} text={"Create and sell your NFTs"} />
            </div>
          </div>
        </div>
        <div className="container">
          <FeatureBox />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllBlogs,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Hometwo);

export const BlogItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="col-lg-4 col-md-6  blogPost">
      <div
        className="bloglist item"
        style={{
          border: "2px solid transparent",
          borderImage:
            "linear-gradient(124deg, rgb(126 146 225) 38%, rgb(42 243 4) 96%)",
          borderImageSlice: "1",
          padding: "10px",
        }}
      >
        <div className="post-content">
          <div className="post-image">
            <img
              alt={item?.blogTitle}
              style={
                item?.blogImage
                  ? { objectFit: "cover" }
                  : { objectFit: "contain" }
              }
              src={item?.blogImage ? item?.blogImage : NexibleLogoFit}
            />
          </div>
          <div className="post-text">
            <span className="p-tagline">Tips &amp; Tricksss</span>
            <span className="p-date">{dateFormat(item.blogDate)}</span>
            <h4>
              <span>{item?.blogTitle}</span>
            </h4>
            <p>{item?.blogDescription}</p>
            <span
              className="btn-main"
              onClick={() => {
                navigate(`/Blog-Details?id=${item?._id}`);
              }}
            >
              Read more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
