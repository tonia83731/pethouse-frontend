import { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
  extraChildren?: ReactNode;
  router?: ReactNode;
  title: string;
  description: string;
};

const PageLayout = ({
  children,
  extraChildren,
  router,
  title,
  description,
}: PageLayoutProps) => {
  return (
    <div className="mt-[30px] w-10/12 max-w-[1280px] xl:w-full mx-auto flex flex-col gap-8 md:gap-12">
      <div className="">
        <div className="flex flex-col gap-12 md:gap-20">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold font-nunito text-4xl text-center">
              {title}
            </h1>
            <p className="text-xs text-dark-60 w-4/5 md:w-3/5 mx-auto text-center">
              {description}
            </p>
          </div>
          {router}
        </div>
        <div>{children}</div>
      </div>
      {extraChildren}
    </div>
  );
};

export default PageLayout;
