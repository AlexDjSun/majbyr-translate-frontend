// src/components/TranslationArea.js

import React, { useState, useEffect } from "react";
import SentenceElement from "./SentenceElement";
import ToolsArea from "./ToolsArea";

function TranslationArea({
  translatedSentences,
  targetLang,
  isAudioPlaying,
  onTts,
  setIsAudioPlaying,
  isTtsDisabled,
  ttsLanguages,
  translationRef,
  onHover,
}) {

  const [selectedVariants, setSelectedVariants] = useState([]);

  useEffect(() => {
    const initialVariants = translatedSentences.map(paragraph => 
      paragraph.map(sentence => sentence[0])
    );
    setSelectedVariants(initialVariants);
  }, [translatedSentences]);

  const handleVariantChange = (paragraphIndex, sentenceIndex, newVariant) => {
    setSelectedVariants((prevVariants) => {
      const newVariants = [...prevVariants];
      if (!newVariants[paragraphIndex]) {
        newVariants[paragraphIndex] = [];
      }
      newVariants[paragraphIndex][sentenceIndex] = newVariant;
      return newVariants;
    });
  };

  return (
    <div className="translation-area">
      <div className="translationText" ref={translationRef}>
        {translatedSentences.map((paragraph, paragraphIndex) => (
          <div className="paragraph" key={paragraphIndex}>
            {paragraph.map((translationVariants, sentenceIndex) => (
              <SentenceElement
                variants={translationVariants}
                key={sentenceIndex}
                onVariantChange={(newVariant) =>
                  handleVariantChange(paragraphIndex, sentenceIndex, newVariant)
                }
                dataIndex={`${paragraphIndex}-${sentenceIndex}`}
                onHover={onHover}
              />
            ))}
          </div>
        ))}
      </div>
      <ToolsArea
        text={selectedVariants
          .map((paragraph) => paragraph.join(" "))
          .join("\n")}
        lang={targetLang}
        isAudioPlaying={isAudioPlaying}
        onTts={onTts}
        setIsAudioPlaying={setIsAudioPlaying}
        isTtsDisabled={isTtsDisabled}
        ttsLanguages={ttsLanguages}
        inTranslation={true}
      />
    </div>
  );
}

export default TranslationArea;