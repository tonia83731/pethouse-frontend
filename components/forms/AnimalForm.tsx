"use client";
import { useRef } from "react";
import RandomCodeGenerator from "../common/input/RandomCodeGenerator";
import DefaultInput from "../common/input/DefaultInput";
import DefaultSelect from "../common/input/DefaultSelect";
import DefaultFile from "../common/input/DefaultFile";
import { useState } from "react";
const sex_options = [
  {
    value: "F",
    label: "female",
  },
  {
    value: "M",
    label: "male",
  },
  {
    value: "N",
    label: "unknown",
  },
];
const bodytype_options = [
  {
    value: "SMALL",
    label: "small",
  },
  {
    value: "MEDIUM",
    label: "medium",
  },
  {
    value: "BIG",
    label: "big",
  },
];
const age_options = [
  {
    value: "CHILD",
    label: "child",
  },
  {
    value: "ADULT",
    label: "adult",
  },
];
const true_false_options = [
  {
    value: "T",
    label: "true",
  },
  {
    value: "F",
    label: "false",
  },
  {
    value: "N",
    label: "unknown",
  },
];
const AnimalForm = () => {
  const [randomcode, setRandomCode] = useState("");
  const varietyRef = useRef(null);
  const kindRef = useRef(null);
  const sexRef = useRef(null);
  const bodytypeRef = useRef(null);
  const ageRef = useRef(null);
  const sterilizeRef = useRef(null);
  const vaccinateRef = useRef(null);
  const shelterRef = useRef(null);
  const telRef = useRef(null);

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
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
        <RandomCodeGenerator value={randomcode} onClick={handleCodeGenerate} />
        <DefaultInput
          id="animal_Variety"
          name="animal_Variety"
          label="Animal Variety"
          inputRef={varietyRef}
          placeholder="Mixed Breed"
          extraClass="w-full"
        />
        <DefaultInput
          id="animal_kind"
          name="animal_kind"
          label="Animal Kind"
          inputRef={kindRef}
          placeholder="Dog"
          extraClass="w-full"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
        <DefaultSelect
          selectRef={sexRef}
          options={sex_options}
          id="animal_sex"
          label="Sex"
        />
        <DefaultSelect
          selectRef={bodytypeRef}
          options={bodytype_options}
          id="animal_bodytype"
          label="Bodytype"
        />
        <DefaultSelect
          selectRef={ageRef}
          options={age_options}
          id="animal_age"
          label="Age"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultSelect
          selectRef={sterilizeRef}
          options={true_false_options}
          id="animal_sterilization"
          label="Be neutered/spayed/fixed?"
        />
        <DefaultSelect
          selectRef={vaccinateRef}
          options={true_false_options}
          id="animal_bacterin"
          label="Be vaccinated?"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          id="shelter_name"
          name="shelter_name"
          label="Shelter Name"
          inputRef={shelterRef}
          placeholder="Pet House Organization"
          extraClass="w-full"
        />
        <DefaultInput
          id="shelter_tel"
          name="shelter_tel"
          label="Shelter Tel"
          inputRef={telRef}
          placeholder="+886 1234 5678"
          extraClass="w-full"
        />
      </div>
      <DefaultFile />
      <div className="flex justify-center md:justify-end">
        <button className="bg-wine text-white rounded-md px-4 py-2">Add</button>
      </div>
    </div>
  );
};

export default AnimalForm;

// animal_sex, animal_kind, animal_id, album_file,
