"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";



const VotingPage = () => {
  const { user } = useUser();
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkVoteStatus = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/vote/status?userId=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setHasVoted(data.hasVoted);
          } else {
            console.error("Failed to fetch vote status");
          }
        } catch (error) {
          console.error("Error checking vote status:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (user) {
      checkVoteStatus();
    } else {
      setLoading(false); // Skip loading if the user is not signed in
    }
  }, [user]);

  const handleVote = async (candidateName: string) => {
    if (!user) {
      Swal.fire("Error", "User not found", "error");
      return;
    }

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, candidateName }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire("Success", data.message, "success");
        setHasVoted(true);
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "An error occurred while voting", "error");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />

      <div>
        <p className="text-3xl font-bold p-3">
          ඔබට කැමති අපේක්ෂකයාට මනාපය පල කරන්න.
        </p>

        <SignedIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {[
              { name: "Anura Kumara", image: "/anura.png" },
              { name: "Ranil Wickremesinghe", image: "/ranil.png" },
              { name: "Sajith Premadasa", image: "/sajith.png" },
              { name: "Namal Rajapaksa", image: "/namal.png" },
            ].map((candidate) => (
              <Card key={candidate.name} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold">
                    {candidate.name}
                  </CardTitle>
                </CardHeader>
                <div className="flex justify-center">
                  <Image
                    src={candidate.image}
                    width={200}
                    height={200}
                    alt="image"
                    className="rounded-lg object-cover w-48 h-48"
                  />
                </div>
                <CardFooter className="mt-3 text-center">
                  <Button
                    className={`w-full text-white py-2 rounded-full ${
                      hasVoted ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={() => handleVote(candidate.name)}
                    disabled={hasVoted}
                  >
                    {hasVoted ? "Voted" : "Vote"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* <div>
            <VoteCountsChart />
          </div> */}
        </SignedIn>

        <SignedOut>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <p className="text-xl text-red-600">Please sign in to vote.</p>
            </div>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default VotingPage;
