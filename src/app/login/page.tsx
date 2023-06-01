"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useSetState } from "ahooks";
import { StatusCodes } from "http-status-codes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

enum LoginErrors {
  "INVALID_CRED" = "Either user does not exist or invalid password",
  "LOGIN_ERROR" = "Error while logging in, try again later",
}

type State = {
  email: string;
  password: string;
  loginErrors: LoginErrors[];
};

type LoginCreds = {
  email: string;
  pwd: string;
};

export default function LoginPage() {
  const [state, setState] = useSetState<State>({
    email: "",
    password: "",
    loginErrors: [],
  });

  const router = useRouter();

  const onLoginClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const loginCreds = {
      email: state.email,
      pwd: state.password,
    };

    await authenticateUser(loginCreds);
  };

  const authenticateUser = async (loginCreds: LoginCreds) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(loginCreds),
      });

      const response = await res.json();

      if (response.success) {
        // if login successful redirect to dashboard page
        router.push("/dashboard");
      } else {
        // else show error message based on response status
        if (res.status === StatusCodes.UNAUTHORIZED) {
          setState({
            loginErrors: [LoginErrors.INVALID_CRED]
          });
        } else {
          setState({
            loginErrors: [LoginErrors.LOGIN_ERROR]
          });
        }

      }
    } catch (error) {
      console.log("error", error);
      setState({
        loginErrors: [LoginErrors.LOGIN_ERROR]
      });
    }
  };

  const onInputChange = (field: any, value: String) => {
    setState((state) => {
      return {
        ...state,
        [field]: value,
        loginErrors: [],
      };
    });
  };

  const disableConfirmBtn = useMemo(() => {
    return !(state.email.trim().length && state.password.trim());
  }, [state]);

  const divHeightValue = useMemo(() => {
    return `${264 + state.loginErrors.length * 5}px`;
  }, [state]);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className={`p-3 bg-white rounded-xl shadow-xl w-[375px] m-auto h-[${divHeightValue}px]`}>
        <p className="text-md mb-5 text-center text-xl">Login</p>
        <form>
          <FormInput
            type="text"
            id="email"
            placeholder="Email"
            value={state.email}
            onChange={(value: String) => onInputChange("email", value)}
          />

          <FormInput
            type="password"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={(value: String) => onInputChange("password", value)}
          />

          {!!state.loginErrors.length && (
            <p className="text-red-500 mt-3">
              {state.loginErrors[0]}
            </p>
          )}

          <div className="text-center">
            <Button
              className="mb-5 mt-5"
              onClick={onLoginClick}
              disabled={disableConfirmBtn}
            >
              Confirm
            </Button>
          </div>
        </form>
        <div></div>
        <div className="text-md mb-5 text-center text-base">
          Not yet signed up ?{" "}
          <Link className="text-[#6ca0f5] hover:underline" href="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
