import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

export default function Loading(props) {
    const {isLoading} = useSelector(state => state.loadingReducer)
  return (
    <Fragment>
      {isLoading ? (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black"
          style={{ backgroundColor: "rgba(0,0,0,1)" }}
        >
          <img
            style={{ width: "400px" }}
            src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!c1024wm0"
            alt="loading-gif"
          />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
