"use client";
import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import Button from "./Button";

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
        {Object.values(authProvider).map((providers: any, i: any) => (
          //@ts-ignore
          <Button
            title={providers.id}
            type="button"
            key={i}

            handleClick={() => signIn(providers?.id)}
          // className="px-5 py-3 text-white text-lg font-bold outline-none border-none rounded-md cursor-pointer"
          />
        ))}
      </div>
    );
  }
};

export default Authprovider;
