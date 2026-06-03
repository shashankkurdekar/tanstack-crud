"use client";

import { useQuery } from "@tanstack/react-query";

export default function Fetch() {
  const fetchUsers = async () => {
    const res = await fetch("/api");
    return res.json();
  };

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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
