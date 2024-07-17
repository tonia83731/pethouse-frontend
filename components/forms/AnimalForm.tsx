"use client";
import { useRef } from "react";
import RandomCodeGenerator from "../common/input/RandomCodeGenerator";
import DefaultInput from "../common/input/DefaultInput";
import DefaultSelect from "../common/input/DefaultSelect";
import { yes_no_options } from "@/data/adoptSelectOptions";
import { useState } from "react";
const AnimalForm = () => {
  const [randomcode, setRandomCode] = useState("");

  const generateRandomCode = (length = 12) => {
    let code = "";
    const number_and_char = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * number_and_char.length);
      code += number_and_char[random];
    }
    return code;
  };

  const handleCodeGenerate = () => {
    const generatedCode = generateRandomCode();
    setRandomCode(generatedCode);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <RandomCodeGenerator value={randomcode} onClick={handleCodeGenerate} />
      </div>
    </div>
  );
};

export default AnimalForm;
