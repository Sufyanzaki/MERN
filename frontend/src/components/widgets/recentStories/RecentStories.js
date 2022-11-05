import React from "react";
// import SimpleBar from 'simplebar-react';
// import 'simplebar/dist/simplebar.min.css';
import { images } from "../../../utils/imageParser";
import "./RecentStories.css";

const RecentStories = () => {

  return (
    <>
      <div className="central-meta">
        <span className="create-post">
          Recent Stories{" "}
          <a href="https://www.google.com/" title="">
            See All
          </a>
        </span>
        <div className="story-postbox">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3">
              <div className="story-box">
                <figure>
                  <img src={images["story-1.jpg"]} alt="" />
                  <span>Add Your Story</span>
                </figure>
                <div
                  className="story-thumb"
                  data-toggle="tooltip"
                  title=""
                  data-original-title="Add Your Story"
                >
                  <i>
                    <svg viewBox="0 0 448 512"><path d="M432 256C432 264.8 424.8 272 416 272h-176V448c0 8.844-7.156 16.01-16 16.01S208 456.8 208 448V272H32c-8.844 0-16-7.15-16-15.99C16 247.2 23.16 240 32 240h176V64c0-8.844 7.156-15.99 16-15.99S240 55.16 240 64v176H416C424.8 240 432 247.2 432 256z" /></svg>
                  </i>
                </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <div className="story-box">
                  <figure>
                    <img src={images["story-1.jpg"]} alt="" />
                    <span>Adam James</span>
                  </figure>
                  <div
                    className="story-thumb"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Adam James"
                  >
                    <img src={images["thumb-2.jpg"]} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <div className="story-box">
                  <figure>
                    <img src={images["story-1.jpg"]} alt="" />
                    <span>Emily grey</span>
                  </figure>
                  <div
                    className="story-thumb"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Emily grey"
                  >
                    <img src={images["thumb-2.jpg"]} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <div className="story-box">
                  <figure>
                    <img src={images["story-1.jpg"]} alt="" />
                    <span>Jhon Deo</span>
                  </figure>
                  <div
                    className="story-thumb"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Jhon Deo"
                  >
                    <img src={images["thumb-2.jpg"]} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="stories-wraper">
              {/* add active class to active */}
              <div className="status-story">
                <span className="close-story">
                  <svg viewBox="0 0 320 512"><path d="M315.3 411.3c-6.253 6.253-16.37 6.253-22.63 0L160 278.6l-132.7 132.7c-6.253 6.253-16.37 6.253-22.63 0c-6.253-6.253-6.253-16.37 0-22.63L137.4 256L4.69 123.3c-6.253-6.253-6.253-16.37 0-22.63c6.253-6.253 16.37-6.253 22.63 0L160 233.4l132.7-132.7c6.253-6.253 16.37-6.253 22.63 0c6.253 6.253 6.253 16.37 0 22.63L182.6 256l132.7 132.7C321.6 394.9 321.6 405.1 315.3 411.3z" /></svg>
                </span>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="stories-users">
                      <h5>Stories</h5>
                      <div className="my-status">
                        <figure>
                          <img src={images["friend-avatar10.jpg"]} alt="" />
                        </figure>
                        <a href="https://www.google.com/" title="" className="main-btn">
                          Add New
                        </a>
                        <div className="story-user">
                          <span>My Story</span>
                          <ins>No updates</ins>
                        </div>
                      </div>
                      {/* <SimpleBar style={{ maxHeight: 300 }}> */}
                      <ul className="frnds-stories">
                        <li>
                          <figure>
                            <img src={images["friend-avatar10.jpg"]} alt="" />
                          </figure>
                          <div className="story-user">
                            <span>Emily doll</span>
                            <ins>yesterday</ins>
                          </div>
                        </li>
                        <li>
                          <figure>
                            <img src={images["friend-avatar10.jpg"]} alt="" />
                          </figure>
                          <div className="story-user">
                            <span>Jhon Borny</span>
                            <ins>3 days ago</ins>
                          </div>
                        </li>
                        <li>
                          <figure>
                            <img src={images["friend-avatar10.jpg"]} alt="" />
                          </figure>
                          <div className="story-user">
                            <span>Sarah Khan</span>
                            <ins>2 days ago</ins>
                          </div>
                        </li>
                        <li>
                          <figure>
                            <img src={images["friend-avatar10.jpg"]} alt="" />
                          </figure>
                          <div className="story-user">
                            <span>Zara Hayat</span>
                            <ins>1 day ago</ins>
                          </div>
                        </li>
                        <li>
                          <figure>
                            <img src={images["friend-avatar10.jpg"]} alt="" />
                          </figure>
                          <div className="story-user">
                            <span>Zing Jang</span>
                            <ins>2 days ago</ins>
                          </div>
                        </li>

                        <li>
                          <figure>
                            <img src={images["friend-avatar10.jpg"]} alt="" />
                          </figure>
                          <div className="story-user">
                            <span>Emma watson</span>
                            <ins>jan,12 2020</ins>
                          </div>
                        </li>
                      </ul>
                      {/* </SimpleBar> */}
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div id="btns-wrapper">
                      <button className="selector-btn" id="selector0"></button>
                      <div className="prog-bar">
                        <span id="prog-bar0" style={{ width: "100%" }}></span>
                      </div>
                      <button className="selector-btn" id="selector1"></button>
                      <div className="prog-bar">
                        <span id="prog-bar1" style={{ width: "100%" }}></span>
                      </div>
                      <button
                        className="selector-btn selected-btn"
                        id="selector2"
                      ></button>
                      <div className="prog-bar">
                        <span id="prog-bar2" style={{ width: "25.48%" }}></span>
                      </div>
                      <button className="selector-btn" id="selector3"></button>
                      <div className="prog-bar">
                        <span id="prog-bar3" style={{ width: "0px" }}></span>
                      </div>
                      <button className="selector-btn" id="selector4"></button>
                    </div>
                    <div id="slideshow">
                      {/* place story componenet here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      );
};

      export default RecentStories;
