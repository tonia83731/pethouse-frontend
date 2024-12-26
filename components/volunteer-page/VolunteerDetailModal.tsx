import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { resetDetailModal } from "@/slices/volunteerSlice";
import ModalLayout from "../common/layout/ModalLayout";
import VolunteerDetail from "./VolunteerDetail";

const VolunteerDetailModal = () => {
  const dispatch = useDispatch();
  const { detailToggle } = useSelector((state: RootState) => state.volunteer);
  return (
    <ModalLayout
      title="詳細資料"
      isOpen={detailToggle}
      onClose={() => dispatch(resetDetailModal())}
    >
      <VolunteerDetail />
    </ModalLayout>
  );
};

export default VolunteerDetailModal;
