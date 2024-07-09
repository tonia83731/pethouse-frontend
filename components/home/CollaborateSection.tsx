import Image from "next/image";
const collaborateMember = [
  {
    id: "台灣之心",
    img: "/images/collaborate4.png",
  },
  {
    id: "台北市動物保護處",
    img: "/images/collaborate3.png",
  },
  {
    id: "瑞芳動物之家",
    img: "/images/collaborate1.png",
  },
  {
    id: "社團法人台灣流浪動物救援協會",
    img: "/images/collaborate5.png",
  },
  {
    id: "台中動物之家",
    img: "/images/collaborate2.png",
  },
];

const CollaborateSection = () => {
  return (
    <section
      className="w-full max-w-[1280px] mx-auto px-4 xl:px-0"
      id="collaborate"
    >
      <div className="flex flex-col gap-8">
        <h4 className="font-bold font-nunito text-2xl xl:text-3xl text-center">
          Collaborators
        </h4>
        <div className="flex gap-8 items-center justify-center">
          {collaborateMember.map(({ id, img }) => {
            return (
              <Image
                src={img}
                alt={id}
                width={90}
                height={90}
                key={id}
                title={id}
              ></Image>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollaborateSection;
