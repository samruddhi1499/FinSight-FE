"use client";
import { isNotEmpty } from "../../util/validation.js"; 
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

const endpoint = process.env.NEXT_PUBLIC_API_URL;

// Types
interface EnteredValues {
  username: string;
  password: string;
}

interface FormState {
  errors: { [key: string]: string };
  enteredvalues: EnteredValues;
  isSubmitted?: boolean;
  serverError?: string;
  detailsExisits: boolean;
}

async function signinAction(
  prevFormState: FormState | undefined,
  formData: FormData
): Promise<FormState> {
  const username = (formData.get("username") as string) || "";
  const password = (formData.get("password") as string) || "";

  // eslint-disable-next-line prefer-const
  let errors: { [key: string]: string } = {};

  // Validation
  if (!isNotEmpty(username)) {
    errors["Username"] = "Username is required";
  }
  if (!isNotEmpty(password) ) {
    errors["Password"] = "Password must be at least 6 characters long";
  }
  

  if (Object.keys(errors).length > 0) {
    // Return early with validation errors
    return {
      errors,
      enteredvalues: { username, password },
      isSubmitted: false,
      detailsExisits:false
    };
  }

  try {
    // Example API call -- replace with your actual API
    const res = await fetch(`/api/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
      
    });

  const data = await res.json();

    if (!res.ok) {
      return {
        errors: {},
        enteredvalues: { username, password },
        isSubmitted: false,
        serverError: data.message ,
        detailsExisits:false
      };
    }

    console.log(data.isOnboarded)


    return {
      errors: {},
      enteredvalues: { username: "", password: "" },
      isSubmitted: true,
      serverError: "",
      detailsExisits:data.isOnboarded,
    };
  } catch (e) {
    
    return {
        
      errors: {},
      enteredvalues: { username, password },
      isSubmitted: false,
      serverError: "Network error, please try again.",
      detailsExisits:false
    };
  }
}



const Login = () => {

    const [formState, formAction, isPending] = useActionState(signinAction, {
      errors:{"Username" : "", "Password":""} ,
      enteredvalues: { username: "", password: ""}, 
      detailsExisits: false
   
    });

      const router = useRouter();
    
      useEffect(() => {
        if (formState.isSubmitted) {
     
          if(formState.detailsExisits){
         
            router.push("/dashboard");
          }
          else{
               
            router.push("/onboarding");
          }
        }
      }, [formState.isSubmitted, formState.detailsExisits, router]);
    

    return(

<div
  className="min-h-screen bg-white dark:bg-gray-800  flex items-center bg-center bg-no-repeat justify-center"
  style={{ backgroundImage: "url('/bg.jpg')" }}
>
  <div className="w-full max-w-lg p-10 text-center text-xs bg-white/10 rounded-2xl shadow-lg">
    <h1 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
    <p className="mb-6 text-gray-600 dark:text-gray-50">Access your account to explore our amazing features.</p>
    <form className="flex flex-col gap-6" action={formAction}>
                             {formState?.serverError && (
  <div className="text-center text-red-500  font-bold pt-2.5">{` ${formState.serverError}`}</div>
)}
      <input id="plan" type="hidden" value="" name="plan" />

      <div className="relative">
        <label className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3" htmlFor="email">
          <span>Username</span>
        </label>
        <input
          id="username"
          className="block w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 dark:bg-gray-100 rounded-2xl  transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
          name="username"
          type="text"
          placeholder="Your Username"
          defaultValue={formState?.enteredvalues?.username || ''}
        />
                     {formState?.errors["Username"] && (
  <div className="text-right text-red-500 pr-2.5 font-bold pt-2.5">{`! ${formState.errors["Username"]}`}</div>
)}
      </div>

      <div className="relative">
        <label className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3" htmlFor="password">
          <span>Password</span>
        </label>
        <input
          id="password"
          className="block w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 dark:bg-gray-100 rounded-2xl  transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
          name="password"
          type="password"
          placeholder="Your password"
          defaultValue={formState?.enteredvalues?.password || ''}
        />
                     {formState?.errors["Password"] && (
  <div className="text-right text-red-500 pr-2.5 font-bold pt-2.5">{`! ${formState.errors["Password"]}`}</div>
)}
      </div>

      {/* <div className="my-2 flex justify-between gap-2">
        <div className="grow"></div>
        <div className="text-right">
          <a className="text-indigo-600 dark:text-gray-400 mr-4" href="/forgot-password">Forgot Password?</a>
        </div>
      </div> */}

{!isPending && 
      <button className="lqd-btn group inline-flex items-center justify-center gap-1.5 font-medium rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl lqd-btn-primary bg-b text-indigo-700 hover:border-indigo-300 border-4 border-indigo-600 bg-gray-200 focus-visible:bg-indigo-700 focus-visible:shadow-indigo-300/10 px-5 py-3" id="LoginhtmlFormButton" type="submit">
        Sign in
      </button>
}
      {isPending && (
            <button type="button" className="lqd-btn group inline-flex items-center justify-center gap-1.5 font-medium rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl lqd-btn-primary bg-b text-indigo-700 hover:border-indigo-300 border-4 border-indigo-500 bg-gray-50 focus-visible:bg-indigo-700 focus-visible:shadow-indigo-300/10 px-5 py-3" disabled>
              <svg className="mr-3 size-5 text-indigo-700 animate-spin" viewBox="0 0 24 24"> ...</svg>
  Processing…
</button>
          )}
    </form>
    <div className="mt-10 font-medium dark:text-gray-100">
      Dont have an account yet?
      <a className="font-semibold text-white underline" href="/register">&nbsp;Sign up</a>
    </div>
  </div>
</div>
);};

export default Login;



