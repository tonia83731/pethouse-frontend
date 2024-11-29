import { useFormContext, steps_btn } from "@/context/FormContext";

const AdoptionSteps = () => {
  const { currStep, handleStepClick } = useFormContext();
  return (
    <>
      <div className="bg-application-mobile w-full h-[260px] bg-no-repeat bg-center bg-cover md:hidden">
        <div className="w-full h-full bg-dark-40 hover:bg-dark-5">
          <div className="h-[60px]"></div>
          <div className="h-[calc(100%-60px)] flex justify-center items-center">
            <div className="w-9/12 mx-auto flex justify-center items-start gap-20">
              {steps_btn.map(({ id, num }) => {
                return (
                  <button
                    onClick={() => handleStepClick("number", num)}
                    className="flex flex-col items-center gap-1.5"
                    key={id}
                  >
                    <div
                      className={`flex justify-center items-center font-nunito font-bold w-12 h-12 text-2xl border-2 border-white rounded-full ${
                        currStep === num
                          ? "bg-white text-dark"
                          : "text-white hover:bg-white hover:text-dark"
                      }`}
                    >
                      {num}
                    </div>
                    {currStep === num && (
                      <p className="font-nunito font-thin text-white">{id}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block bg-application-desktop bg-no-repeat bg-[right_center] bg-cover w-[280px] lg:w-[400px] h-full min-h-screen">
        <div className="w-[280px] lg:w-[400px] h-full min-h-screen bg-dark-40 hover:bg-dark-5">
          <div className="h-[60px]"></div>
          <div className="h-[calc(100vh-60px)] flex justify-center items-center">
            <div className="w-9/12 mx-auto flex flex-col justify-center items-start gap-20">
              {steps_btn.map(({ id, num, title }) => {
                return (
                  <button
                    onClick={() => handleStepClick("number", num)}
                    className="flex items-center gap-6"
                    key={id}
                  >
                    <div
                      className={`flex justify-center items-center font-nunito font-bold w-12 h-12 text-2xl border-2 border-white rounded-full ${
                        currStep === num
                          ? "bg-white text-dark"
                          : "text-white hover:bg-white hover:text-dark"
                      }`}
                    >
                      {num}
                    </div>
                    <div className="font-nunito text-white">
                      <p
                        className={`${
                          currStep === num ? "font-bold" : "font-thin"
                        } text-start`}
                      >
                        {id}
                      </p>
                      <h5
                        className={`${
                          currStep === num ? "font-bold" : "font-medium"
                        } text-lg`}
                      >
                        {title}
                      </h5>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdoptionSteps;
