"use client"; // Ensures the component is a Client Component

import { useEffect, useState } from "react";

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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vote Counts</h2>
      <ul>
        {voteCounts.map((vote) => (
          <li key={vote.candidateName} className="text-lg">
            {vote.candidateName}: {vote.count} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoteCounts;
