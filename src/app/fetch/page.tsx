"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Fetch() {
  const fetchUsers = async () => {
    const res = await fetch("/api");
    return res.json();
  };
  const queryClient = useQueryClient();

  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch("/api", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
  const updateUser = useMutation({
    mutationFn: async ({
      id,
      name,
      email,
    }: {
      id: string;
      name: string;
      email: string;
    }) => {
      const res = await fetch("/api", {
        method: "PATCH",
        body: JSON.stringify({ id, name, email }),
      });

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const {
    data: users,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<{ _id: string; name: string; email: string }[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  console.log(users);
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isFetching) {
    return <div>Updating...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Refetch</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button
                onClick={() => refetch()}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Refetch
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  updateUser.mutate({
                    id: user._id,
                    name: user.email + " Updated",
                    email: user.name + " Updated",
                  });
                }}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  deleteUser.mutate(user._id);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
