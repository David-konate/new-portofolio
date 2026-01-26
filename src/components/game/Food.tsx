

import React from "react";

interface FoodProps {
  dot: number[];
}

const Food: React.FC<FoodProps> = ({ dot }) => {
  const style = {
    left: `${dot[0]}px`,
    top: `${dot[1]}px`,
  };

  return <div className="snake-food" style={style}></div>;
};

export default Food;

