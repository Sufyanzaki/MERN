import React from 'react'

const Privacy = () => {
  return (
<div className='set-title'>
                        <h5>Privacy &amp; data</h5>
                        <span>
                          Deceide whether your profile will be hidden from
                          search engine and what kind of data you want to use to
                          imporve the recommendation and ads you see{' '}
                          <a href='https://google.com' title=''>
                            Learn more
                          </a>
                        </span>
                      <div className='onoff-options '>
                        <form method='post'>
                          <div className='setting-row'>
                            <span>Search Privacy</span>
                            <p>
                              Hide your profile from search engine (Ex.google){' '}
                              <a href='https://google.com' title=''>
                                Learn more
                              </a>
                            </p>
                            <input type='checkbox' id='switch0001' />
                            <label
                              htmlFor='switch0001'
                              data-on-label='ON'
                              data-off-label='OFF'
                            ></label>
                          </div>
                          <div className='set-title'>
                            <h5>Personalization</h5>
                          </div>
                          <div className='setting-row'>
                            <span>Search Privacy</span>
                            <p>
                              use sites you visit to improve which
                              recommendation and ads you see.{' '}
                              <a href='https://google.com' title=''>
                                Learn more
                              </a>
                            </p>
                            <input type='checkbox' id='switch0002' />
                            <label
                              htmlFor='switch0002'
                              data-on-label='ON'
                              data-off-label='OFF'
                            ></label>
                          </div>
                          <div className='setting-row'>
                            <span>Search Privacy</span>
                            <p>
                              use information from our partners to improve which
                              ads you see
                              <a href='https://google.com' title=''>
                                Learn more
                              </a>
                            </p>
                            <input type='checkbox' id='switch0003' />
                            <label
                              htmlFor='switch0003'
                              data-on-label='ON'
                              data-off-label='OFF'
                            ></label>
                          </div>
                        </form>
                      </div>  
                      </div>
)
}

export default Privacy