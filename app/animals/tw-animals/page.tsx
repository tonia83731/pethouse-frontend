import AnimalCard from "@/components/card/AnimalCard";
import Pagination from "@/components/common/Pagination";
import { dummyAnimal } from "@/data/dummy/dummyAnimal";
import AnimalFilter from "@/components/filter/AnimalFilter";
import AnimalList from "@/components/list/AnimalList";
const AnimalTWPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mt-8">
        <AnimalFilter />
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dummyAnimal.map((props) => {
          return <AnimalCard {...props} key={props.animal_id} />;
        })}
      </div> */}
      <AnimalList />
      {/* <div className="w-full flex justify-center md:justify-end">
        <Pagination totalPage={10} />
      </div> */}
    </div>
  );
};

export default AnimalTWPage;
