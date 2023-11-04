import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MiddleMessageScreen from "@/src/components/MiddleMessageScreen";

export function redirect(path) {
  return function RedirectPage() {
    const router = useRouter();

    const [message, setMessage] = useState(null);

    useEffect(() => {
      router.replace(path);
      setMessage(<MiddleMessageScreen message="Loading ..." />);
    }, [router, setMessage]);

    return message && message;
  };
}
