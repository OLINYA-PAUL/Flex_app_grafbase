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
  const [providers, setProvider] = useState<providers | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getProviders();
      //@ts-ignore
      setProvider(response);
      console.log({ response: response });
    })();
  }, []);

  return (
    <div>
      {providers && (
        <div>
          {Object.values(providers).map((provider, i) => (
            <button
              type="button"
              key={i}
              //@ts-ignore
              onClick={() => signIn(provider?.id)}
            >
              {provider.id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Authprovider;
