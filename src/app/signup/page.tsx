"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useSetState } from "ahooks";
import Link from "next/link";
import { useMemo } from "react";
import * as EmailValidator from "email-validator";
import { useRouter } from "next/navigation";

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
};

enum ValidationErrors {
  "PASSWORD_MISMATCH" = "Both password and confirm password must be same",
  "INVALID_EMAIL" = "Invalid email",
}

type State = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  validationErrors: ValidationErrors[];
};

export default function SignupPage() {
  const [state, setState] = useSetState<State>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    validationErrors: [],
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
    const validationErrors = validateSignupDetails(signupDetails);

    if (validationErrors.length) {
      setState({
        validationErrors,
      });
      return;
    }

    // create user
    const creationResponse = await createUser(signupDetails);

    if (creationResponse.success) {
      // redirect to dashboard
      router.push("/dashboard");
    } else {
      // else show error message
    }
  };

  const validateSignupDetails = (signupDetails: SignupDetails) => {
    let validationErrors = [];

    if (signupDetails.password !== signupDetails.confirmPassword) {
      validationErrors.push(ValidationErrors.PASSWORD_MISMATCH);
    }

    if (!EmailValidator.validate(signupDetails.email)) {
      validationErrors.push(ValidationErrors.INVALID_EMAIL);
    }

    return validationErrors;
  };

  const createUser = async (signupDetails: SignupDetails) => {
    let response: CreationResponse = {
      success: false,
      createdUser: undefined,
    };

    try {
      const user = {
        name: signupDetails.name,
        email: signupDetails.email,
        pwd: signupDetails.password,
      };
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(user),
      });
      response = await res.json();
    } catch (error) {
      console.log("error while creating user");
    }
    return response;
  };

  const onInputChange = (field: any, value: String) => {
    setState((state) => {
      return {
        ...state,
        [field]: value,
        validationErrors: [],
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
    return `${375 + state.validationErrors.length * 5}px`;
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
            error={state.validationErrors.includes(
              ValidationErrors.INVALID_EMAIL
            )}
            value={state.email}
            onChange={(value: String) => onInputChange("email", value)}
          />
          {state.validationErrors.includes(ValidationErrors.INVALID_EMAIL) && (
            <p className="text-red-500 mt-3">
              {ValidationErrors.INVALID_EMAIL}
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
            error={state.validationErrors.includes(
              ValidationErrors.PASSWORD_MISMATCH
            )}
            value={state.confirmPassword}
            onChange={(value: String) =>
              onInputChange("confirmPassword", value)
            }
          />
          {state.validationErrors.includes(
            ValidationErrors.PASSWORD_MISMATCH
          ) && (
            <p className="text-red-500 mt-3">
              {ValidationErrors.PASSWORD_MISMATCH}
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
