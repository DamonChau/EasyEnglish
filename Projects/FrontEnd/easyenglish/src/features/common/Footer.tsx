/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { useEffect } from 'react';
import image1 from '../../assests/images/image_1.jpg'
import image2 from '../../assests/images/image_2.jpg'
const Footer = () => {

    useEffect(() => {

    }, []);

    return (

        <footer className="ftco-footer ftco-bg-dark ftco-section">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-5">
                            <h2 className="ftco-heading-2 logo">Easy<span>English</span></h2>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                        <div className="ftco-footer-widget mb-5">
                            <h2 className="ftco-heading-2">Have a Questions?</h2>
                            <div className="block-23 mb-3">
                                <ul>
                                    <li><span className="icon icon-map-marker" /><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                                    <li><a href="#"><span className="icon icon-phone" /><span className="text">+2 392 3929 210</span></a></li>
                                    <li><a href="#"><span className="icon icon-envelope" /><span className="text">info@yourdomain.com</span></a></li>
                                </ul>
                            </div>
                            <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                                <li className="ftco-animate"><a href="#"><span className="icon-twitter" /></a></li>
                                <li className="ftco-animate"><a href="#"><span className="icon-facebook" /></a></li>
                                <li className="ftco-animate"><a href="#"><span className="icon-instagram" /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-5 ml-md-4">
                            <h2 className="ftco-heading-2">Links</h2>
                            <ul className="list-unstyled">
                                <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2" />Home</a></li>
                                <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2" />About</a></li>
                                <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2" />Services</a></li>
                                <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2" />Deparments</a></li>
                                <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2" />Contact</a></li>
                            </ul>
                        </div>
                        <div className="ftco-footer-widget mb-5 ml-md-4">
                            <h2 className="ftco-heading-2">Services</h2>
                            <ul className="list-unstyled">
                                <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2" />Neurolgy</a></li>
                                <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2" />Dentist</a></li>
                                <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2" />Ophthalmology</a></li>
                                <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2" />Cardiology</a></li>
                                <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2" />Surgery</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-5">
                            <h2 className="ftco-heading-2">Recent Blog</h2>
                            <div className="block-21 mb-4 d-flex">
                                <a className="blog-img mr-4" style={{ backgroundImage: `url(${image1})` }} />
                                <div className="text">
                                    <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                                    <div className="meta">
                                        <div><a href="#"><span className="icon-calendar" /> Dec 25, 2018</a></div>
                                        <div><a href="#"><span className="icon-person" /> Admin</a></div>
                                        <div><a href="#"><span className="icon-chat" /> 19</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="block-21 mb-5 d-flex">
                                <a className="blog-img mr-4" style={{ backgroundImage: `url(${image2})`  }} />
                                <div className="text">
                                    <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                                    <div className="meta">
                                        <div><a href="#"><span className="icon-calendar" /> Dec 25, 2018</a></div>
                                        <div><a href="#"><span className="icon-person" /> Admin</a></div>
                                        <div><a href="#"><span className="icon-chat" /> 19</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-5">
                            <h2 className="ftco-heading-2">Opening Hours</h2>
                            <h3 className="open-hours pl-4"><span className="ion-ios-time mr-3" />We are open 24/7</h3>
                        </div>
                        <div className="ftco-footer-widget mb-5">
                            <h2 className="ftco-heading-2">Subscribe Us!</h2>
                            <form action="#" className="subscribe-form">
                                <div className="form-group">
                                    <input type="text" className="form-control mb-2 text-center" placeholder="Enter email address" />
                                    <input type="submit" defaultValue="Subscribe" className="form-control submit px-3" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p>
                           
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );

}

export default Footer;