import { FaUpload } from "react-icons/fa6";
import { useFileStore } from "@/store/useFileStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DefaultFile = () => {
  const { setFile, clearFile, filename } = useFileStore();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  return (
    <div className="w-full mt-4 flex gap-2">
      <label htmlFor="image-file" className="grid grid-cols-3">
        <input
          type="file"
          id="image-file"
          className="hidden"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        <div
          className={`col-span-2 h-[45px] md:h-[60px] leading-[45px] md:leading-[60px] rounded-l-md px-4 bg-skin placeholder:text-sm focus:border focus:border-wine hover:border hover:border-wine ${
            filename ? "text-wine" : "text-milk-tea"
          }`}
        >
          {filename ? filename : "Please select a (.jpg/.jpeg/.png) image"}
        </div>
        <div className="h-[45px] md:h-[60px] leading-[45px] md:leading-[60px] bg-wine text-white rounded-r-md flex gap-2 px-4 items-center justify-center">
          <FaUpload />
          <div className="">Upload File</div>
        </div>
      </label>
      <button
        onClick={clearFile}
        className="bg-dirt text-white rounded-md px-4 h-[45px] md:h-[60px] leading-[45px] md:leading-[60px]"
      >
        Clear
      </button>
      <ToastContainer />
    </div>
  );
};

export default DefaultFile;
