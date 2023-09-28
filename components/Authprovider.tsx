"use client";
import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

type Provider = {
  id: string;
  name: string;
  email: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParam?: Record<string, string> | undefined;
};

type providers = Record<string, Provider>;

const Authprovider = () => {

  const [authProvider, setAuthProvider] = useState<providers | null>(null);

  useEffect(() => {
    const getproviderhandler = async function () {
      const response = await getProviders();
      //@ts-ignore
      setAuthProvider(response);
    };
    getproviderhandler();
  }, []);

  if (authProvider) {
    return (
        <div>
        {Object.values(authProvider).map((providers:any, i:any) => (
            //@ts-ignore
            <button
            type="button"
            key={i}
            onClick={() => signIn(providers?.id)}
            className="bg-purple-500 px-5 py-3 text-white text-lg font-bold outline-none border-none rounded-md cursor-pointer"
            >
            {providers.id}
              { console.log({response: providers })}
          </button>
        ))}
      </div>
    );
  }
};

export default Authprovider;
