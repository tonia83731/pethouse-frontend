import Image from "next/image";
import { IoIosMail } from "react-icons/io";
import { FaSquarePhone } from "react-icons/fa6";
const ContectSection = () => {
  return (
    <section
      className="md:grid md:grid-cols-2 md:gap-8 md:items-center h-full w-full max-w-[1280px] mx-auto px-4 xl:px-0"
      id=""
    >
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-8">
          <h4 className="font-extrabold font-nunito text-2xl xl:text-3xl">
            Need Help?
          </h4>
          <div className="text-lg md:w-3/4">
            Contact us to receive personalized assistance for adoption,
            resources, and support, ensuring a smooth and successful experience.
          </div>
        </div>
        <div className="text-lg">
          <div className="flex gap-2 items-center">
            <div className="text-xl">
              <IoIosMail />
            </div>
            <a
              href="mailto:pethome.save@org.com"
              className="underline underline-offset-2 hover:text-dark-60"
            >
              pethome.save@org.com
            </a>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-xl">
              <FaSquarePhone />
            </div>
            <a
              href="tel:+88612345678"
              className="underline underline-offset-2 hover:text-dark-60"
            >
              +886 1234 5678
            </a>
          </div>
        </div>
      </div>
      <div className="w-full h-[480px] hidden md:block">
        <Image
          src="/images/contact_dog.png"
          alt="home contact"
          width={2000}
          height={2000}
          className="w-full h-full object-cover object-top"
        ></Image>
      </div>
    </section>
  );
};

export default ContectSection;
