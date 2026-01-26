import React from "react";

interface SnakeProps {
  snakeDots: number[][];
}

const Snake: React.FC<SnakeProps> = ({ snakeDots }) => {
  return (
    <>
      {snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}px`,
          top: `${dot[1]}px`,
        };
        return <div className="snake-dot" key={i} style={style}></div>;
      })}
    </>
  );
};

export default Snake;

