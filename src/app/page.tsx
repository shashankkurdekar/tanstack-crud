"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const queryClient = useQueryClient();
  const createUser = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(data),
      });

      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        router.push("/fetch");
      }
    },
  });
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    createUser.mutate({
      name: values.name,
      email: values.email,
    })
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white text-gray-500 w-full max-w-85 mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Sign Up
      </h2>

      <input
        id="name"
        className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
        type="text"
        placeholder="Name"
        required
        onChange={(e) => setValues({ ...values, name: e.target.value })}
      />
      <input
        id="email"
        className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
        type="email"
        placeholder="Email"
        required
        onChange={(e) => setValues({ ...values, email: e.target.value })}
      />

      <button
        type="submit"
        className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
      >
        Create Account
      </button>
    </form>
  );
}
