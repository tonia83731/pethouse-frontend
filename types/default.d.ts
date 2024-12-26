export type SelectOptionType = {
  label: string;
  value: any;
};

export type InputErrorType = {
  status: boolean;
  message: string;
};

export type ButtonType = "create" | "edit";
export type ModalToggleType = boolean;

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
};
