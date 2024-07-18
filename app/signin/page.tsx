import Image from "next/image";
import SigninForm from "@/components/forms/SigninForm";

const SignInPage = () => {
  return (
    <div className="w-full h-full max-h-screen md:my-auto">
      <div className="w-10/12 h-full mx-auto max-w-[1280px]">
        <div className="h-full flex flex-col gap-12 items-center justify-start mt-12 md:mt-0">
          <h1 className="font-extrabold font-nunito text-4xl text-center">
            登入
          </h1>
          <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
            <Image
              src="/images/admin/admin_hero.png"
              alt="admin signin hero"
              width={570}
              height={570}
              className="hidden md:block"
            ></Image>
            <SigninForm />
          </div>
        </div>
      </div>
      <Image
        src="/images/admin/admin_hero_mobile.png"
        alt="admin signin hero"
        width={590}
        height={590}
        className="fixed bottom-0 left-0 w-full md:hidden"
      ></Image>
    </div>
  );
};

export default SignInPage;
