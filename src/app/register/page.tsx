"use client";
import { isNotEmpty, isEqualToOtherValue, hasMinLength } from "../../util/validation.js"; 
import { useActionState, useEffect, useState} from "react";
import { useRouter } from "next/navigation";

interface EnteredValues {
  username: string;
  password: string;
  confirmedPassword: string;
}
interface FormState {
  errors: { [key: string]: string };
  enteredvalues: EnteredValues;
  success: boolean;
  serverError: string | null;
}

async function signupAction(prev: FormState | undefined, formData: FormData): Promise<FormState> {

  
  const username = (formData.get("username") as string) || "";
  const password = (formData.get("password") as string) || "";
  const confirmedPassword = (formData.get("confirmedPassword") as string) || "";

  const errors: Record<string,string> = {};
  if (!isNotEmpty(username)) errors.Username = "Username is required";
  if (!isNotEmpty(password) || !hasMinLength(password, 6)) errors.Password = "Password must be at least 6 characters long";
  if (!isEqualToOtherValue(password, confirmedPassword)) errors.Confirmed = "Passwords do not match";

  if (Object.keys(errors).length) {
    return { errors, enteredvalues: { username, password, confirmedPassword }, success: false, serverError: null };
  }

  try {
    const res = await fetch(`/api/Auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      let msg = await res.text();

      try { const data = await res.json(); msg = data.error || msg; } catch {}
      return { errors: {}, enteredvalues: { username, password, confirmedPassword }, success: false, serverError: msg };
    }

    return { errors: {}, enteredvalues: { username: "", password: "", confirmedPassword: "" }, success: true, serverError: null };
  } catch {
    return { errors: {}, enteredvalues: { username, password, confirmedPassword }, success: false, serverError: "Network error, please try again." };
  }
}

export default function Register() {
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState<FormState, FormData>(signupAction, {
    errors: { Username: "", Password: "", Confirmed: "" },
    enteredvalues: { username: "", password: "", confirmedPassword: "" },
    success: false,
    serverError: null,
  });

  useEffect(() => {
    if (formState.success) {
      // microtask to avoid synchronous form commit race
      Promise.resolve().then(() => router.push("/login"));
    }
  }, [formState.success, router]);



  return (
    <div
      className="min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center"
      style={{ backgroundImage: "url('/bg2.jpg')" }}
    >
      <div className="w-full max-w-lg p-10 text-center text-xs bg-white/10 rounded-2xl shadow-lg">
        <h1 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">New Here?...Come Join Us!</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-50">Create an account to access our amazing features.</p>
        
        <form className="flex flex-col gap-6" action={formAction} method="post">
                                       {formState?.serverError && (
  <div className="text-center text-red-500  font-bold pt-2.5">{` ${formState.serverError}`}</div>
)}
          <div className="relative">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3" htmlFor="username">
              <span>Username</span>
            </label>
            <input
              id="username"
              className="block w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 dark:bg-gray-100 rounded-2xl transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
              name="username"
              type="text"
              placeholder="Your username"
              defaultValue={formState.enteredvalues.username || ''}
            />
            {formState.errors["Username"] && (
              <div className="text-right text-red-500 pr-2.5 font-bold pt-2.5">{`! ${formState.errors["Username"]}`}</div>
            )}
          </div>
          <div className="relative">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3" htmlFor="password">
              <span>Password</span>
            </label>
            <input
              id="password"
              className="block w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-500 dark:bg-gray-100 rounded-2xl transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
              name="password"
              type="password"
              placeholder="Your password"
              defaultValue={formState.enteredvalues.password || ''}
            />
            {formState.errors["Password"] && (
              <div className="text-right text-red-500 pr-2.5 font-bold pt-2.5">{`! ${formState.errors["Password"]}`}</div>
            )}
          </div>
          <div className="relative">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3" htmlFor="confirmedPassword">
              <span>Confirm Password</span>
            </label>
            <input
              id="confirmedPassword"
              className="block w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 dark:bg-gray-100 rounded-2xl transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
              name="confirmedPassword"
              type="password"
              placeholder="Repeat your password"
              defaultValue={formState.enteredvalues.confirmedPassword || ''}
            />
            {formState.errors["Confirmed"] && (
              <div className="text-right text-red-500 pr-2.5 font-bold pt-2.5">{`! ${formState.errors["Confirmed"]}`}</div>
            )}
          </div>
          {isPending && (
          <button className="lqd-btn group inline-flex items-center justify-center gap-1.5 font-medium rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl lqd-btn-primary bg-b text-indigo-700 hover:border-indigo-300 border-4 border-indigo-500 bg-gray-50 focus-visible:bg-indigo-700 focus-visible:shadow-indigo-300/10 px-5 py-3" id="LoginhtmlFormButton" type="submit">
            Sign up
          </button>)}
          {isPending && (
            <button type="button" className="lqd-btn group inline-flex items-center justify-center gap-1.5 font-medium rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl lqd-btn-primary bg-b text-indigo-700 hover:border-indigo-300 border-4 border-indigo-500 bg-gray-50 focus-visible:bg-indigo-700 focus-visible:shadow-indigo-300/10 px-5 py-3" disabled>
              <svg className="mr-3 w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
</svg>

  Processing…
</button>
          )}
        </form>
        <div className="mt-10 text-gray-600 dark:text-gray-400">
          Already a member?
          <a className="font-medium text-indigo-600 underline" href="/login"> Login</a>
        </div>
      </div>
    </div>
  );
}
