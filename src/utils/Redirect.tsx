import { useRouter } from "next/router";
import { useEffect } from "react";

interface IRedirect {
  to: string;
}

export function Redirect({ to }: IRedirect) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}
