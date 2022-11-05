import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {images} from '../../../utils/imageParser';
import { login } from '../../../action/userAction';
import useLocalStorage from '../../../utils/useLocalStorage';

const Login = () => {
    const [, setlocal] = useLocalStorage('user')
    const dispatch = useDispatch();
    const { user, error, loading } = useSelector((state) => state.user);

    const notify = (message) => { toast(message); };
        const [clik, setclik] = React.useState({
        email : '', password:'', remember:''});

    const handleChange = (e) =>{
        const {name, value, type, checked} = e.target;
        setclik((prev)=>{
            return({
                ...prev,
                [name] : type === 'checkbox' ? checked : value
            })
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(clik));
        user ? setlocal(user) : setlocal(null)
    }

    useEffect(() => {
        if (error) {
            notify(error);
        }
    }, [error]);

    const style={
        backgroundImage : `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),url(${images['theme-bg.jpg']})`
    }

    return (
        <>
            <div className="www-layout">
            <section>
                <ToastContainer/>
                <div className="gap no-gap signin whitish">
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
                            <svg viewBox="0 0 24 24" width="24" height="24"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg>
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-key"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>нэвтрэх
                                        <span> яг одоо нэвтэрч, дэлхийн өнцөг булан бүрт байгаа гайхалтай найзуудтай уулзана уу. </span>
                                    </div>
                                    <form className="we-form" method="post" onSubmit={handleSubmit}>
                                        <label htmlFor='email'></label>
                                        <input type="text" area-label="forEmail" placeholder="email" id="email" name="email" onChange={handleChange}/>
                                        <label htmlFor='password'></label>
                                        <input type="password" area-label="forPassword" placeholder="Нууц үг" id="password" name="password" onChange={handleChange}/>
                                        <input type="checkbox" area-label="forCheckbox" id="remember" name="remember" onChange={handleChange}/><label htmlFor='remember'>намайг санаарай</label>
                                        {loading?<div className='small-loader'></div>:<button type="submit" data-ripple="">нэвтрэх</button>}
                                        <Link className="forgot underline" to={'/'} title="">нууц үгээ мартсан?</Link>
                                    </form>
                                    <Link className="with-smedia facebook-color" aria-label='facebook' to={'/'} title="" data-ripple=""><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></Link>
                                    <Link className="with-smedia twitter-color" aria-label='twitter' to={'/'} title="" data-ripple=""><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></Link>
                                    <Link className="with-smedia instagram-color" aria-label='instagram' to={'/'} title="" data-ripple=""><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></Link>
                                    <Link className="with-smedia google-color" aria-label='google' to={'/'} title="" data-ripple=""><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></Link>
                                    <span>данс байхгүй юу?<Link className="we-account underline" to={'/register'} title="" aria-label='remember-me'>яг одоо бүртгүүл</Link></span>
                                </div>
                            </div>
                            <div className="arrow-wrapper" onClick={()=>{window.scrollTo(0,600)}}>
                                <div className="arrow-1" ></div>
                                <div className="arrow-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="gap gray-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h4 className="title-head" id="stop-here">Нийгэмд хандах цаг болжээ Бид үүнийг хялбарчлах болно</h4>
                            </div>
                            <div className="proj-post no-top">
                                <div className="proj-avatar">
                                <img src={images['login-project1.png']} alt="" />
                                </div>
                                <div className="proj-meta">
                                    <h3> Qshop </h3>
                                    <p> Дэлхийн хамгийн алдартай цахим худалдааны вэбсайт ба гар утасны апп. Та манай апп -уудыг google play store болон iOS дэлгүүрээс татаж авах боломжтой </p>
                                    <Link to={'/'} aria-label="download-app" title="" className="main-btn"> Апп татаж авах </Link>
                                    <Link to={'/'} aria-label="download-app" title="" className="main-btn"> Вэб рүү очих </Link>
                                </div>
                            </div>
                            <div className="proj-post right">
                                <div className="proj-meta">
                                    <h3> QNews </h3>
                                    <p> Дэлхийн хамгийн алдартай цахим худалдааны вэбсайт ба гар утасны апп. Та манай апп -уудыг google play store болон iOS дэлгүүрээс татаж авах боломжтой </p>
                                    <Link to={'/'} aria-label="download-app" title="" className="main-btn"> Апп татаж авах </Link>
                                    <Link to={'/'} aria-label="download-app" title="" className="main-btn"> Вэб рүү очих </Link>
                                </div>
                                <div className="proj-avatar">
                                <img src={images['login-project1.png']} alt="" />
                                </div>
                            </div>
                            <div className="proj-post">
                                <div className="proj-avatar">
                                <img src={images['login-project1.png']} alt="" />
                                </div>
                                <div className="proj-meta">
                                    <h3> Qwallet </h3>
                                    <p> Дэлхийн хамгийн алдартай цахим худалдааны вэбсайт ба гар утасны апп. Та манай апп -уудыг google play store болон iOS дэлгүүрээс татаж авах боломжтой </p>
                                    <Link to={'/'} aria-label="download-app" title="" className="main-btn"> Апп татаж авах </Link>
                                    <Link to={'/'} aria-label="download-app" title="" className="main-btn"> Вэб рүү очих </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" onClick={()=>{window.scrollTo(0,0)}} strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up-left"><line x1="17" y1="17" x2="7" y2="7"></line><polyline points="7 17 7 7 17 7"></polyline></svg>
            
            <section>
                <div className="gap blackish low-opacity">
                    <div className="parallax-fixed" style={{ backgroundImage: `url(${images['login-banner.jpg']})` }}></div>
                    <div className="banr-meta">
                        {/* <a href='#' target="_blank" aria-label="our-youtube" title="" data-strip-group="mygroup" className="strip vdeo-link" data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }">
                            <i>
                                <svg className="play" x="0px" y="0px" height="55px" width="55px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" ><path className="stroke-solid" fill="none" stroke="" d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7 C97.3,23.7,75.7,2.3,49.9,2.5"/><path className="icon" fill="" d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z" /></svg>
                            </i>
                        </a> */}
                        <h3> Хэрхэн ажилладаг вэ </h3>
                        <p> Зүгээр л санаа алдаад нийтлэлүүдтэй найзууд болж эхлээрэй. </p>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}

export default Login