import { useEffect } from "react";

const MathJax = ({ formula }) => {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  }, [formula]);

  return (
    <div>
      <p>Томьёо:</p>
      <div>{`\\(${formula}\\)`}</div>
    </div>
  );
};

export default MathJax;
