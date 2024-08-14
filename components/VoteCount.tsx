import * as React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const VoteCountsChart = () => {
  const [voteCounts, setVoteCounts] = React.useState<{ candidateName: string; count: number }[]>([]);
  const [loading, setLoading] = React.useState(true);

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

  React.useEffect(() => {
    fetchVoteCounts(); // Initial fetch when the component mounts

    const interval = setInterval(fetchVoteCounts, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (loading) {
    return <div>Loading vote counts...</div>;
  }

  const COLORS = ["#8B0000", "#228B22", "#FFD700", "#FF0000", "#800080"]; // Added color for Wijedasa Rajapaksa

  const totalVotes = voteCounts.reduce((acc, curr) => acc + curr.count, 0);

  const renderCustomLegend = (value: string, entry: any) => {
    const { color } = entry;

    return (
      <span className="flex items-center gap-2">
        <span
          className="inline-block w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-black">{value}</span>
      </span>
    );
  };

  return (
    <Card className="flex flex-col shadow-lg">
      <CardHeader className="items-center text-center pb-4 border-b border-gray-200">
        <CardTitle className="text-3xl font-semibold text-gray-800">Vote Distribution</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          See how the votes are distributed among the candidates
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={voteCounts}
              dataKey="count"
              nameKey="candidateName"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={140}
              fill="#8884d8"
              stroke="none"
              paddingAngle={3}
            >
              {voteCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label
                value={`${totalVotes} Votes`}
                position="center"
                className="fill-gray-800 text-xl font-bold"
              />
            </Pie>
            <Tooltip />
            <Legend
              formatter={renderCustomLegend}
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{
                top: 0,
                right: 0,
                padding: 10,
                fontSize: '14px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-gray-700">
          Total Votes Recorded
        </div>
        <div className="text-center text-gray-500">
          Each slice represents the percentage of votes each candidate received.
        </div>
      </CardFooter>
    </Card>
  );
};

export default VoteCountsChart;
