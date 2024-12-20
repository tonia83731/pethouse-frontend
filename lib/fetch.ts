import { getCookie } from "cookies-next";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export const serverFetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: any
) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api${url}`, {
      method,
      headers: {
        "content-type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        success: false,
        message: errorMessage || response.statusText,
      };
    }
    const res = await response.json();
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};

type IContext = {
  req: IncomingMessage & { cookies: NextApiRequestCookies };
  res: ServerResponse;
};
export const authFetch = async (
  ctx: IContext,
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: any
) => {
  const { req, res } = ctx;
  const token = await getCookie("staffToken", { req, res });

  if (!token) {
    return {
      success: false,
      message: "Authentication token is missing or expired.",
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        success: false,
        message: errorMessage || response.statusText,
      };
    }

    const res = await response.json();
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: HeadersInit;
  token?: any;
};

export const clientFetch = async (url: string, options: FetchOptions = {}) => {
  const { method = "GET", body, headers, token } = options;
  // console.log(process.env.API_URL);
  // const token = getCookie("staffToken");

  try {
    const isFormData = body instanceof FormData;

    const response = await fetch(url, {
      method,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    });

    // const data = await response.json();

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        success: false,
        message: errorMessage || response.statusText,
      };
    }

    const res = await response.json();
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
