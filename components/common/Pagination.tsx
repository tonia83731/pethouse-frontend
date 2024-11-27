import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
interface PaginationProps {
  currPage: number;
  totalPage: number;
  pages: number[];
  onArrowClick: (type: "prev" | "next") => void;
  onNumClick: (num: number) => void;
}
const Pagination = ({
  currPage,
  totalPage,
  pages,
  onArrowClick,
  onNumClick,
}: PaginationProps) => {
  return (
    <div className="flex items-center gap-2 font-medium">
      <button
        className="border border-dark-60 text-dark-60 rounded-md w-7 h-7 flex justify-center items-center disabled:bg-dark-40 disabled:border-0 disabled:text-white hover:border-wine hover:text-wine"
        onClick={() => onArrowClick("prev")}
        disabled={currPage === 1}
      >
        <IoIosArrowBack />
      </button>

      {pages.map((page) => {
        return (
          <button
            key="page"
            className={`border rounded-md w-7 h-7 flex justify-center items-center disabled:bg-dark-40 disabled:text-white hover:border-wine hover:text-wine ${
              currPage === page
                ? "border-wine text-wine font-bold"
                : "border-dark-60 text-dark-60"
            }`}
            onClick={() => onNumClick(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className="border border-dark-60 text-dark-60 rounded-md w-7 h-7 flex justify-center items-center disabled:bg-dark-40 disabled:border-0 disabled:text-white hover:border-wine hover:text-wine"
        onClick={() => onArrowClick("next")}
        disabled={currPage === totalPage}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
