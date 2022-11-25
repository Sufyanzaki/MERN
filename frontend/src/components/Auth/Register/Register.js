import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../../../action/userAction';
import { images } from '../../../utils/imageParser'
import useLocalStorage from '../../../utils/useLocalStorage';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from '@react-oauth/google';
import "./Register.css"

const Register = () => {

    const [, setlocal] = useLocalStorage('user');
    const dispatch = useDispatch();
    const { user, error } = useSelector((state) => state.user);
    const notify = (message) => { toast.warn(message); };

    const [clik, setclik] = React.useState({
        name: '', username: '', email: '', password: '', remember: '', gender: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setclik((prev) => {
            return ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(clik));
        user ? setlocal(user) : setlocal(null)
    }

    useEffect(() => {
        if (error) {
            notify(error);
        }
    }, [error]);

    const responseFacebook = (response) => {
        console.log(response);
    }
    const componentClicked = (data) => {
        console.warn(data)
    }

    const style = {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),url(${images['theme-bg.jpg']})`
    }

    return (
        <div className="www-layout">
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <section>
                <div className="gap no-gap signin whitish register">
                    <div className="bg-image" style={style}></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="big-ad">
                                    <figure id="moveHere"><img src={images['logo2.png']} alt="" /></figure>
                                    <h1> Qbox -д тавтай морилно уу </h1>
                                    <p>
                                        Qbox бол хүмүүсийг холбоход ашиглаж болох нийгмийн сүлжээний загвар юм. Энэ загварыг ажил, болзоо, бичлэг оруулах, блог хөтлөх гэх мэт олон талт нийгмийн үйл ажиллагаанд ашиглах. Одоо нэгдэж, дэлхийн өнцөг булан бүрээс дажгүй найзууд болоорой !!!
                                    </p>

                                    <div className="fun-fact">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3 col-sm-4">
                                                <div className="fun-box">
                                                    <i><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></i>
                                                    <h6> Бүртгэгдсэн хүмүүс </h6>
                                                    <span>1,01,242</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-4">
                                                <div className="fun-box">
                                                    <i><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg></i>
                                                    <h6> Нийтлэгдсэн нийтлэлүүд </h6>
                                                    <span>21,03,245</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-4">
                                                <div className="fun-box">
                                                    <i>
                                                        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z" /><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z" /></svg>
                                                    </i>
                                                    <h6> Онлайн хэрэглэгчид </h6>
                                                    <span>40,145</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="barcode">
                                        <figure>
                                            <img src={images['Barcode.jpg']} alt="" />
                                        </figure>
                                        <div className="app-download">
                                            <span> Нэвтрэхийн тулд мобайл апп татаж аваад QR кодыг скан хий </span>
                                            <ul className="colla-apps">
                                                <li><Link title="" to={"/https://play.google.com/store?hl=en"}><img src={images['android.png']} alt="" />android</Link></li>
                                                <li><Link title="" to={"https://www.apple.com/lae/ios/app-store/"}><img src={images['apple.png']} alt="" />iPhone</Link></li>
                                                <li><Link title="" to={"https://www.microsoft.com/store/apps"}><img src={images['windows.png']} alt="" />Windows</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="we-login-register">
                                    <div className="form-title">
                                        <i><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-key"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg></i>Бүртгүүлэх
                                        <span>Одоо бүртгүүлж, дэлхийн өнцөг булан бүрт байгаа гайхалтай найзуудтайгаа уулзаарай. </span>
                                    </div>
                                    <form className="we-form" onSubmit={handleSubmit}>
                                        <label htmlFor='name'></label>
                                        <input type="text" placeholder="Name" name="name" id="name" onChange={handleChange} />
                                        <label htmlFor='username'></label>
                                        <input type="text" placeholder="User name" name="username" id="username" onChange={handleChange} />
                                        <label htmlFor='email'></label>
                                        <input type="text" placeholder="Email" name="email" id="email" onChange={handleChange} />
                                        <label htmlFor='pasword'></label>
                                        <input type="password" placeholder="Password" name="password" id="pasword" onChange={handleChange} />
                                        <div className="form-check form-check-inline child-alinger">
                                            <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="male" onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline child-alinger">
                                            <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="female" onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline child-alinger">
                                            <input className="form-check-input" type="radio" name="gender" id="inlineRadio3" value="other" onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="inlineRadio3">Other</label>
                                        </div>
                                        <div className='aligner'>
                                            <input type="checkbox" name='remember' id="remember" onChange={handleChange} /><label htmlFor='remember'>Мобайл руу код илгээх</label>
                                        </div>
                                        {false ? <div className='small-loader'></div> : <button type="submit" data-ripple="">Submit</button>}
                                        <Link className="forgot underline" to={'/'} title="">нэвтрэх </Link>
                                    </form>
                                    <div className='flexx'>
                                    <FacebookLogin
                                        appId="493426179331302"
                                        autoLoad
                                        callback={responseFacebook}
                                        render={renderProps => (
                                            <button className='with-smedia fb-color' onClick={renderProps.onClick}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></button>
                                        )} />

                                    <Link className="with-smedia twitter-color" to={'/'} title="" data-ripple=""><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></Link>
                                    <Link className="with-smedia instagram-color" to={'/'} title="" data-ripple=""><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></Link>

                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            console.log(credentialResponse);
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}
                                    />
                                    </div>
                                    <span>аль хэдийн данстай юу?<Link className="we-account underline" to={'/login'} title="">Нэвтрэх</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


        </div>
    )
}

export default Register