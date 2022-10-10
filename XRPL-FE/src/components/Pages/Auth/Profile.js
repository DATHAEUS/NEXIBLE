import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import Footer from "../../components/footer";
import { createGlobalStyle } from "styled-components";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import auth, { authorUrl } from "../../../core/auth";
import request from "../../../core/auth/request";
import { useNavigate } from "react-router-dom";
import api from "../../../core/api";
import { fetchAuthorList } from "../../../store/actions/thunks";
import * as selectors from "../../../store/selectors";
import axios from "axios";
import pic1 from "./../../../assets/Images/blank-profile.webp";
import { bindActionCreators } from "redux";
import { updateUser } from "../../../store/actions/thunks/auth";
import { toast } from 'react-toastify';
import { Spinner } from "react-bootstrap";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: rgb(4, 17, 243) ;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const validationSchema = Yup.object().shape({
  // first_name: Yup.lazy(() =>
  //     Yup.string()
  //         .required('first_name is required')
  // ),
  // last_name: Yup.lazy(() =>
  //     Yup.string()
  //         .required('last_name is required')
  // ),
  // username: Yup.lazy(() =>
  //     Yup.string()
  //         .required('username is required')
  // ),
  // password: Yup.lazy(() =>
  //     Yup.string()
  //         .required('password is required')
  // )
});

