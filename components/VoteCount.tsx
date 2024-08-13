"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// This component fetches vote counts and displays them in a pie chart
const VoteCountsChart = () => {
  const [voteCounts, setVoteCounts] = React.useState<{ candidateName: string; count: number }[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const response = await fetch("/api/vote/count")
        const data = await response.json()
        setVoteCounts(data)
      } catch (error) {
        console.error("Error fetching vote counts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVoteCounts()
  }, [])

  if (loading) {
    return <div>Loading vote counts...</div>
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const totalVotes = voteCounts.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Vote Counts</CardTitle>
        <CardDescription>Current Vote Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            votes: {
              label: "Votes",
            },
          }}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={voteCounts}
                dataKey="count"
                nameKey="candidateName"
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ candidateName, count }) => `${candidateName}: ${count}`}
                outerRadius={150}
                fill="#8884d8"
              >
                {voteCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVotes.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Votes
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total Votes Recorded <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing vote distribution for the candidates.
        </div>
      </CardFooter>
    </Card>
  )
}

export default VoteCountsChart
