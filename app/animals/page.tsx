import AnimalCard from "@/components/card/AnimalCard";
import Pagination from "@/components/common/Pagination";
import { dummyAnimal } from "@/data/dummy/dummyAnimal";
import AnimalFilter from "@/components/filter/AnimalFilter";
import AnimalList from "@/components/list/AnimalList";
const AnimalPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mt-8">
        <AnimalFilter />
      </div>
      <AnimalList />
    </div>
  );
};

export default AnimalPage;
