import {useState} from "react";
import {useLocation} from "@tanstack/react-router";

export const useStep = (key: string, initialStep: number) => {
  const location = useLocation();
  const [step, setStep] = useState(import.meta.env.MODE === "development" ? (location.search as any)[key] ?? initialStep : initialStep);

  const next = () => {
    setStep(step + 1);
  };

  const reset = () => {
    setStep(initialStep);
  };

  return [step, next, reset] as const;
};