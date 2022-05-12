import React from "react";
import { FaAngleRight } from "react-icons/fa";

const SectionHeading = ({ text, width }: { text: string; width: number }) => {
  return (
    <h1 className="section-heading" style={{ width: `${width}rem` }}>
      {text} <FaAngleRight />
    </h1>
  );
};

export default SectionHeading;
