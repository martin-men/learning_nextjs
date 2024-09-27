"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  addOne,
  initCounterState,
  subtractOne,
} from "@/store/counter/CounterSlice";
import { useEffect } from "react";
// import { useEffect } from "react";

interface props {
  value?: number;
}

export type CounterResponse = {
  method: string;
  count: number;
};

const getApiCounter = async (): Promise<CounterResponse> => {
  const data = await fetch("/api/counter")
    .then((response) => response.json())
    .then((data) => data);
  return data;
};

export const CartCounter = ({ value = 0 }: props) => {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getApiCounter().then((data) => dispatch(initCounterState(data.count)));
  }, [dispatch]);

  const increaseCount = () => {
    dispatch(addOne());
  };

  const decreaseCount = () => {
    dispatch(subtractOne());
  };

  return (
    <>
      <span className="text-9xl">{count}</span>

      <div className="flex">
        <button
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
          onClick={increaseCount}
        >
          +1
        </button>
        <button
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
          onClick={decreaseCount}
        >
          -1
        </button>
      </div>
    </>
  );
};
