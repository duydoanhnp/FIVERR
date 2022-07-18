import React, { Component } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default class Reviews extends Component {
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
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="reviews">
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          <div key={1}>
            <div className="reviews-content">
              <div className="reviews-video">
                <video controls src="./videos/review1.mp4"></video>
              </div>
              <div className="reviews-text">
                <h5>Kay Kim, Co-Founder</h5>
                <p>
                  <i>
                    "It's extremely exciting that Fiverr has freelancers
                    <br /> from all over the world — it broadens the talent
                    pool.
                    <br /> One of the best things about Fiverr is that while
                    we're
                    <br /> sleeping, someone's working."
                  </i>
                </p>
              </div>
            </div>
          </div>
          <div key={2}>
            <div className="reviews-content">
              <div className="reviews-video">
                <video controls src="./videos/review2.mp4"></video>
              </div>
              <div className="reviews-text">
                <h5>Caitlin Tormey, Chief Commercial Officer</h5>
                <p>
                  <i>
                    "We've used Fiverr for Shopify web development,
                    <br /> graphic design, and backend web development.
                    <br /> Working with Fiverr makes my job a little easier
                    <br /> every day."
                  </i>
                </p>
              </div>
            </div>
          </div>
          <div key={3}>
            <div className="reviews-content">
              <div className="reviews-video">
                <video controls src="./videos/review3.mp4"></video>
              </div>
              <div className="reviews-text">
                <h5>Brighid Gannon (DNP, PMHNP-BC), Co-Founder</h5>
                <p>
                  <i>
                    "We used Fiverr for SEO, our logo, website, copy,
                    <br /> animated videos — literally everything. It was like
                    <br /> working with a human right next to you versus being
                    <br /> across the world."
                  </i>
                </p>
              </div>
            </div>
          </div>
          <div key={4}>
            <div className="reviews-content">
              <div className="reviews-video">
                <video controls src="./videos/review4.mp4"></video>
              </div>
              <div className="reviews-text">
                <h5>Tim and Dan Joo, Co-Founders</h5>
                <p>
                  <i>
                    "When you want to create a business bigger than
                    <br /> yourself, you need a lot of help. That's what Fiverr
                    <br /> does."
                  </i>
                </p>
              </div>
            </div>
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
