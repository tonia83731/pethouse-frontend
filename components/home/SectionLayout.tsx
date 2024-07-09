import { ReactNode } from "react";

type SectionLayoutProps = {
  id: string;
  customClass?: string;
  children?: ReactNode;
};

const SectionLayout = (props: SectionLayoutProps) => {
  const { id, customClass, children } = props;
  return (
    <section className={`w-full h-[648px] md:h-[560px] ${customClass}`} id={id}>
      {children}
    </section>
  );
};

export default SectionLayout;
