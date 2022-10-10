import React, { useEffect } from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import auth, { loginUrl } from '../../core/auth';
import request from '../../core/auth/request';
import { NavLink, useNavigate } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/thunks/auth';


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

const validationSchema = Yup.object().shape({
  email: Yup.lazy(() =>
    Yup.string()
      .required('Username is required')
  ),
  password: Yup.lazy(() =>
    Yup.string()
      .required('Password is required')
  ),
});

const initialValues = {
  email: '',
  password: ''
};

const Logintwo = (props) => {
  const navigate = useNavigate();
  const redirectUser = (path) => {
    navigate(path);
  }

  const handleSubmitForm = async (data) => {
    console.log(data)
    props.signIn(data, redirectUser)
    // const requestURL = loginUrl;

    // await request(requestURL, { method: 'POST', body: data })
    //   .then((response) => {
    //     auth.setToken(response.jwt, false);
    //     auth.setUserInfo(response.user, false);
    //     redirectUser('/Author/1');
    //   }).catch((err) => {
    //     console.log(err);
    //   });
  }
  // useEffect(()=>{

  // },[])
  useEffect(() => {
    console.log(props.newSignInLoader)
  }, [props.newSignInLoader])
  return (
    <div>
      <GlobalStyles />

      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row'>
              <div className="col-md-12 text-center">
                <h1>User Login</h1>
                <p>Anim pariatur cliche reprehenderit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Formik
              enableReinitialize
              validationSchema={validationSchema}
              initialValues={initialValues}
              validateOnMount={validationSchema.isValidSync(initialValues)}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // const submitData = pick(values, [...requiredFields]);
                console.log(values)
                setSubmitting(true);
                await handleSubmitForm(values);
                setSubmitting(false);
                resetForm();
              }}
            >
              {
                ({ values, isSubmitting, isValid }) => {
                  // const isAllValid = isValid;
                  // const submitValidationMessage = 'Please fill in all required fields';

                  return (
                    <Form className="form-border">
                      <h3>Login to your account</h3>
                      <div className="field-set">
                        <label>Username</label>
                        <Field className="form-control" type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                      </div>
                      <div className="field-set">
                        <Field className="form-control" type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                      </div>
                      <p>Don't have an account yet? <span className='registerNow'><NavLink to={'/register'}>Register Now</NavLink></span></p>
                      <div id='submit'>
                        <button type='submit' id='send_message' className="btn btn-main color-2 loginButton">{props.newSignInLoader ?
                          <>
                            <div className="spinner-border text-light" role="status">
                              <span className="sr-only"></span>
                            </div>
                          </>
                          :
                          `Login`}
                          </button>
                        {/* <input type='submit' id='send_message' value='Login' className="btn btn-main color-2" /> */}
                        <div className="clearfix"></div>

                        <div className="spacer-single"></div>

                        <ul className="list s3">
                          <li>Or login with:</li>
                          <li><span>Facebook</span></li>
                          <li><span>Google</span></li>
                          <li><span>Instagram</span></li>
                        </ul>
                      </div>
                    </Form>
                  )
                }
              }
            </Formik>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
};

const mapStateToProps = (state) => ({
  state: state,
  newSignInLoader: state.auth.newSignInLoader

})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signIn
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(Logintwo)