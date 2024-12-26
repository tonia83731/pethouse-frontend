import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import ModalLayout from "../common/layout/ModalLayout";
import VolunteerApplyForm from "./VolunteerApplyForm";
import { resetApplyForm } from "@/slices/volunteerSlice";

const VolunteerApplyModal = () => {
  const dispatch = useDispatch();
  const { applyToggle } = useSelector((state: RootState) => state.volunteer);
  return (
    <ModalLayout
      title="志工申請"
      isOpen={applyToggle}
      onClose={() => dispatch(resetApplyForm())}
    >
      <VolunteerApplyForm />
    </ModalLayout>
  );
};

export default VolunteerApplyModal;
