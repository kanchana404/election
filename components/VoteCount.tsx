"use client"; // Ensures the component is a Client Component

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const VoteCounts = () => {
  const [voteCounts, setVoteCounts] = useState<{ candidateName: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const response = await fetch("/api/vote/count");
        const data = await response.json();
        setVoteCounts(data);
      } catch (error) {
        console.error("Error fetching vote counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoteCounts();
  }, []);

  if (loading) {
    return <div>Loading vote counts...</div>;
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vote Counts</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={voteCounts}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, count }) => `${name}: ${count}`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="count"
            nameKey="candidateName"
          >
            {voteCounts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoteCounts;
