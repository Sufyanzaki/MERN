import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const SidebarLeft = ({handleLeftSlide}) => {
    const [submenu, setSubmenu] = useState(false);
  return (
    <div className={`fixed-sidebar left`}>
    <div className="menu-left">
      <div className="left-menu">
        <SimpleBar style={{ maxHeight: '100%' }}>
          <span>
            <a
              href="https://www.google.com"
              className="menu-small"
              title=""
              onClick={handleLeftSlide}
            >
              <svg viewBox="0 0 512 512"><path d="M512 96c0-8.801-7.199-16-16-16h-480C7.201 80 0 87.2 0 96c0 8.799 7.201 16 16 16h480C504.8 112 512 104.8 512 96zM16 224C7.201 224 0 231.2 0 240v192C0 440.8 7.201 448 16 448C24.8 448 32 440.8 32 432v-192C32 231.2 24.8 224 16 224zM496 400h-352C135.2 400 128 407.2 128 416c0 8.799 7.201 16 16 16h352c8.801 0 16-7.201 16-16C512 407.2 504.8 400 496 400zM496 240h-352C135.2 240 128 247.2 128 256c0 8.799 7.201 16 16 16h352C504.8 272 512 264.8 512 256C512 247.2 504.8 240 496 240z" /></svg>
            </a>
          </span>

          <span>
            <Link
              to={"/"}
              title="Newsfeed Page"
              data-toggle="tooltip"
              data-placement="right"
            >
              <svg viewBox="0 0 448 512"><path d="M409.1 32h-66.28C321.4 32 304 49.44 304 70.86V256c0 44.11-35.89 80-80 80S144 300.1 144 256V70.86C144 49.44 126.6 32 105.1 32H38.86C17.44 32 0 49.44 0 70.86V256c0 123.5 100.5 224 224 224s224-100.5 224-223.1V70.86C448 49.44 430.6 32 409.1 32zM32 70.86C32 67.14 35.14 64 38.86 64h66.28C108.9 64 112 67.14 112 70.86V128H32V70.86zM416 256c0 105.9-86.13 192-192 192s-192-86.13-192-192V160h80v96c0 61.76 50.24 112 112 112c61.76 0 112-50.24 112-112V160H416V256zM416 128h-80V70.86C336 67.14 339.1 64 342.9 64h66.28C412.9 64 416 67.14 416 70.86V128z" /></svg>
            </Link>
          </span>
          <span>
            <Link
              to={"/"}
              title="Forum"
              data-toggle="tooltip"
              data-placement="right"
            >
              <svg viewBox="0 0 448 512"><path d="M5.8 309.7C2 292.7 0 275.5 0 258.3 0 135 99.8 35 223.1 35c16.6 0 33.3 2 49.3 5.5C149 87.5 51.9 186 5.8 309.7zm392.9-189.2C385 103 369 87.8 350.9 75.2c-149.6 44.3-266.3 162.1-309.7 312 12.5 18.1 28 35.6 45.2 49 43.1-151.3 161.2-271.7 312.3-315.7zm15.8 252.7c15.2-25.1 25.4-53.7 29.5-82.8-79.4 42.9-145 110.6-187.6 190.3 30-4.4 58.9-15.3 84.6-31.3 35 13.1 70.9 24.3 107 33.6-9.3-36.5-20.4-74.5-33.5-109.8zm29.7-145.5c-2.6-19.5-7.9-38.7-15.8-56.8C290.5 216.7 182 327.5 137.1 466c18.1 7.6 37 12.5 56.6 15.2C240 367.1 330.5 274.4 444.2 227.7z" /></svg>
            </Link>
          </span>
          <span>
            <Link
              to={"/"}
              title="Friends"
              data-toggle="tooltip"
              data-placement="right"
            >
              <svg viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM224 32c52.94 0 96 43.06 96 96c0 52.93-43.06 96-96 96S128 180.9 128 128C128 75.06 171.1 32 224 32zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM413.3 480H34.66C33.2 480 32 478.8 32 477.3C32 399.4 95.4 336 173.3 336h101.3C352.6 336 416 399.4 416 477.3C416 478.8 414.8 480 413.3 480z" /></svg>
            </Link>
          </span>
          <span>
            <Link
              to={"/"}
              title="Favourit page"
              data-toggle="tooltip"
              data-placement="right"
            >
              <svg viewBox="0 0 576 512"><path d="M528.5 171.5l-146.4-21.29l-65.43-132.4C310.9 5.971 299.4-.002 287.1 0C276.6 0 265.1 5.899 259.3 17.8L193.8 150.2L47.47 171.5C21.2 175.3 10.68 207.6 29.72 226.1l105.9 102.1L110.6 474.6C107 495.3 123.6 512 142.2 512c4.932 0 10.01-1.172 14.88-3.75L288 439.6l130.9 68.7c4.865 2.553 9.926 3.713 14.85 3.713c18.61 0 35.21-16.61 31.65-37.41l-25.05-145.5l105.9-102.1C565.3 207.6 554.8 175.3 528.5 171.5zM407.4 326.2l26.39 153.7l-138.4-72.6c-4.656-2.443-10.21-2.442-14.87 .0008l-138.4 72.66l27.91-162.1l-117.9-114.7l154.7-22.51C211.1 179.9 216.5 176.6 218.8 171.9L288 32l69.21 139.9c2.333 4.716 6.834 7.983 12.04 8.74l154.7 22.49l-111.1 108.9C408.2 315.7 406.5 320.1 407.4 326.2z" /></svg>
            </Link>
          </span>
          <span>
            <Link
              to={"/"}
              title="Messages"
              data-toggle="tooltip"
              data-placement="right"
            >
              <svg viewBox="0 0 512 512"><path d="M447.1 0h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.1c0 9.838 11.03 15.55 19.12 9.7l124.9-93.7h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 0 447.1 0zM480 352c0 17.6-14.4 32-32 32h-144.1c-6.928 0-13.67 2.248-19.21 6.406L192 460v-60c0-8.838-7.164-16-16-16H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h384c17.6 0 32 14.4 32 32V352zM272 240h-128c-8.801 0-16 7.189-16 15.99C127.1 264.8 135.2 272 144 272h128c8.801 0 15.1-7.213 15.1-16.01C287.1 247.2 280.8 240 272 240zM368 144h-224c-8.801 0-16 7.193-16 15.99C127.1 168.8 135.2 176 144 176h224c8.801 0 15.1-7.21 15.1-16.01C383.1 151.2 376.8 144 368 144z" /></svg>
            </Link>
          </span>
          <span>
            <Link
              to={"/"}
              title="Notification"
              data-toggle="tooltip"
              data-placement="right"
            >
              <svg viewBox="0 0 448 512"><path d="M207.1 16C207.1 7.164 215.2 0 223.1 0C232.8 0 240 7.164 240 16V32.79C320.9 40.82 384 109 384 192V221.1C384 264.8 401.4 306.7 432.3 337.7L435 340.4C443.3 348.7 448 359.1 448 371.7C448 396.2 428.2 416 403.7 416H44.28C19.83 416 0 396.2 0 371.7C0 359.1 4.666 348.7 12.97 340.4L15.72 337.7C46.63 306.7 64 264.8 64 221.1V192C64 109 127.1 40.82 208 32.79L207.1 16zM223.1 64C153.3 64 95.1 121.3 95.1 192V221.1C95.1 273.3 75.26 323.4 38.35 360.3L35.6 363C33.29 365.3 31.1 368.5 31.1 371.7C31.1 378.5 37.5 384 44.28 384H403.7C410.5 384 416 378.5 416 371.7C416 368.5 414.7 365.3 412.4 363L409.7 360.3C372.7 323.4 352 273.3 352 221.1V192C352 121.3 294.7 64 223.1 64H223.1zM223.1 480C237.9 480 249.8 471.1 254.2 458.7C257.1 450.3 266.3 445.1 274.6 448.9C282.9 451.9 287.3 461 284.4 469.3C275.6 494.2 251.9 512 223.1 512C196.1 512 172.4 494.2 163.6 469.3C160.7 461 165.1 451.9 173.4 448.9C181.7 445.1 190.9 450.3 193.8 458.7C198.2 471.1 210.1 480 223.1 480z" /></svg>
            </Link>
          </span>

          <span>
            <Link
              to={"/"}
              title="Account Stats"
              data-toggle="tooltip"
              data-placement="right"
            >
              <svg viewBox="0 0 576 512"><path d="M576 112V288c0 8.844-7.156 16-16 16S544 296.8 544 288V150.6l-212.7 212.7C328.2 366.4 324.1 368 320 368s-8.188-1.562-11.31-4.688L192 246.6l-164.7 164.7C24.19 414.4 20.09 416 16 416C6.861 416 0 408.5 0 400c0-4.094 1.562-8.188 4.688-11.31l176-176C183.8 209.6 187.9 208 192 208s8.188 1.562 11.31 4.688L320 329.4L521.4 128H384c-8.844 0-16-7.156-16-16S375.2 96 384 96h176C568.8 96 576 103.2 576 112z" /></svg>
            </Link>
          </span>

          <span>
            <Link
              to={"/"}
              title="Help"
              data-toggle="tooltip"
              data-placement="right"
            >
              <svg viewBox="0 0 384 512"><path d="M255.9 415.1H128.1c-8.846 0-15.98 7.179-15.97 16.03L112.1 454.3c.0098 6.273 1.81 12.47 5.284 17.69l17.14 25.69c5.225 7.855 17.2 14.28 26.64 14.28h61.67c9.418 0 21.39-6.436 26.61-14.28l17.08-25.68c2.953-4.441 5.341-12.37 5.348-17.7l-.0521-22.33C271.8 423.2 264.7 415.1 255.9 415.1zM239.9 454.4l-16.11 24.45c-.4766 .4336-1.686 1.082-.8672 1.117l-60.29 .1172c-.4238-.1055-1.138-.2793-1.423-.2793c-.1406 0-.1348-.2265 0 0l-17.1-25.48l-.0098-6.37h95.94l.0039 5.179C239.9 453.6 239.7 454.4 239.9 454.4C239.9 454.4 239.8 454.5 239.9 454.4zM315.8 51.3c-33.33-33.22-78.22-52.47-124.3-51.28C94.7 .2944 16 79.89 16 177.4c0 42.9 15.47 84.34 43.55 116.6c13.33 15.31 35.84 49.59 43.73 76.02c1.078 8.687 8.844 14.62 17.64 13.72c8.703-.9687 14.98-8.968 14.11-17.65l-.6094-3.312c-10.31-34.97-36-72.84-50.73-89.77C60.67 246.5 48 212.6 48 177.4c0-81.24 63.05-145.1 143.5-145.3H192c38.13 0 74.05 14.87 101.2 41.93C320.8 101.5 336 138.2 336 177.4c0 35.18-12.67 69.15-35.67 95.62c-14.75 16.94-40.44 54.81-50.75 89.77l-.625 3.343c-1.047 8.749 4.938 17.59 13.67 18.69c.7813 .0938 1.531 .1562 2.281 .1562c7.797 0 14.36-5.124 15.36-13.12c8.344-28.25 30.86-62.52 44.2-77.84C352.5 261.7 368 220.3 368 177.4C368 129.7 349.5 84.89 315.8 51.3zM208 80.01c0-8.843-7.156-16-16-16c-61.75 0-112 50.24-112 111.1C80 184.8 87.16 192 96 192s16-7.158 16-16c0-44.1 35.88-79.1 80-79.1C200.8 96.01 208 88.86 208 80.01z" /></svg>
            </Link>
          </span>
          <span>
            <Link
              to={"/"}
              title="Faq's"
              data-toggle="tooltip"
              data-placement="right"
            >
              <svg viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480zM240 344c-13.25 0-24 10.75-24 24s10.75 24 24 24s24-10.75 24-24S253.3 344 240 344zM285.6 128H226.4C189.8 128 160 157.8 160 194.4V204c0 8.844 7.156 16 16 16S192 212.8 192 204V194.4C192 175.4 207.4 160 226.4 160h59.25C304.6 160 320 175.4 320 194.4c0 12.48-6.781 24-17.06 29.72L242.5 254.3C231.1 260.7 224 272.7 224 285.8V304C224 312.8 231.2 320 240 320S256 312.8 256 304V285.8c0-1.453 .7813-2.797 1.438-3.172l60.41-30.22C338.9 240.7 352 218.5 352 194.4C352 157.8 322.2 128 285.6 128z" /></svg>              </Link>
          </span>
        </SimpleBar>
      </div>
    </div>
    <div className="left-menu-full">
      <ul className="menu-slide">
        <li>
          <a
            href="https://www.google.com"
            className="closd-f-menu"
            title=""
            onClick={handleLeftSlide}
          >
            <svg viewBox="0 0 320 512"><path d="M315.3 411.3c-6.253 6.253-16.37 6.253-22.63 0L160 278.6l-132.7 132.7c-6.253 6.253-16.37 6.253-22.63 0c-6.253-6.253-6.253-16.37 0-22.63L137.4 256L4.69 123.3c-6.253-6.253-6.253-16.37 0-22.63c6.253-6.253 16.37-6.253 22.63 0L160 233.4l132.7-132.7c6.253-6.253 16.37-6.253 22.63 0c6.253 6.253 6.253 16.37 0 22.63L182.6 256l132.7 132.7C321.6 394.9 321.6 405.1 315.3 411.3z" /></svg> close Menu
          </a>
        </li>
        <li className="menu-item-has-children">
          <a
            href="https://www.google.com"
            onClick={() => setSubmenu(!submenu)}
            className=""
            title=""
          >
            <svg viewBox="0 0 576 512"><path d="M570.6 244C577.2 249.8 577.8 259.1 571.1 266.6C566.2 273.2 556 273.8 549.4 267.1L512 234.1V432C512 476.2 476.2 512 432 512H144C99.82 512 64 476.2 64 432V234.1L26.59 267.1C19.96 273.8 9.849 273.2 4.003 266.6C-1.844 259.1-1.212 249.8 5.414 244L277.4 4.002C283.5-1.334 292.5-1.334 298.6 4.002L570.6 244zM144 480H208V320C208 302.3 222.3 288 240 288H336C353.7 288 368 302.3 368 320V480H432C458.5 480 480 458.5 480 432V206.7L288 37.34L96 206.7V432C96 458.5 117.5 480 144 480zM240 480H336V320H240V480z" /></svg> Home Pages
          </a>
          <ul className={`submenu ${submenu}`}>
            <li>
              <Link to={"/"} title="">
                qbox Default
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Company Landing
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Pitrest
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Redpit
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Redpit Category
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Soundnik
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Soundnik Single
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Pitjob
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Shop
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Classified
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                PitPoint
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Pittube
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Messenger
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <a
            href="https://www.google.com"
            onClick={() => setSubmenu(!submenu)}
            className=""
            title=""
          >
            <svg viewBox="0 0 512 512"><path d="M448 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V96C512 60.65 483.3 32 448 32zM384 64v176H128V64H384zM32 96c0-17.64 14.36-32 32-32h32v80H32V96zM32 176h64v64H32V176zM32 272h64v64H32V272zM64 448c-17.64 0-32-14.36-32-32v-48h64V448H64zM128 448V272h256V448H128zM480 416c0 17.64-14.36 32-32 32h-32v-80h64V416zM480 336h-64v-64h64V336zM480 240h-64v-64h64V240zM480 144h-64V64h32c17.64 0 32 14.36 32 32V144z" /></svg>
            Pittube
          </a>
          <ul className={`submenu ${submenu}`}>
            <li>
              <Link to={"/"} title="">
                Pittube
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Pittube single
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Pittube Category
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Pittube Channel
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Pittube Search Result
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/"} className="" title="">
            <i className="fa-light fa-female"></i>PitPoint
          </Link>
          <ul className="submenu">
            <li>
              <Link to={"/pitpoint.html"} title="">
                PitPoint
              </Link>
            </li>
            <li>
              <Link to={"/pitpoint-detail.html"} title="">
                Pitpoint Detail
              </Link>
            </li>
            <li>
              <Link to={"/pitpoint-list.html"} title="">
                Pitpoint List style
              </Link>
            </li>
            <li>
              <Link to={"/pitpoint-without-baner.html"} title="">
                Pitpoint without Banner
              </Link>
            </li>
            <li>
              <Link to={"/pitpoint-search-result.html"} title="">
                Pitpoint Search
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/"} className="" title="">
            <i className="fa-light fa-graduation-cap"></i>Pitjob
          </Link>
          <ul className="submenu">
            <li>
              <Link to={"/career.html"} title="">
                Pitjob
              </Link>
            </li>
            <li>
              <Link to={"/career-detail.html"} title="">
                Pitjob Detail
              </Link>
            </li>
            <li>
              <Link to={"/career-search-result.html"} title="">
                Job seach page
              </Link>
            </li>
            <li>
              <Link to={"/social-post-detail.html"} title="">
                Social Post Detail
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/"} className="" title="">
            <i className="fa-light fa-repeat"></i>Timeline
          </Link>
          <ul className="submenu">
            <li>
              <Link to={"/timeline.html"} title="">
                Timeline
              </Link>
            </li>
            <li>
              <Link to={"/timeline-photos.html"} title="">
                Timeline Photos
              </Link>
            </li>
            <li>
              <Link to={"/timeline-videos.html"} title="">
                Timeline Videos
              </Link>
            </li>
            <li>
              <Link to={"/timeline-groups.html"} title="">
                Timeline Groups
              </Link>
            </li>
            <li>
              <Link to={"/timeline-friends.html"} title="">
                Timeline Friends
              </Link>
            </li>
            <li>
              <Link to={"/timeline-friends2.html"} title="">
                Timeline Friends-2
              </Link>
            </li>
            <li>
              <Link to={"/about.html"} title="">
                Timeline About
              </Link>
            </li>
            <li>
              <Link to={"/blog-posts.html"} title="">
                Timeline Blog
              </Link>
            </li>
            <li>
              <Link to={"/friends-birthday.html"} title="">
                Friends' Birthday
              </Link>
            </li>
            <li>
              <Link to={"/"} title="">
                Newsfeed
              </Link>
            </li>
            <li>
              <Link to={"/search-result.html"} title="">
                Search Result
              </Link>
            </li>
            <li>
              <Link to={"/library.html"} title="">
                Library
              </Link>
            </li>
            <li>
              <Link to={"/library-detail.html"} title="">
                Library Detail
              </Link>
            </li>
            <li>
              <Link to={"/ad-center.html"} title="">
                Ad Center
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/"} className="" title="">
            <i className="fa-light fa-heart"></i>Favourit Page
          </Link>
          <ul className="submenu">
            <li>
              <Link to={"/fav-page.html"} title="">
                Favourit Page
              </Link>
            </li>
            <li>
              <Link to={"/fav-favers.html"} title="">
                Fav Page Likers
              </Link>
            </li>
            <li>
              <Link to={"/fav-events.html"} title="">
                Fav Events
              </Link>
            </li>
            <li>
              <Link to={"/fav-event-invitations.html"} title="">
                Fav Event Invitations
              </Link>
            </li>
            <li>
              <Link to={"/event-calendar.html"} title="">
                Event Calendar
              </Link>
            </li>
            <li>
              <Link to={"/fav-page-create.html"} title="">
                Create New Page
              </Link>
            </li>
            <li>
              <Link to={"/price-plans.html"} title="">
                Price Plan
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/"} className="" title="">
            <i className="fa-light fa-align-justify"></i>Forum
          </Link>
          <ul className="submenu">
            <li>
              <Link to={"/forum.html"} title="">
                Forum
              </Link>
            </li>
            <li>
              <Link to={"/forum-create-topic.html"} title="">
                Forum Create Topic
              </Link>
            </li>
            <li>
              <Link to={"/forum-open-topic.html"} title="">
                Forum Open Topic
              </Link>
            </li>
            <li>
              <Link to={"/forums-category.html"} title="">
                Forum Category
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/"} className="" title="">
            <i className="fa-light fa-arrow-trend-up"></i>Featured
          </Link>
          <ul className="submenu">
            <li>
              <Link to={"/chat-messenger.html"} title="">
                Messenger Chatting
              </Link>
            </li>
            <li>
              <Link to={"/notifications.html"} title="">
                Notifications
              </Link>
            </li>
            <li>
              <Link to={"/badges.html"} title="">
                Badges
              </Link>
            </li>
            <li>
              <Link to={"/faq.html"} title="">
                Faq's
              </Link>
            </li>
            <li>
              <Link to={"/contribution.html"} title="">
                Contriburion Page
              </Link>
            </li>
            <li>
              <Link to={"/manage-page.html"} title="">
                Manage Page
              </Link>
            </li>
            <li>
              <Link to={"/weather-forecast.html"} title="">
                weather-forecast
              </Link>
            </li>
            <li>
              <Link to={"/statistics.html"} title="">
                Statics/Analytics
              </Link>
            </li>
            <li>
              <Link to={"/shop-cart.html"} title="">
                Shop Cart
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/"} title="">
            <i className="fa fa-gears"></i>Account Setting
          </Link>
          <ul className="submenu">
            <li>
              <Link to={"/setting.html"} title="">
                Setting
              </Link>
            </li>
            <li>
              <Link to={"/privacy.html"} title="">
                Privacy
              </Link>
            </li>
            <li>
              <Link to={"/support-and-help.html"} title="">
                Support & Help
              </Link>
            </li>
            <li>
              <Link to={"/support-and-help-detail.html"} title="">
                Support Detail
              </Link>
            </li>
            <li>
              <Link to={"/support-and-help-search-result.html"} title="">
                Support Search
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/"} title="">
            <i className="fa fa-lock"></i>Authentication
          </Link>
          <ul className="submenu">
            <li>
              <Link to={"/login.html"} title="">
                Login Page
              </Link>
            </li>
            <li>
              <Link to={"/register.html"} title="">
                User Register
              </Link>
            </li>
            <li>
              <Link to={"/register2.html"} title="">
                User Register2
              </Link>
            </li>
            <li>
              <Link to={"/logout.html"} title="">
                Logout Page
              </Link>
            </li>
            <li>
              <Link to={"/coming-soon.html"} title="">
                Coming Soon
              </Link>
            </li>
            <li>
              <Link to={"/error-404.html"} title="">
                Error 404
              </Link>
            </li>
            <li>
              <Link to={"/error-404-2.html"} title="">
                Error 404-2
              </Link>
            </li>
            <li>
              <Link to={"/error-500.html"} title="">
                Error 500
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/"} className="" title="">
            <i className="fa fa-wrench"></i>Tools
          </Link>
          <ul className="submenu">
            <li>
              <Link to={"/typography.html"} title="">
                Typography
              </Link>
            </li>
            <li>
              <Link to={"/popup-modals.html"} title="">
                Popups/Modals
              </Link>
            </li>
            <li>
              <Link to={"/post-versions.html"} title="">
                Post Versions
              </Link>
            </li>
            <li>
              <Link to={"/sliders.html"} title="">
                Sliders
              </Link>
            </li>
            <li>
              <Link to={"/google-map.html"} title="">
                Google Maps
              </Link>
            </li>
            <li>
              <Link to={"/widgets.html"} title="">
                Widgets
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>   )
}

export default SidebarLeft