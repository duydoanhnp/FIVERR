import React from 'react'
import { Card } from 'antd';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userInfoAPI } from '../../redux/reducers/userReducer';
function PersonalInfo(props) {
    const dispatch = useDispatch()
    console.log(props.match);
    useEffect(() =>{
        // let {id} = props.match.params
        // const action = userInfoAPI(id)
        // dispatch(action)
    },[])
  return (
    <section className='personal__info'>
        <Card className='mt-5'
            title={
                <div>
                    <div className='personal__avatar'>
                        <a>
                            L
                        </a>
                        <div className="personal__camera">
                            <i className="fa-solid fa-camera"></i>
                        </div>
                    </div>
                    <div className="personal__name">
                        <h1>UserName</h1>
                        <a className='personal__icon' href="">
                            <i className="fa-solid fa-pen"></i>
                        </a>
                        <br/>
                        <a className='btn btn-primary' href="">
                            Preview Fiverr Profile
                        </a>
                    </div>
                </div>


            }
            extra={<span className='personal__badge badge badge-pill badge-success'>· Online</span>}
            style={{
                width: "100%"
            }}
            >
            <div className="personal__detail">
                <div className="personal__left">
                    <span>
                        <i className="fa-solid fa-location-dot"></i>
                        From
                    </span>
                    <br/>
                    <span>
                        <i className="fa-solid fa-user-astronaut"></i>
                        Member since
                    </span>
                </div>
                <div className="personal__right">
                    <span>
                        Vietnam
                    </span>
                    <br/>
                    <span>
                        May 2022
                    </span>
                </div>
            </div>
        </Card>
        <Card className='mt-4 personalinfo__learn'
            title={
                <div className='personal__learn'>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_png/v1/attachments/generic_asset/asset/6bef0aaa4d62dcf41383658e5e3211ee-1571214998624/fiverrlearn_logo.svg" alt="..." />
                    </div>
                    <div className='personallearn__detail'>
                        <div>
                            <img src="https://npm-assets.fiverrcdn.com/assets/@fiverr-private/fiverr_learn/enroll-icon.69b770f.svg" alt="..." />
                        </div>
                        <h1>Earn badges and stand out</h1>
                        <br/>
                        <span>Boost your sales, by boosting your expertise.</span>
                        <br/>
                        <a target="_blank" href="https://www.fiverr.com/fiverrlearn/thinkific" className='btn btn-success'>Enroll Now</a>
                    </div>
                   
                </div>


            }
            style={{
                width: "100%"
            }}
            >
            
        </Card>
        <Card className='mt-4 personalinfo__desc'
       
            style={{
                width: "100%"
            }}
            >
            <div className="personal__desc">
                <div className="personal__left">
                    <span>
                         Description
                    </span>
                </div>
                <div className="personal__right">
                    <a href=''>
                        Edit Description
                    </a>
                   
                </div>
                <div className="personal__separator">
                </div>
            </div>
            <div className="personal__desc">
                <div className="personal__left">
                    <span>
                        Languages
                    </span>
                    <p>
                    English -
                    <span className='subtitle ml-1'>
                        Basic
                    </span> 
                        <a href="">
                            <i className='fa-solid fa-pen'></i>
                        </a>
                    </p>
                </div>
                <div className="personal__right">
                    <a href=''>
                        Add New
                    </a>
                   
                </div>
                <div className="personal__separator">
                </div>
            </div>
            <div className="personal__desc">
                <div className="personal__left">
                    <span>
                        Linked Accounts
                    </span>
                    <br/>
                    <a target="_blank" href="https://www.facebook.com/" className='personal__apps'>
                        <i className="mr-3 fa-solid fa-plus"></i>
                        Facebook
                    </a>
                    <a target="_blank" href="https://www.google.com/" className='personal__apps'>
                        <i className="mr-3 fa-solid fa-plus"></i>
                        Google
                    </a>
                    <a target="_blank" href="https://dribbble.com/" className='personal__apps'>
                        <i className="mr-3 fa-solid fa-plus"></i>
                        Dribbble
                    </a>
                    <a target="_blank" href="https://stackoverflow.com/" className='personal__apps'>
                        <i className="mr-3 fa-solid fa-plus"></i>
                        Stack Overflow
                    </a>
                    <a target="_blank" href="https://github.com/" className='personal__apps'>
                        <i className="mr-3 fa-solid fa-plus"></i>
                        GitHub
                    </a>
                    <a target="_blank" href="https://vimeo.com/" className='personal__apps'>
                        <i className="mr-3 fa-solid fa-plus"></i>
                        Vimeo
                    </a>
                    <a target="_blank" href="https://twitter.com/" className='personal__apps'>
                        <i className="mr-3 fa-solid fa-plus"></i>
                        Twitter
                    </a>
                </div>
             
                <div className="personal__separator">
                </div>
            </div>
            <div className="personal__desc">
                <div className="personal__left">
                    <span>
                        Skills
                    </span>
                    <p>
                    <span className='subtitle'>
                        Add your Skills.
                    </span> 
                    </p>
                </div>
                <div className="personal__right">
                    <a href=''>
                        Add New
                    </a>
                   
                </div>
                <div className="personal__separator">
                </div>
            </div>
            <div className="personal__desc">
                <div className="personal__left">
                    <span>
                         Education
                    </span>
                    <p>
                    <span className='subtitle'>
                         Add your Education.
                    </span> 
                    </p>
                </div>
                <div className="personal__right">
                    <a href=''>
                        Add New
                    </a>
                   
                </div>
                <div className="personal__separator">
                </div>
            </div>
            <div className="personal__desc">
                <div className="personal__left">
                    <span>
                        Certification
                    </span>
                    <p>
                    <span className='subtitle'>
                        Add your Certification.
                    </span> 
                    </p>
                </div>
                <div className="personal__right">
                    <a href=''>
                        Add New
                    </a>
                   
                </div>
            </div>
        </Card>
        <Card className='mt-4 personalinfo__share'
            title={
                <div className='personal__share'>
                    <h1>Shared activity information</h1>
                    <span>In order to provide the best possible work and service,
                    <br/> some information about your activity on Fiverr may be 
                    <br/>shared with sellers. Manage settings</span>
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
export default memo(PersonalInfo)