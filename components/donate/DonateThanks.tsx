import Image from "next/image";
const DonateThanks = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-extrabold font-nunito text-2xl text-center">
        Your Donation Makes a Difference
      </h1>
      <div className="grid grid-cols-2 grid-rows-[150px_150px_150px_150px_150px] md:grid-cols-4 md:grid-rows-[150px_150px_150px] gap-4">
        <Image
          src="/images/donate_proven6.jpg"
          alt="donate-proven"
          className="col-span-2 row-span-2 w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        ></Image>
        <Image
          src="/images/donate_proven4.jpg"
          alt="donate-proven"
          className="col-span-1 row-span-1 w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        ></Image>
        <Image
          src="/images/donate_proven5.jpg"
          alt="donate-proven"
          className="row-span-2 w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        ></Image>
        <Image
          src="/images/donate_proven7.jpg"
          alt="donate-proven"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        ></Image>
        <Image
          src="/images/donate_proven1.jpg"
          alt="donate-proven"
          className="col-span-2 w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        ></Image>
        <Image
          src="/images/donate_proven2.jpg"
          alt="donate-proven"
          className="col-span-1 w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        ></Image>
        <Image
          src="/images/donate_proven3.jpg"
          alt="donate-proven"
          className="col-span-1 w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        ></Image>
      </div>
    </div>
  );
};

export default DonateThanks;
