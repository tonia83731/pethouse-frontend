import Image from "next/image";
import { collaborateMember } from "@/data/collaborateMember";

const CollaborateSection = () => {
  return (
    <section
      className="w-full max-w-[1280px] mx-auto px-4 xl:px-0"
      id="collaborate"
    >
      <div className="flex flex-col gap-8">
        <h4 className="font-extrabold font-nunito text-2xl xl:text-3xl text-center">
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
