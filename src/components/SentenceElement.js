import React, { useState, useEffect, useRef } from "react";

function SentenceElement({ variants, onVariantChange, dataIndex, onHover }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showVariants, setShowVariants] = useState(false);
  const [variantPosition, setVariantPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const containerRef = useRef(null);

  useEffect(() => {
    setSelectedVariant(variants[0]);
  }, [variants]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowVariants(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const handleSelectVariant = (variant) => () => {
    setSelectedVariant(variant);
    onVariantChange(variant);
  };

  const toggleVariants = (e) => {
    setShowVariants(!showVariants);
    const style = getComputedStyle(e.target);
    const lineHeight = parseInt(style.lineHeight);
    const height = e.target.offsetHeight;

    const top = "100%";
    let left = 0;
    let width = "auto";

    if (height > lineHeight) {
      left = -e.target.offsetLeft;
      width = e.target.offsetWidth;
    }

    setVariantPosition({ top, left, width });
  };

  return (
    <span
      className={`translatedSentence ${ showVariants ? "showVariants" : "" }`} 
      onClick={toggleVariants}
      ref={containerRef}
      data-index={dataIndex}
      onMouseEnter={() => onHover(dataIndex, true)}
      onMouseLeave={() => onHover(dataIndex, false)}
    >
      {selectedVariant}{" "}
      {showVariants && (
        <div
          className="translation-variants"
          style={{
            top: variantPosition.top,
            left: variantPosition.left,
            maxWidth: variantPosition.width,
          }}
        >
          {variants.map((variant, index) => (
            <div
              className={`variant ${
                selectedVariant === variant ? "selected" : ""
              }`}
              key={index}
              onClick={handleSelectVariant(variant)}
            >
              {variant}
            </div>
          ))}
        </div>
      )}
    </span>
  );
}

export default SentenceElement;