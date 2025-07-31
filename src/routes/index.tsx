import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import logo from "../assets/images/splash2.png";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate({
        to: "/desktop",
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="h-screen overflow-hidden">
      <img src={logo} alt="logo" className="h-full object-contain w-full" />
    </div>
  );
}
