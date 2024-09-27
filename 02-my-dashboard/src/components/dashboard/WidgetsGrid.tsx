'use client'

import { useAppSelector } from "@/store";
import { SimpleWidget } from "./SimpleWidget";

export const WidgetsGrid = () => {
  
  const count = useAppSelector(state => state.counter.count)
  
  return (
    <div className="flex flex-wrap p-2 items-center justify-center">
      <SimpleWidget title={count.toString()} subtitle="Contador de clicks" label="Contador" href="/dashboard/counter" />
    </div>
  );
};
