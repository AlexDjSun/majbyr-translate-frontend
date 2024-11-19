// src/components/TextEditorArea.js

import React, { useEffect } from "react";
import ToolsArea from "./ToolsArea";
import { useTranslation } from "react-i18next";

function TextEditorArea({
  inputRef,
  sourceText,
  onTts,
  sourceLang,
  isAudioPlaying,
  setIsAudioPlaying,
  ttsLanguages,
  onHover,
}) {
  const { t } = useTranslation();

  const handleKeyDown = (event) => {
    const blockedKeys = ["b", "i", "u"];
    if ((event.metaKey || event.ctrlKey) && blockedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const div = inputRef.current;
    div.addEventListener("keydown", handleKeyDown);

    return () => {
      div.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  return (
    <div className="input-area">
      <div
        className="sourceText"
        ref={inputRef}
        contentEditable={true}
        placeholder={t("Enter text to translate")}
        suppressContentEditableWarning={true}
        style={{ whiteSpace: "pre-wrap" }}
      ></div>
      <ToolsArea
        text={sourceText}
        lang={sourceLang}
        isAudioPlaying={isAudioPlaying}
        onTts={onTts}
        setIsAudioPlaying={setIsAudioPlaying}
        isTtsDisabled={true}
        ttsLanguages={ttsLanguages}
      />
    </div>
  );
}

export default TextEditorArea;