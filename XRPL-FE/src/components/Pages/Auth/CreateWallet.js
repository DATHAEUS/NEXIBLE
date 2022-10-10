import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { Form, InputGroup, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { addCardData, cancelPayment, confirmPayment, createOtpData, createPayment, verifyOTP } from "../../../store/actions/thunks/auth";
import Footer from "../../components/footer";
import Pricing from "../../components/pricing";
import pic1 from "./../../../assets/Images/blank-profile.webp";
import verified from "./../../../assets/Images/verified-symbol-icon.webp";

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

function CreateWallet() {
    const [activeTab, setActiveTab] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [profileImage, setProfileImage] = useState();
    const [profileImageTemp, setProfileImageTemp] = useState();
    const [profileBanner, setProfileBanner] = useState();
    const [profileBannerTemp, setProfileBannerTemp] = useState();
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
    }
    const [data, setData] = useState({
        "first_name": '',
        "last_name": '',
        "email": '',
        "otp_key": '',
        "password": '',
    })
    const otpLoader = useSelector(e => e.auth.otpLoader)
    const otpVerifyLoader = useSelector(e => e.auth.otpVerifyLoader)
    const addCardLoader = useSelector(e => e.auth.addCardLoader)
    const confirmPaymentLoader = useSelector(e => e.auth.confirmPaymentLoader)
    const cancelPaymentLoader = useSelector(e => e.auth.cancelPaymentLoader)

    const paymentId = useSelector(e => e.auth.paymentId)
    const [date, setDate] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        let userLS = localStorage.getItem('nexibleUser')
        if(JSON.parse(userLS).wallet_address){
            console.log(userLS)
            setData({
                ...data,
                "wallet_address": JSON.parse(userLS).wallet_address
            })
        }
        if (JSON.parse(userLS)?.email) {
            setActiveTab('Pricing')
            let userD = JSON.parse(userLS);
            if (userD.stripe_card_number) {
                setUser(userD)
                setCardObj({
                    "stripe_card_number": userD.stripe_card_number,
                    "stripe_card_exp_month": userD.stripe_card_exp_month,
                    "stripe_card_exp_year": userD.stripe_card_exp_year,
                    "stripe_card_cvc": userD.stripe_card_cvc
                })
                setDate(userD.stripe_card_exp_month + "/" + userD.stripe_card_exp_year)

                let number = userD.stripe_card_number
                if (number.length % 4 == 0) {
                    number += " ";
                }
                setCardNumber(number)
            }
        } else {
            setActiveTab('Verify')
        }
    }, [])

    const sendOtp = (e) => {
        e.preventDefault()
        dispatch(verifyOTP(data.email, setActiveTab))
    }

    const create = (e) => {
        e.preventDefault()
        console.log(data);
        let updatedObj = {
            ...data,
            profile: profileImage,
            profile_banner: profileBanner,
        };

        console.log(updatedObj)

        let formData = new FormData();

        for (let prop in updatedObj) {
            if (updatedObj[prop]) {
                formData.append(prop, updatedObj[prop]);
            }
        }
        dispatch(createOtpData(formData, setActiveTab))
    }

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

    const [plan, setPlan] = useState('')

    const SelectPlan = (plan) => {
        setPlan(plan)
        setActiveTab('addCard')
    }
    const [cardObj, setCardObj] = useState({
        "stripe_card_number": "",
        "stripe_card_exp_month": "",
        "stripe_card_exp_year": "",
        "stripe_card_cvc": ""
    })
    const redirect = () => {
        navigate('/Collection/User?u=me')
    }
    const addCard = (e) => {
        e.preventDefault()
        // setShow(true)
        // console.log(cardObj)
        if (user.stripe_card_number) {
            dispatch(createPayment(plan, setShow))
        } else {
            dispatch(addCardData(cardObj, setShow, plan))
        }
    }

    useEffect(() => {
        console.log(paymentId, 'paymentId')
    }, [paymentId])

    const confirmPaymentFn = () => {
        dispatch(confirmPayment(paymentId, setShow, redirect))
    }
    const cancelPaymentFn = () => {
        dispatch(cancelPayment(paymentId, setShow))
    }
    return (
        <div>
            <GlobalStyles />

            <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
                <div className='mainbreadcumb'>
                    <div className='container'>
                        <div className='row m-10-hor'>
                            <div className='col-12'>
                                <h1 className='text-center'>{
                                    activeTab === 'Pricing' ?
                                        `Pricing` :
                                        activeTab === 'addCard' ?
                                            `Add Payment Method`
                                            : `Create Wallet`
                                } </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='container createWalletPage'>
                <div className='col-xs-12 mt-1'>
                    <div id="tabs2">
                        <Tabs fill activeKey={activeTab} onSelect={(e) => {
                            setActiveTab(e)
                            // navigate(`?active=${e}`)
                        }}>
                            <Tab eventKey="Verify" title="Verify Email" disabled>
                                <div className="innerTab">
                                    <div className="col-sm-7">
                                        <Form className="form-border">
                                            <div className="field-set">
                                                <label>Email</label>
                                                <div>
                                                    <InputGroup className="mb-3 emailInput" >
                                                        <Form.Control
                                                            value={data.email}
                                                            disabled={otpLoader}
                                                            placeholder="Enter Your Email"
                                                            aria-label="Enter Your Email"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(ev) => {
                                                                let obj = { ...data }
                                                                obj.email = ev.target.value
                                                                setData(obj)
                                                            }}
                                                        />
                                                        <button className="otpbutton" onClick={sendOtp} disabled={otpLoader}>{otpLoader ?
                                                            <div className=''>
                                                                <div class="spinner-border text-primary" role="status">
                                                                </div>
                                                            </div>
                                                            : `Send OTP`}</button>
                                                    </InputGroup>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="addInfo" title="Add Information" disabled>
                                <div className="innerTab">
                                    <div className="col-sm-10">
                                        <Form className="form-border">
                                            <div className="innerForm">
                                                <div className="field-set col-sm-5">
                                                    <label>Profile image</label>
                                                    <i
                                                        className="fa fa-info-circle id-color-2"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        title=""
                                                        data-bs-original-title="Recommend 400 x 400. Max size: 50MB. Click the image to upload."
                                                        aria-label="Recommend 400 x 400. Max size: 50MB. Click the image to upload."
                                                    ></i>
                                                    <div>

                                                        <img
                                                            src={profileImageTemp ? profileImageTemp : pic1}
                                                            id="click_profile_img"
                                                            className="d-profile-img-edit img-fluid"
                                                            alt=""
                                                            style={{ margin: "10px 0px", width: "150px", height: "150px", objectFit: "cover" }}
                                                        />
                                                        <input
                                                            name="profile_image"
                                                            type="file"
                                                            id="upload_profile_img"
                                                            onChange={(event) => {
                                                                handleProfilePicture(event);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="field-set col-sm-5">

                                                    <label>
                                                        Profile banner{" "}
                                                        <i
                                                            className="fa fa-info-circle id-color-2"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            title=""
                                                            data-bs-original-title="Recommend 1500 x 500. Max size: 50MB. Click the image to upload."
                                                            aria-label="Recommend 1500 x 500. Max size: 50MB. Click the image to upload."
                                                        ></i>
                                                    </label>
                                                    <div>

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
                                                    </div>

                                                </div>
                                                <div className="field-set col-sm-5">
                                                    <label>First Name</label>
                                                    <div>
                                                        <InputGroup className="mb-3 emailInput" >
                                                            <Form.Control
                                                                value={data.first_name}
                                                                disabled={otpVerifyLoader}
                                                                placeholder="Enter Your First Name"
                                                                aria-label="Enter Your First Name"
                                                                aria-describedby="basic-addon2"
                                                                onChange={(ev) => {
                                                                    let obj = { ...data }
                                                                    obj.first_name = ev.target.value
                                                                    setData(obj)
                                                                }}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                                <div className="field-set col-sm-5">
                                                    <label>Last Name</label>
                                                    <div>
                                                        <InputGroup className="mb-3 emailInput" >
                                                            <Form.Control
                                                                value={data.last_name}
                                                                disabled={otpVerifyLoader}
                                                                placeholder="Enter Your Last Name"
                                                                aria-label="Enter Your Last Name"
                                                                aria-describedby="basic-addon2"
                                                                onChange={(ev) => {
                                                                    let obj = { ...data }
                                                                    obj.last_name = ev.target.value
                                                                    setData(obj)
                                                                }}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                                <div className="field-set col-sm-5">
                                                    <label>Email</label>
                                                    <div>
                                                        <InputGroup className="mb-3 emailInput" >
                                                            <Form.Control
                                                                value={data.email}
                                                                disabled={otpVerifyLoader}
                                                                placeholder="Enter Your Email"
                                                                aria-label="Enter Your Email"
                                                                aria-describedby="basic-addon2"
                                                                onChange={(ev) => {
                                                                    let obj = { ...data }
                                                                    obj.email = ev.target.value
                                                                    setData(obj)
                                                                }}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                                <div className="field-set col-sm-5">
                                                    <label>OTP</label>
                                                    <div>
                                                        <InputGroup className="mb-3 emailInput" >
                                                            <Form.Control
                                                                value={data.otp_key}
                                                                disabled={otpVerifyLoader}
                                                                placeholder="ENTER OTP"
                                                                aria-label="ENTER OTP"
                                                                aria-describedby="basic-addon2"
                                                                onChange={(ev) => {
                                                                    let obj = { ...data }
                                                                    obj.otp_key = ev.target.value
                                                                    setData(obj)
                                                                }}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                                <div className="field-set col-sm-5">
                                                    <label>Password</label>
                                                    <div>
                                                        <InputGroup className="mb-3 emailInput" >
                                                            <Form.Control
                                                                type="password"
                                                                value={data.password}
                                                                disabled={otpVerifyLoader}
                                                                placeholder="ENTER OTP"
                                                                aria-label="ENTER OTP"
                                                                aria-describedby="basic-addon2"
                                                                onChange={(ev) => {
                                                                    let obj = { ...data }
                                                                    obj.password = ev.target.value
                                                                    setData(obj)
                                                                }}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                                <div className="col-sm-5">
                                                    <button className="createButton" onClick={create} disabled={otpVerifyLoader}>{otpVerifyLoader ?
                                                        <div className=''>
                                                            <div class="spinner-border text-primary" role="status">
                                                            </div>
                                                        </div>
                                                        : `Create User`}</button>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="Pricing" title="Pricing" disabled>
                                <div className="innerTab">
                                    <div className="col-sm-10">
                                        <Pricing
                                            plan={plan}
                                            setPlan={SelectPlan}
                                        />
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="addCard" title="Add Debit/Credit Card" disabled>
                                <div className="innerTab">
                                    <div className="col-sm-8">
                                        <Form className="form-border">
                                            <div className="innerForm">
                                                <div className="field-set col-sm-12">
                                                    <label>Card Number</label>
                                                    <div>
                                                        <InputGroup className="mb-3 emailInput" >
                                                            <Form.Control
                                                                placeholder="Card Number"
                                                                aria-label="Card Number"
                                                                aria-describedby="basic-addon2"
                                                                value={cardNumber}
                                                                // disabled={cardNumber}
                                                                onChange={(ev) => {
                                                                    let objj = { ...cardObj }
                                                                    objj.stripe_card_number = ev.target.value
                                                                    setCardObj(objj)
                                                                    let number = ev.target.value
                                                                    //  if (number.length % 4 == 0) {
                                                                    //     number += " ";
                                                                    // }
                                                                    setCardNumber(number)
                                                                }}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                                <div className="field-set col-sm-5">
                                                    <label>Expiry</label>
                                                    <div>
                                                        <InputGroup className="mb-3 emailInput" >
                                                            <Form.Control
                                                                placeholder="MM/YY"
                                                                aria-label="Expiry Date"
                                                                aria-describedby="basic-addon2"
                                                                value={date}
                                                                // disabled={cardObj.stripe_card_exp_year}
                                                                onChange={(ev) => {
                                                                    let number = ev.target.value
                                                                    let objj = { ...cardObj }
                                                                    objj.stripe_card_exp_month = number.split('/')[0]
                                                                    objj.stripe_card_exp_year = number.split('/')[1]
                                                                    setDate(number)
                                                                    // let objj = { ...cardObj }
                                                                    // objj. = ev.target.value
                                                                    setCardObj(objj)
                                                                }}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                                <div className="field-set col-sm-5">
                                                    <label>CVC</label>
                                                    <div>
                                                        <InputGroup className="mb-3 emailInput" >
                                                            <Form.Control
                                                                placeholder="CVC"
                                                                aria-label="CVC"
                                                                aria-describedby="basic-addon2"
                                                                value={cardObj.stripe_card_cvc}
                                                                // disabled={cardObj.stripe_card_cvc}
                                                                onChange={(ev) => {
                                                                    let objj = { ...cardObj }
                                                                    objj.stripe_card_cvc = ev.target.value
                                                                    setCardObj(objj)
                                                                }}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 d-flex">
                                                    <button className="createButton" onClick={addCard} disabled={addCardLoader}>{addCardLoader ?
                                                        <div className=''>
                                                            <div class="spinner-border text-primary" role="status">
                                                            </div>
                                                        </div>
                                                        : cardObj.stripe_card_number ? `Make payment` : `Add Card`}</button>
                                                    <p className="selectPlanText" onClick={() => {
                                                        setActiveTab('Pricing')
                                                    }}> ← Select Plan</p>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose} className="addCardModal">
                    <Modal.Body>
                        <div className="verified">
                            <img src={verified} />
                            <h3>Your card detail has been saved</h3>
                        </div>
                        <div className="confirmation">
                            <p>Are you sure you want to purchase basic plan</p>
                        </div>
                        <div className="buttonDiv">
                            <button className="cancelButton" onClick={() =>
                                cancelPaymentFn()
                            } disabled={cancelPaymentLoader}>
                                {cancelPaymentLoader ?
                                    <div className=''>
                                        <div class="spinner-border text-primary" role="status">
                                        </div>
                                    </div>
                                    :
                                    `Cancel`
                                }
                            </button>
                            <button className="purchase" onClick={() => confirmPaymentFn()} disabled={confirmPaymentLoader}>
                                {confirmPaymentLoader ?
                                    <div className=''>
                                        <div class="spinner-border text-primary" role="status">
                                        </div>
                                    </div>
                                    :
                                    `Purchase`
                                }
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </section>
            <Footer />
        </div>
    );
}

export default CreateWallet;
