import HelpCard from "./HelpCard";
import { helpOptions } from "@/data/helpoptions";

const HelpSection = () => {
  return (
    <section className="bg-taro md:bg-transparent py-4" id="support">
      <div className="flex flex-col gap-8 md:gap-12 w-full px-4 max-w-[1280px] mx-auto xl:px-0">
        <h4 className="font-extrabold font-nunito text-4xl md:text-center">
          幫助浪浪
        </h4>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 items-center">
          {helpOptions.map((props) => {
            return <HelpCard {...props} key={props.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