const Profile = ({ authorId, ...props }) => {
  const navigate = useNavigate();
  const jwt = auth.getToken();
  const authorsState = useSelector((e) => e.auth.signedInUser);
  const author = authorsState.data ? authorsState.data[0] : null;
  const [initialValues, setInitialValues] = useState({});
  const [profileImage, setProfileImage] = useState();
  const [profileImageTemp, setProfileImageTemp] = useState();
  const [profileBanner, setProfileBanner] = useState();
  const [profileBannerTemp, setProfileBannerTemp] = useState();

  useEffect(() => {
    console.log(authorsState);
    setProfileImageTemp(authorsState.profile);
    setProfileBannerTemp(authorsState.profile_banner);
    setInitialValues({
      first_name: authorsState ? authorsState.first_name : "",
      last_name: authorsState ? authorsState.last_name : "",
      username: authorsState ? authorsState.username : "",
      password: authorsState ? authorsState.password : "",
      email: authorsState ? authorsState.email : "",
    });
  }, [authorsState]);

  // const initialValues = {
  //     first_name: authorsState ? authorsState.first_name : '',
  //     last_name: authorsState ? authorsState.last_name : '',
  //     username: authorsState ? authorsState.username : '',
  //     password: authorsState ? authorsState.password : ''
  // };

  // const initialValues = {
  //     first_name: '',
  //     last_name: '',
  //     first_name: '',
  //     password: '',
  //     password_confirmation: ''
  // };

  const initialProfilePicture = {
    profile_image: "",
  };

  const initialProfileBanner = {
    profile_banner: "",
  };

  const dispatch = useDispatch();

  const redirectUser = (path) => {
    navigate(path);
  };

  const [updateLoader, setUpdateLoader] = useState(false)

  const handleSubmitForm = async (data) => {
    console.log(data);
    let updatedObj = {
      ...data,
      profile: profileImage,
      profile_banner: profileBanner,
    };
    let formData = new FormData();

    for (let prop in updatedObj) {
      if (updatedObj[prop]) {
        formData.append(prop, updatedObj[prop]);
      }
    }

    props.updateUser(formData, redirectUser);
    // console.log({ ...data, profile: profileImage, profileBanner: profileBanner })
    // const requestURL = authorUrl(authorId);

    // await request(requestURL, { method: 'PUT', body: data })
    //     .then((response) => {
    //         console.log(response)
    //         redirectUser(`/Author/${authorId}`);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
  };

  const handleSubmitProfilePicture = async (file, field) => {
    var formData = new FormData();

    formData.append("files", file);
    formData.append("ref", "author"); // link the image to a content type
    formData.append("refId", authorId); // link the image to a specific entry
    formData.append("field", field); // link the image to a specific field

    await axios({
      method: "post",
      url: `${api.baseUrl}/upload`,
      data: formData,
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        redirectUser(`/Author/${authorId}`);
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message)
        console.log(err);
      });
  };

  const handleProfilePicture = (event) => {
    let file = event.target.files[0];
    setProfileImage(file);
    let reader = new FileReader();
    reader.onloadend = () => {
      setProfileImageTemp(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileBanner = (event) => {
    let file = event.target.files[0];
    setProfileBanner(file);
    let reader = new FileReader();
    reader.onloadend = () => {
      setProfileBannerTemp(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    dispatch(fetchAuthorList(authorId));
  }, [dispatch, authorId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <GlobalStyles />
      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${api.baseUrl +
            (author && author.banner && author.banner.url
              ? author.banner.url
              : "/uploads/4_1ec08f99e2.jpg")
            })`,
        }}
      >
        <div className="mainbreadcumb"></div>
      </section>

      <section id="section-main" aria-label="section">
        <div className="container">
          <div className="row">
            <Formik
              enableReinitialize
              validationSchema={validationSchema}
              initialValues={initialValues}
              validateOnMount={validationSchema.isValidSync(initialValues)}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // const submitData = pick(values, [...requiredFields]);
                console.log(values);
                setSubmitting(true);
                await handleSubmitForm(values);
                setSubmitting(false);
                resetForm();
              }}
            >
              {({ values, isSubmitting, isValid }) => {
                return (
                  <div className="col-lg-7 offset-lg-1 d-flex">
                    <Form className="form-border w-100">
                      <div className="de_tab tab_simple">
                        <ul className="de_nav text-left m-0 mb-3">
                          <li className="active" style={{ opacity: 1 }}>
                            <span>
                              <i className="fa fa-user"></i>Profile
                            </span>
                          </li>
                        </ul>

                        <div className="de_tab_content">
                          <div className="tab-1">
                            <div
                              className="row wow fadeIn animated"
                              style={{
                                backgroundSize: "cover",
                                visibility: "visible",
                                animationName: "fadeIn",
                              }}
                            >
                              <div className="col-lg-8 mb-sm-20">
                                <div className="field-set">
                                  <h5>First Name</h5>
                                  <Field
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    className="form-control"
                                    placeholder="Enter First Name"
                                  />
                                  <ErrorMessage
                                    name="first_name"
                                    component="div"
                                  />
                                  <div className="spacer-20"></div>

                                  <h5>Last Name</h5>
                                  <Field
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                  />
                                  <ErrorMessage
                                    name="last_name"
                                    component="div"
                                  />
                                  <div className="spacer-20"></div>

                                  <h5>Username</h5>
                                  <Field
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="form-control"
                                    placeholder="Enter Username"
                                  />
                                  <ErrorMessage
                                    name="username"
                                    component="div"
                                  />
                                  <div className="spacer-20"></div>
                                  <h5>Email</h5>
                                  <Field
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                  />
                                  <ErrorMessage
                                    name="email"
                                    component="div"
                                  />
                                  <div className="spacer-20"></div>

                                  <h5>Password</h5>
                                  <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                  />
                                  <ErrorMessage
                                    name="password"
                                    component="div"
                                  />
                                  <div className="spacer-20"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        id="submit"
                        className="btn-main"
                        value="Update profile"
                        disabled={updateLoader}
                      >
                        {updateLoader ?
                          <div className="spinner-border text-light" role="status">
                            <span className="sr-only"></span>
                          </div>
                          :
                          `Update profile`
                        }
                      </button>
                    </Form>
                  </div>
                );
              }}
            </Formik>
            {/* different form for image and banner */}
            <div id="sidebar" className="col-lg-4">
              <h5>
                Profile image{" "}
                <i
                  className="fa fa-info-circle id-color-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="Recommend 400 x 400. Max size: 50MB. Click the image to upload."
                  aria-label="Recommend 400 x 400. Max size: 50MB. Click the image to upload."
                ></i>
              </h5>
              <img
                src={profileImageTemp ? profileImageTemp : pic1}
                id="click_profile_img"
                className="d-profile-img-edit img-fluid"
                alt=""
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <input
                name="profile_image"
                type="file"
                id="upload_profile_img"
                onChange={(event) => {
                  handleProfilePicture(event);
                }}
              />
              {/* <input type="submit" className="btn-main mt-3" value="Save Profile Image" /> */}

              <div className="spacer-30"></div>

              <h5>
                Profile banner{" "}
                <i
                  className="fa fa-info-circle id-color-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="Recommend 1500 x 500. Max size: 50MB. Click the image to upload."
                  aria-label="Recommend 1500 x 500. Max size: 50MB. Click the image to upload."
                ></i>
              </h5>
              <img
                src={profileBannerTemp}
                id="click_banner_img"
                className="d-banner-img-edit img-fluid"
                alt=""
              />
              <input
                name="profile_banner"
                type="file"
                id="upload_banner_img"
                onChange={(event) => {
                  handleProfileBanner(event);
                }}
              />
              {/* <ErrorMessage name="profile_banner" component="div" /> */}
              {/* <input type="submit" className="btn-main mt-3" value="Save Profile Banner" /> */}
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
      updateUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(memo(Profile));
