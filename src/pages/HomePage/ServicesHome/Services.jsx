import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
    };
    return (
      <div className="services">
        <h2>Popular professional services</h2>
        <Slider className="slider" ref={(c) => (this.slider = c)} {...settings}>
          <div className="services-content">
            <Link to="/joblist?name=logo%20design">
              <div className="services-1" key={1}>
                <p>Build your brand</p>
                <h4>Logo Design</h4>
              </div>
            </Link>
          </div>
          <div className="services-content">
            <Link to="/joblist?name=WordPress">
              <div className="services-2" key={2}>
                <p>Customize your site</p>
                <h4>WordPress</h4>
              </div>
            </Link>
          </div>
          <div className="services-content">
            <Link to="/joblist?name=voice">
              <div className="services-3" key={3}>
                <p>Share your message</p>
                <h4>Voice Over</h4>
              </div>
            </Link>
          </div>
          <div className="services-content">
            <Link to="/joblist?name=explainer">
              <div className="services-4" key={4}>
                <p>Engage your audience</p>
                <h4>Video Explainer</h4>
              </div>
            </Link>
          </div>
          <div className="services-content">
            <Link to="/joblist?name=social">
              <div className="services-5" key={5}>
                <p>Reach more customers</p>
                <h4>Social Media</h4>
              </div>
            </Link>
          </div>
          <div className="services-content">
            <Link to="/joblist?name=seo">
              <div className="services-6" key={6}>
                <p>Unlock growth online</p>
                <h4>SEO</h4>
              </div>
            </Link>
          </div>
          <div className="services-content">
            <Link to="/joblist?name=draw">
              <div className="services-7" key={7}>
                <p>Color your dreams</p>
                <h4>IIIlustration</h4>
              </div>
            </Link>
          </div>
          <div className="services-content">
            <Link to="/joblist?name=translate">
              <div className="services-8" key={8}>
                <p>Go global</p>
                <h4>Translation</h4>
              </div>
            </Link>
          </div>
          <div className="services-content">
            <Link to="/joblist?name=data%20entry">
              <div className="services-9" key={9}>
                <p>Learn your business</p>
                <h4>Data Entry</h4>
              </div>
            </Link>
          </div>
          <div className="services-content">
            <Link to="/joblist?name=book">
              <div className="services-10" key={10}>
                <p>Showcase your story</p>
                <h4>Book Covers</h4>
              </div>
            </Link>
          </div>
        </Slider>
        <div style={{ textAlign: "center" }}>
          <button className="button previous" onClick={this.previous}>
            <LeftOutlined />
          </button>
          <button className="button next" onClick={this.next}>
            <RightOutlined />
          </button>
        </div>
      </div>
    );
  }
}
