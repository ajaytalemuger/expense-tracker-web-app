"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useSetState } from "ahooks";
import Link from 'next/link';

export default function LoginPage() {
  const [state, setState] = useSetState({
    email: "",
    password: "",
  });

  const onLoginClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const onInputChange = (field: any, value: String) => {
    setState((state) =>
    {
      return {
        ...state,
        [field]: value
      };
    })
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-3 bg-white rounded-xl shadow-xl w-[375px] m-auto h-[264px]">
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

          <div className="text-center">
            <Button className="mb-5" onClick={onLoginClick}>Confirm</Button>
          </div>
        </form>
        <div></div>
        <div className="text-md mb-5 text-center text-base">Not yet signed up ? <Link className="text-[#6ca0f5] hover:underline" href="/signup">Sign up</Link></div>
      </div>
    </div>
  );
}
