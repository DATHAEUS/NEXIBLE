import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import * as selectors from "../../store/selectors";
import {
  getBlogPosts,
  getRecentPosts,
  getBlogComments,
  getBlogTags,
  getSingleBlog,
} from "../../store/actions/thunks";
import api from "../../core/api";
import moment from "moment";
import { bindActionCreators } from "redux";
import Spinner from "./Spinner";
import NexibleLogoFit from "../../assets/Images/Nexible.png"
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

const SingleBlog = (props) => {
  //   const dispatch = useDispatch();
  //   const blogsState = useSelector(selectors.blogsState);
  //   const recentPostsState = useSelector(selectors.recentPostsState);
  //   const tagsState = useSelector(selectors.tagsState);
  const blog = useSelector((e) => e.blogs.singleBlog[0]);
  const [blogContent, setBlogContent] = useState("");

  console.log(blog);
  const [dataRecent] = useState([
    {
      title: "6 Make Mobile Website Faster",
      text: "Lorem ipsum dolor sit amer....",
      time: "August 10, 2021",
    },
    {
      title: "Experts Web Design Tips",
      text: "Lorem ipsum dolor sit amer....",
      time: "August 10, 2021",
    },
    {
      title: "Importance Of Web Design",
      text: "Lorem ipsum dolor sit amer....",
      time: "August 10, 2021",
    },
    {
      title: "Avoid These Erros In UI Design",
      text: "Lorem ipsum dolor sit amer....",
      time: "August 10, 2021",
    },
  ]);
  //   const blogPosts = blogsState.data ? blogsState.data : {};
  //   const recentPosts = recentPostsState.data ? recentPostsState.data : [];
  //   const tags = tagsState.data ? tagsState.data : [];
  //   const comments = commentsState.data ? commentsState.data.comments : [];
  //   const commentCount = commentsState.data ? commentsState.data.counts : 0;
  useEffect(() => {
    if (blog) {
      document.getElementById("blogRef").innerHTML = blog.blogData;
      setBlogContent(blog.blogData);
    }
  }, [blog]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    //     dispatch(getBlogPosts(postId));
    //     dispatch(getRecentPosts());
    //     dispatch(getBlogTags(postId));
    //     dispatch(getBlogComments(postId));
    // console.log(postId);
    let url = new URL(window.location);
    let id = url.searchParams.get("id");
    if (id) {
      props.getSingleBlog(id);
    }
    console.log(id);
  }, []);
  useEffect(() => {
    if (blogContent) {
      let allP = document.getElementById("blogRef").querySelectorAll("p");
      let allSpan = document.getElementById("blogRef").querySelectorAll("span");
      let allH = document
        .getElementById("blogRef")
        .querySelectorAll("h1,h2,h3,h4,h5,h6");
      let allLi = document.getElementById("blogRef").querySelectorAll("li");

      if (allP.length) {
        allP.forEach((a, i) => {
          a.classList.add("mg-bt-24");
          // a.style.color = '#fff'
        });
      }
      if (allSpan.length) {
        allSpan.forEach((a, i) => {
          a.classList.add("mg-bt-24");
          // a.style.color = '#fff'
        });
      }
      if (allH.length) {
        allH.forEach((a, i) => {
          a.classList.add("heading");
          a.classList.add("mg-bt-16");
          // a.style.color = '#fff'
        });
      }
      if (allLi.length) {
        allLi.forEach((a, i) => {
          a.classList.add("mg-bt-24");
          // a.style.color = '#fff'
        });
      }
    }
  }, [blogContent]);

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
                <h1>{blog?.blogTitle}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {blog ? (
                <div className="blog-read">
                  {blog  && (
                    <img
                      alt=""
                      // src={api.baseUrl + blogPosts.cover.url}
                      src={blog?.blogImage ? blog?.blogImage : NexibleLogoFit}
                      className="img-fullwidth rounded"
                    />
                  )}

                  <div className="post-text">
                    {/* {blog?.blogDescription} */}
                    {/* <div className="spacer-single"></div> */}
                    <div className="inner-post mg-t-40" id="blogRef"></div>
                    <div className="spacer-single"></div>

                    <span className="post-date">
                      {moment(blog?.blogDate).format("MMMM D, yyyy")}
                    </span>
                    {/* <span className="post-comment">{commentCount}</span>
                  <span className="post-like">{blogPosts.likes}</span> */}
                    <span className="post-comment">{0}</span>
                    <span className="post-like">{1.5 + "k"}</span>
                  </div>
                </div>
              ) : (
                <div className="spinnerBlog">
                  <Spinner />
                </div>
              )}
              <div className="spacer-single"></div>

              <div id="blog-comment">
                <h4>Comments 0</h4>
                {/* <h4>Comments ({commentCount})</h4> */}
                {/* 
                <div className="spacer-half"></div>

                <ol>
                  {comments &&
                    comments.map((comment, index) => (
                      <li key={index}>
                        <div className="avatar">
                          <img
                            src={api.baseUrl + comment.avatar}
                            alt=""
                            width="70px"
                          />
                        </div>
                        <div className="comment-info">
                          <span className="c_name">{comment.username}</span>
                          <span className="c_date id-color">
                            {moment(comment.timestamp).format(
                              "MMMM D yyyy, h:m A"
                            )}
                          </span>
                          <span className="c_reply">
                            <a href="/news">Reply</a>
                          </span>
                          <div className="clearfix"></div>
                        </div>

                        <div className="comment">{comment.comment}</div>
                        {comment.replies && comment.replies.length !== 0 && (
                          <ol>
                            {comment.replies.map((reply, replyIndex) => (
                              <li key={replyIndex}>
                                <div className="avatar">
                                  <img
                                    src={api.baseUrl + reply.avatar}
                                    alt=""
                                    width="70px"
                                  />
                                </div>
                                <div className="comment-info">
                                  <span className="c_name">
                                    {reply.username}
                                  </span>
                                  <span className="c_date id-color">
                                    {moment(reply.timestamp).format(
                                      "MMMM D yyyy, h:m A"
                                    )}
                                  </span>
                                  <span className="c_reply">
                                    <a href="/news">Reply</a>
                                  </span>
                                  <div className="clearfix"></div>
                                </div>
                                <div className="comment">{reply.comment}</div>
                              </li>
                            ))}
                          </ol>
                        )}
                      </li>
                    ))}
                </ol> */}

                <div className="spacer-single"></div>

                <div id="comment-form-wrapper">
                  <h4>Leave a Comment</h4>
                  <div className="comment_form_holder">
                    <form
                      id="contact_form"
                      name="form1"
                      className="form-border"
                      method="post"
                      action="#"
                    >
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                      />

                      <label>
                        Email <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                      />
                      <div id="error_email" className="error">
                        Please check your email
                      </div>

                      <label>
                        Message <span className="req">*</span>
                      </label>
                      <textarea
                        cols="10"
                        rows="10"
                        name="message"
                        id="message"
                        className="form-control"
                      ></textarea>
                      <div id="error_message" className="error">
                        Please check your message
                      </div>
                      <div id="mail_success" className="success">
                        Thank you. Your message has been sent.
                      </div>
                      <div id="mail_failed" className="error">
                        Error, email not sent
                      </div>

                      <p id="btnsubmit">
                        <input
                          type="submit"
                          id="send"
                          value="Send"
                          className="btn btn-main"
                        />
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div id="sidebar" className="col-md-4">
              <div className="widget widget-post">
                <h4>Recent Posts</h4>
                <div className="small-border"></div>
                <ul>
                  {dataRecent.map((item, index) => (
                    <li key={index}>
                      <span className="date">
                        {moment(new Date()).format("D MMM")}
                      </span>
                      <a href="/news">{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="widget widget-text">
                <h4>About Us</h4>
                <div className="small-border"></div>
                {/* {"blogPosts.author && blogPosts.author.about"} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo vel
                suscipit illo cupiditate quidem dicta quae ipsa, earum dolorem
                in cum perferendis adipisci accusamus! Labore omnis facilis, a
                similique commodi dolor voluptates mollitia dolore eius, velit
                sed fugiat aliquid assumenda inventore? Nobis, adipisci.
                Laboriosam mollitia veritatis eum labore asperiores illum veniam
                accusamus et optio consequuntur amet nesciunt suscipit deleniti,
                ratione recusandae incidunt expedita, in quae ab, quam ullam
                quisquam. Pariatur recusandae, inventore tenetur eveniet
                voluptas amet consequatur et ipsum, id impedit expedita earum
                dolore rem sed explicabo mollitia totam, fugit enim dicta culpa
                beatae at. Pariatur commodi dolore sit illum!
              </div>
              <div className="widget widget_tags">
                <h4>Tags</h4>
                <div className="small-border"></div>
                <ul>
                  {blog &&
                    blog?.blogTags.map((tag, index) => (
                      <li key={index}>
                        <a href="#link">{tag}</a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
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
      getSingleBlog,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(memo(SingleBlog));
