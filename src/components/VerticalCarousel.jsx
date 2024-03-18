import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import chevronDown from "./assets/chevronDown.svg";
import chevronUp from "./assets/chevronUp.svg";
import "./VerticalCarousel.css";

const VerticalCarousel = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([{}]);
  const handleClick = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === "next") {
        if (prevIndex + 1 > data.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      }

      if (prevIndex - 1 < 0) {
        return data.length - 1;
      }

      return prevIndex - 1;
    });
  };
  let temp = [];
  const getData = (qaPair) => {
    let dataStringified = JSON.stringify(qaPair);
    temp.push(dataStringified);
    localStorage.setItem("data", temp);
    // setSelectedOptions(...selectedOptions, selectedOptions.push(qaPair));
    // temp.push(data);
    // setSelectedOptions(temp);
  };
  const some = localStorage.getItem("data");
  console.log(some, "some");
  return (
    <div className="container">
      <section className="outer-container">
        <div className="carousel-wrapper">
          <button
            type="button"
            className="carousel-button prev"
            onClick={() => handleClick("prev")}
          >
            <img src={chevronUp} alt="" />
          </button>

          <div className="carousel">
            <div className="slides">
              <div className="carousel-inner">
                {data.map((item, i) => (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn("carousel-item", {
                      active: activeIndex === i,
                      visible: activeIndex === i,
                    })}
                    key={item.id}
                  >
                    {item.introline}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="carousel-button next"
            onClick={() => handleClick("next")}
          >
            <img src={chevronDown} alt="" />
          </button>
        </div>
        <div className="content">
          {/* <img
            src={data[activeIndex].content.image}
            alt={data[activeIndex].content.introline}
          /> */}
          {/* <p> */}
          {data[activeIndex].content.options.map((op, idx) => (
            <button
              key={data.id}
              onClick={() => {
                getData({
                  question: data[activeIndex].introline,
                  answer: data[activeIndex].content.options[idx],
                });
              }}
            >
              {op}
            </button>
          ))}
          {/* </p> */}
        </div>
      </section>
    </div>
  );
};

VerticalCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  //   leadingText: PropTypes.string.isRequired,
};

export default VerticalCarousel;
