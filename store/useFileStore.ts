import { create } from "zustand";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type FileState = {
  file: File | null;
  filename: string | null;
  setFile: (selectedFile: File | null) => void;
  clearFile: () => void;
};
export const useFileStore = create<FileState>((set) => ({
  file: null,
  filename: null,
  setFile: (selectedFile) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxFileSize = 5 * 1024 * 1024;

    if (!selectedFile) return;

    const fileType = selectedFile.type;
    const fileSize = selectedFile.size;
    if (!allowedTypes.includes(fileType)) {
      toast.warn("File type not allowed!");
      //   console.log("File type not allowed!");
      return;
    }
    if (fileSize > maxFileSize) {
      toast.warn("File size over 5 MB!");
      //   console.log("File size over 5 MB!");
      return;
    }
    set({
      file: selectedFile,
      filename: selectedFile.name,
    });
    toast.success("File successfully upload!");
  },
  clearFile: () => {
    set({ file: null, filename: null });
    toast.success("File successfully clear!");
  },
}));
