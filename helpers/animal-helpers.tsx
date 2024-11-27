import { PiGenderMaleBold } from "react-icons/pi";
import { PiGenderFemaleBold } from "react-icons/pi";
import { FaQuestion } from "react-icons/fa6";

import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

export type GenderType = "Male" | "Female" | null;
export type SizeType = "S" | "M" | "L";
export type AgeType = "Child" | "Adult";

export type AnimalType = "Dog" | "Cat" | "Rabbit" | "Bird";

export const TransformAnimal = (animal: AnimalType) => {
  switch (animal) {
    case "Dog":
      return "狗";
    case "Cat":
      return "貓";
    case "Rabbit":
      return "兔";
    case "Bird":
      return "鳥";
    default:
      return "其他";
  }
};

export const TransformGender = (gender: GenderType) => {
  switch (gender) {
    case "Male":
      return <PiGenderMaleBold />;
    case "Female":
      return <PiGenderFemaleBold />;
    default:
      return <FaQuestion />;
  }
};

export const TransformSize = (size: SizeType) => {
  switch (size) {
    case "S":
      return "小型";
    case "M":
      return "中型";
    case "L":
      return "大型";
    default:
      return null;
  }
};

export const TransformAge = (age: AgeType) => {
  switch (age) {
    case "Child":
      return "幼年";
    case "Adult":
      return "成年";
    default:
      return null;
  }
};

export const TransforTrueFalse = (boolean: boolean) => {
  if (boolean) {
    return (
      <div className="text-neutral">
        <FaCheck />
      </div>
    );
  } else {
    return (
      <div className="text-berry">
        <ImCross />
      </div>
    );
  }
};
