import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ChangeEvent,
} from "react";
export const steps_btn = [
  {
    id: "STEP 1",
    num: 1,
    title: "基本資料",
  },
  {
    id: "STEP 2",
    num: 2,
    title: "家庭狀況",
  },
  {
    id: "STEP 3",
    num: 3,
    title: "飼養經驗",
  },
];
type FormInputType = {
  animalId: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  city: string;
  address: string;
  occupation: string;
  income: string;
  housetype: string;
  livingarea: string;
  activityarea: string[];
  familynumber: number;
  agreement: boolean;
  allergic: boolean;
  otheranimal: boolean;
  petexperience: boolean;
  skills: boolean;
  accepttraining: boolean;
  alone: number;
  reason: string;
};
interface FormContextState {
  currStep: number;
  inputValue: FormInputType;
  handleStepClick: (type: "prev" | "next" | "number", number?: number) => void;
  handleFormInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (
    name: string,
    value: { label: string; value: string }
  ) => void;
  handleTrueFalseChange: (name: string, option: boolean) => void;
}
export const FormContext = createContext<FormContextState | null>(null);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [currStep, setCurrStep] = useState(1);
  const [inputValue, setInputValue] = useState<FormInputType>({
    animalId: "",
    name: "",
    age: 20,
    phone: "",
    email: "",
    city: "",
    address: "",
    occupation: "",
    income: "",
    housetype: "",
    livingarea: "",
    activityarea: [],
    familynumber: 1,
    agreement: false,
    allergic: false,
    otheranimal: false,
    petexperience: false,
    skills: false,
    accepttraining: false,
    alone: 0,
    reason: "",
  });
  const handleStepClick = (
    type: "prev" | "next" | "number",
    number?: number
  ) => {
    if (type === "prev") setCurrStep(currStep - 1);
    else if (type === "next") setCurrStep(currStep + 1);
    else setCurrStep(number as number);
  };
  const handleFormInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSelectChange = (
    name: string,
    value: { label: string; value: string }
  ) => {
    const inputValue = value.value;
    setInputValue((prev) => ({ ...prev, [name]: inputValue }));
  };
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };
  const handleTrueFalseChange = (name: string, option: boolean) => {
    setInputValue((prev) => ({ ...prev, [name]: option }));
  };
  return (
    <FormContext.Provider
      value={{
        currStep,
        inputValue,
        handleStepClick,
        handleFormInputChange,
        handleCheckboxChange,
        handleSelectChange,
        handleTrueFalseChange,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
