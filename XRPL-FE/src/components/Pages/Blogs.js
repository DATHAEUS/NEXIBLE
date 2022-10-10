import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import Spinner from "./Spinner";
import moment from "moment";
import { bindActionCreators } from "redux";
import { getAllBlogs } from "./../../store/actions/thunks/blogs";
import { BlogItem } from "./home";

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

const Blogs = (props) => {
  const blogs = useSelector((e) => e.blogs.blogs);

  useEffect(() => {
    props.getAllBlogs();
  }, []);

  return (
    <div>
      <GlobalStyles />

      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"../img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12 text-center">
                <h1>Blogs</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="spacer-single"></div>
      <div className="spacer-single"></div>
      <div className="spacer-single"></div>

      <section className="container pt-0">
        <div className="row">
          {/* <div className="col-lg-12">
            <div className="text-center">
              <Heading text={"OUR BLOG POSTS"} />
            </div>
          </div> */}
          {blogs ? (
            blogs
              // .slice(0, visible)
              .map((item, index) => <BlogItem key={index} item={item} />)
          ) : (
            <div className="spinnerBlog">
              <Spinner />
            </div>
          )}
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
          {/* <div className="col-lg-12">
            <div className="spacer-single"></div>
            <span className="btn-main  lead m-auto" onClick={showMoreItems}>
              Read more
            </span>
          </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(Blogs));
