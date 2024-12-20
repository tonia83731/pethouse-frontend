import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { clientFetch } from "@/lib/fetch";
import PethouseLogo from "@/public/icons/Logo.svg";
import BackstageImg from "@/public/images/backstageImg.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { GetServerSideProps } from "next";

const DashboardPage = () => {
  const router = useRouter();
  const [passwordShowed, setPasswordShowed] = useState(false);
  const [inputValue, setInputValue] = useState({
    account: "",
    password: "",
  });
  const [isError, setIsError] = useState({
    status: false,
    message: "",
  });

  const initializedData = () => {
    setIsError({
      status: false,
      message: "",
    });
    setInputValue({
      account: "",
      password: "",
    });
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsError({
      status: false,
      message: "",
    });

    if (!inputValue.account || !inputValue.password) {
      setIsError({
        status: true,
        message: "帳號、密碼不可為空!",
      });
      return;
    }

    console.log(inputValue);

    try {
      const response = await clientFetch("/auth/login", {
        method: "POST",
        body: inputValue,
      });
      // console.log(response.success);
      if (response.success) {
        // console.log(response.data.token);
        const expirationDate = new Date();
        expirationDate.setTime(
          expirationDate.getTime() + 3 * 24 * 60 * 60 * 1000
        );
        const token = response.data.token;
        setCookie("staffToken", token, {
          expires: expirationDate,
        });
        initializedData();
        router.push({
          pathname: "/dashboard/adoption",
          // query: { signin_success: "true" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="mx-auto w-11/12 lg:w-full lg:max-w-[900px] flex flex-col gap-[40px] pt-[120px] pb-6">
      <div className="text-dark w-full flex justify-center">
        <PethouseLogo className="w-[150px]" />
      </div>
      <div className="grid grid-cols-[400px_1fr] items-center gap-6">
        <Image
          src={BackstageImg}
          alt="Backstage Image"
          width={400}
          height={400}
        ></Image>
        <form className="flex flex-col gap-8" onSubmit={handleLoginSubmit}>
          <h5 className="font-bold text-2xl text-center">後台登入</h5>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="email"
              className="w-full h-12 px-4 leading-12 rounded-lg border-0 bg-skin-60 text-wine"
            >
              <input
                id="account"
                name="account"
                type="text"
                placeholder="Account"
                className="placeholder:text-dark-40 w-full h-12 bg-transparent"
                value={inputValue.account}
                onChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </label>
            <label
              htmlFor="password"
              className="relative w-full h-12 px-4 leading-12 rounded-lg border-0 bg-skin-60 text-wine"
            >
              <input
                id="password"
                name="password"
                type={passwordShowed ? "text" : "password"}
                placeholder="Password"
                className="placeholder:text-dark-40 w-full h-12 bg-transparent"
                value={inputValue.password}
                onChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                onClick={() => setPasswordShowed(!passwordShowed)}
              >
                {passwordShowed ? <FaEyeSlash /> : <FaEye />}
              </button>
            </label>
          </div>
          {isError.status && <p className="text-heart">{isError.message}</p>}
          <button className="w-full bg-wine text-white rounded-lg h-10 hover:drop-shadow-md hover:font-bold">
            登入
          </button>
        </form>
      </div>
    </main>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getCookie("staffToken", {
    req: context.req,
    res: context.res,
  });

  console.log(token);

  if (token) {
    return {
      redirect: {
        destination: "/dashboard/adoption",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
