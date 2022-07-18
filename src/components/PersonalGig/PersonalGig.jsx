import { Card } from 'antd'
import React from 'react'

export default function PersonalGig() {
  return (
    <section className='personal__gig'>
      <Card className='mt-5'
            title={
               <div className='personalgig__work'>
                <div>
                  <img src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/062c31c4c3d8177e0a989389919ffd0d-1647342235681/office-building.gif" alt="..." />
                </div>
                <div>
                  <h1>Using Fiverr for work?</h1>
                  <span>Expand your in-house capabilities with vetted freelancers for every project.</span>
                  <a href="https://www.fiverr.com/business?source=discover_fiverr_business" target="_blank">
                    Learn about Fiverr Business
                    <i className="ml-2 fa-solid fa-angle-right"></i>
                  </a>
                </div>
               </div>


            }
            style={{
                width: "100%"
            }}
            >
            
        </Card>
      <Card className='mt-3'
            title={
                <div className='personalgig__create'>
                    <div>
                      <span>It seems that you don't have any active Gigs. Get selling!
                      </span>
                    </div>
                    <div>
                      <a href="https://www.fiverr.com/seller_onboarding/overview" target="_blank" className="btn btn-success">
                        Create a New Gig
                      </a>
                    </div>
                   
                </div>


            }
            style={{
                width: "100%"
            }}
            >
            
        </Card>
      <Card className='mt-3'
            title={
                <div className='personalgig__job'>
                    <div className="container">
                      <div className="row">




                        <div className="col-3">
                          <div className="content">
                            <div className="personal__img">
                            </div>
                          </div>
                        </div>


                        <div className="col-9">
                          <div className="content">
                              <h1>Lập trình front end với Reactjs</h1>
                              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi excepturi deleniti quae est sunt eum animi illo laudantium tempora repellat.
                              </p>
                            </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                            <div className="content">
                              <div>
                                  <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <span>4.3</span>
                              </div>
                            </div>
                        </div>
                        <div className="col-6">
                          <div className="content">
                            <div className='personal__btn'>
                              <a href="" className="btn-detail btn btn-success">
                              View detail
                              </a>                    
                              <a href="" className="btn-edit btn btn-warning">
                              Edit
                              </a>                    
                              <a href="" className="btn-delete btn btn-danger">
                              X
                              </a>           
                            </div>
                          </div>
                        </div>
                      </div>
                            
                    </div>
                </div>
                

            }
            style={{
                width: "100%"
            }}
            >
            
        </Card>

    </section>
  )
}
