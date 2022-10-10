import React, { useEffect } from 'react';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import auth, { registerUrl } from '../../../core/auth';
import request from '../../../core/auth/request';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { signUp } from '../../../store/actions/thunks/auth';

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
  first_name: Yup.lazy(() =>
    Yup.string()
      .required('First Name is required')
  ),
  last_name: Yup.lazy(() =>
    Yup.string()
      .required('Last Name is required')
  ),
  username: Yup.lazy(() =>
    Yup.string()
      .required('Username is required')
  ),
  email: Yup.lazy(() =>
    Yup.string()
      .required('Email is required')
  ),
  password: Yup.lazy(() =>
    Yup.string()
      .required('Password is required')
  ),
  password_confirmation: Yup.lazy(() =>
    Yup.string()
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value
      })
  ),
});

const initialValues = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: ''
};

const Register = (props) => {

  const navigate = useNavigate();
  const redirectUser = (path) => {
    navigate(path);
  }

  const handleSubmitForm = async (data) => {
    delete data.password_confirmation
    console.log(data)
    props.signUp(data, redirectUser)
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
    console.log(props.newSignUpLoader)
  }, [props.newSignUpLoader])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <GlobalStyles />

      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row'>
              <div className="col-md-12 text-center">
                <h1>Register</h1>
                <p>Anim pariatur cliche reprehenderit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className="row">

          <div className="col-md-8 offset-md-2">
            <h3>Don't have an account? Register now.</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

            <div className="spacer-10"></div>
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
                      <div className="row">

                        <div className="col-md-6">
                          <div className="field-set">
                            <label>First Name</label>
                            <Field className="form-control" type="text" name="first_name" />
                            <ErrorMessage name="username" component="div" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Last Name</label>
                            <Field className="form-control" type="text" name="last_name" />
                            <ErrorMessage name="username" component="div" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Email Address:</label>
                            <Field className="form-control" type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Choose a Username:</label>
                            <Field className="form-control" type="text" name="username" />
                            <ErrorMessage name="username" component="div" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Password:</label>
                            <Field className="form-control" type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Re-enter Password:</label>
                            <Field className="form-control" type="password" name="password_confirmation" />
                            <ErrorMessage name="password_confirmation" component="div" />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div id='submit' className="pull-left">
                          <button type='submit' id='send_message' className="btn btn-main color-2 loginButton">{props.newSignInLoader ?
                          <>
                            <div className="spinner-border text-light" role="status">
                              <span className="sr-only"></span>
                            </div>
                          </>
                          :
                          `Register Now`}
                          </button>
                            {/* <input type='submit' id='send_message' value='Register Now' className="btn btn-main color-2" /> */}
                          </div>

                          <div className="clearfix"></div>
                        </div>
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
  newSignUpLoader: state.auth.newSignUpLoader

})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signUp
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(Register)