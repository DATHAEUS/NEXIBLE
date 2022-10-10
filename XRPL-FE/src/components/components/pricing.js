import React from 'react';

const pricing = ({
    plan,
    setPlan
}) => (
    <section className='container'>
        <div className="row sequence">

            <div className="col-lg-4 col-md-6 col-sm-12 sq-item wow" >
                <div className="pricing-s1 mb30" style={plan === '100' ? {border:"2px solid rgb(42, 243, 4)"}:{}}>
                    <div className="top">
                        <h2>Basic</h2>
                    </div>
                    <div className="mid text-light bg-color">
                        <p className="price">
                            <span className="currency">$</span>
                            <span className="m opt-1">100</span>
                            <span className="month">p/mo</span>
                        </p>
                    </div>

                    <div className="bottom">
                        <ul>
                            <li><i className="fa fa-check"></i>100 xrpl<br /><span>(10 XRP will be reserved)</span></li>
                        </ul>
                    </div>

                    <div className="action">
                        <button className="btn-main" onClick={()=>{
                            setPlan('100')
                        }}>Select Plan</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 sq-item wow">
                <div className="pricing-s1 mb30"  style={plan === '200' ? {border:"2px solid rgb(42, 243, 4)"}:{}}>
                    <div className="top">
                        <h2>Advance</h2>
                    </div>
                    <div className="mid text-light bg-color">
                        <p className="price">
                            <span className="currency">$</span>
                            <span className="m opt-1">200</span>
                            <span className="month">p/mo</span>
                        </p>
                    </div>
                    <div className="bottom">
                        <ul>
                            <li><i className="fa fa-check"></i>200 xrpl<br /><span>(10 XRP will be reserved)</span></li>
                        </ul>
                    </div>

                    <div className="action">
                        <button className="btn-main" onClick={()=>{
                            setPlan('200')
                        }}>Select Plan</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 sq-item wow">
                <div className="pricing-s1 mb30"  style={plan === '300' ? {border:"2px solid rgb(42, 243, 4)"}:{}}>
                    <div className="top">
                        <h2>Premium</h2>
                    </div>
                    <div className="mid text-light bg-color">
                        <p className="price">
                            <span className="currency">$</span>
                            <span className="m opt-1">300</span>
                            <span className="month">p/mo</span>
                        </p>
                    </div>
                    <div className="bottom">
                        <ul>
                            <li><i className="fa fa-check"></i>300 xrpl<br /><span>(10 XRP will be reserved)</span></li>
                        </ul>
                    </div>

                    <div className="action">
                        <button className="btn-main" onClick={()=>{
                            setPlan('300')
                        }}>Select Plan</button>
                    </div>
                </div>
            </div>


            <div className="col-lg-6 offset-lg-3 text-center">
                <small>Price shown are in USD and VAT inclusive.</small>
            </div>

        </div>
    </section>

);
export default pricing;