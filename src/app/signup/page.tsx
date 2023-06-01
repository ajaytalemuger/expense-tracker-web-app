"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useSetState } from "ahooks";
import Link from "next/link";
import { useMemo } from "react";
import * as EmailValidator from "email-validator";
import { useRouter } from "next/navigation";
import { StatusCodes } from "http-status-codes";

type SignupDetails = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type UserDetails = {
  name: string;
  email: string;
  token: string;
};

type CreationResponse = {
  success: boolean;
  createdUser: UserDetails | undefined;
  status: number | undefined;
};

enum SignupErrors {
  "PASSWORD_MISMATCH" = "Both password and confirm password must be same",
  "INVALID_EMAIL" = "Invalid email",
  "EMAIL_ALREADY_EXISTS" = "Email already exists",
  "SIGNUP_ERROR" = "Error while signing up, try again later",
}

type State = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  signupErrors: SignupErrors[];
};

export default function SignupPage() {
  const [state, setState] = useSetState<State>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    signupErrors: [],
  });

  const router = useRouter();

  const onSignupClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const signupDetails = {
      name: state.name,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
    };

    // validate inputs
    const signupErrors = validateSignupDetails(signupDetails);

    if (signupErrors.length) {
      setState({
        signupErrors,
      });
      return;
    }

    // create user
    const res = await createUser(signupDetails);
    const creationResponse = await res?.json();

    if (creationResponse?.success) {
      // redirect to dashboard
      router.push("/dashboard");
    } else {
      // else show error message based on response status
      if (res?.status === StatusCodes.BAD_REQUEST) {
        setState({
          signupErrors: [SignupErrors.EMAIL_ALREADY_EXISTS],
        });
      } else {
        setState({
          signupErrors: [SignupErrors.SIGNUP_ERROR],
        });
      }
    }
  };

  const validateSignupDetails = (signupDetails: SignupDetails) => {
    let signupErrors = [];

    if (signupDetails.password !== signupDetails.confirmPassword) {
      signupErrors.push(SignupErrors.PASSWORD_MISMATCH);
    }

    if (!EmailValidator.validate(signupDetails.email)) {
      signupErrors.push(SignupErrors.INVALID_EMAIL);
    }

    return signupErrors;
  };

  const createUser = async (signupDetails: SignupDetails) => {
    try {
      const user = {
        name: signupDetails.name,
        email: signupDetails.email,
        pwd: signupDetails.password,
      };
      return fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(user),
      });
    } catch (error) {
      console.log("error while creating user");
    }
  };

  const onInputChange = (field: any, value: String) => {
    setState((state) => {
      return {
        ...state,
        [field]: value,
        signupErrors: [],
      };
    });
  };

  const disableConfirmBtn = useMemo(() => {
    return !(
      state.name.trim().length &&
      state.email.trim().length &&
      state.password.trim().length &&
      state.confirmPassword.trim().length
    );
  }, [state]);

  const divHeightValue = useMemo(() => {
    return `${375 + state.signupErrors.length * 5}px`;
  }, [state]);

  return (
    <div className="flex h-screen justify-center items-center">
      <div
        className={`p-3 bg-white rounded-xl shadow-xl w-[375px] m-auto h-[${divHeightValue}]`}
      >
        <p className="text-md mb-5 text-center text-xl">Sign up</p>
        <form>
          <FormInput
            type="text"
            id="name"
            placeholder="Username"
            value={state.name}
            onChange={(value: String) => onInputChange("name", value)}
          />

          <FormInput
            type="text"
            id="email"
            placeholder="Email"
            error={
              state.signupErrors.includes(SignupErrors.INVALID_EMAIL) ||
              state.signupErrors.includes(SignupErrors.EMAIL_ALREADY_EXISTS)
            }
            value={state.email}
            onChange={(value: String) => onInputChange("email", value)}
          />
          {state.signupErrors.includes(SignupErrors.INVALID_EMAIL) && (
            <p className="text-red-500 mt-3">{SignupErrors.INVALID_EMAIL}</p>
          )}

          {state.signupErrors.includes(SignupErrors.EMAIL_ALREADY_EXISTS) && (
            <p className="text-red-500 mt-3">
              {SignupErrors.EMAIL_ALREADY_EXISTS}
            </p>
          )}

          <FormInput
            type="password"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={(value: String) => onInputChange("password", value)}
          />

          <FormInput
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            error={state.signupErrors.includes(SignupErrors.PASSWORD_MISMATCH)}
            value={state.confirmPassword}
            onChange={(value: String) =>
              onInputChange("confirmPassword", value)
            }
          />
          {state.signupErrors.includes(SignupErrors.PASSWORD_MISMATCH) && (
            <p className="text-red-500 mt-3">
              {SignupErrors.PASSWORD_MISMATCH}
            </p>
          )}

          {state.signupErrors.includes(SignupErrors.SIGNUP_ERROR) && (
            <p className="text-red-500 mt-3">
              {SignupErrors.SIGNUP_ERROR}
            </p>
          )}

          <div className="text-center">
            <Button
              className="mb-5 mt-5"
              onClick={onSignupClick}
              disabled={disableConfirmBtn}
            >
              Confirm
            </Button>
          </div>
        </form>
        <div></div>
        <div className="text-md mb-5 text-center text-base">
          Already signed up ?{" "}
          <Link className="text-[#6ca0f5] hover:underline" href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
