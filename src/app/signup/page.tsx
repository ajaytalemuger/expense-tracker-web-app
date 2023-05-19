"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useSetState } from "ahooks";
import Link from 'next/link';

export default function SignupPage() {
  const [state, setState] = useSetState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSignupClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const onInputChange = (field: any, value: String) => {
    setState((state) =>
    {
      return {
        ...state,
        [field]: value
      };
    });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-3 bg-white rounded-xl shadow-xl w-[375px] m-auto h-[375px]">
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

          <FormInput
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChange={(value: String) => onInputChange("confirmPassword", value)}
          />

          <div className="text-center">
            <Button className="mb-5" onClick={onSignupClick}>Confirm</Button>
          </div>
        </form>
        <div></div>
        <div className="text-md mb-5 text-center text-base">Already signed up ? <Link className="text-[#6ca0f5] hover:underline" href="/login">Login</Link></div>
      </div>
    </div>
  );
}
