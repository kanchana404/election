"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

type VoteData = {
  candidate: string;
  votes: number;
};

const VoteCountsBarChart = () => {
  const [chartData, setChartData] = useState<VoteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const response = await fetch("/api/vote/count");
        const data = await response.json();

        setChartData([
          { candidate: "Anura Kumara", votes: data.AnuraKumara || 0 },
          { candidate: "Ranil Wickremesinghe", votes: data.RanilWickremesinghe || 0 },
          { candidate: "Sajith Premadasa", votes: data.SajithPremadasa || 0 },
          { candidate: "Namal Rajapaksa", votes: data.NamalRajapaksa || 0 },
        ]);
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
    <Card>
      <CardHeader>
        <CardTitle>Vote Counts</CardTitle>
        <CardDescription>Current vote distribution among candidates</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="candidate" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="votes" fill="#8884d8" radius={8} />
        </BarChart>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by votes count <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total votes for the current candidates
        </div>
      </CardFooter>
    </Card>
  );
};

export default VoteCountsBarChart;
