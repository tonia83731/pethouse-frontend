import PageLayout from "@/components/PageLayout";
import Link from "next/link";
const AdoptionBtn = () => {
  return (
    <div className="flex justify-center items-center">
      <Link
        href="/adopt"
        className="bg-heart text-white text-large px-4 py-2 rounded-full"
      >
        Adopting
      </Link>
    </div>
  );
};
const AnimalLayout = () => {
  return (
    <PageLayout
      title="Rescue and Relocation"
      description="Focuses on the intricate process of rescuing and rehoming animals in need of adoption. It highlights the challenges and successes of these efforts, emphasizing the importance of finding safe and loving homes for rescued animals while addressing the logistical and emotional aspects of the adoption process."
      router={<AdoptionBtn />}
    >
      <div className=""></div>
    </PageLayout>
  );
};

export default AnimalLayout;
