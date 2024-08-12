"use client"; // Ensures the component is a Client Component

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const VotingPage = () => {
  const { user } = useUser();

  useEffect(() => {
    console.log("User object:", user);
  }, [user]);

  const handleVote = async (candidateName: string) => {
    if (!user) {
      console.log("User not found");
      return;
    }

    console.log("Voted for:", candidateName);
  };

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
                    className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600"
                    onClick={() => handleVote(candidate.name)}
                  >
                    Vote
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </SignedIn>

        <SignedOut>
          <div className="text-center mt-10">
            <p className="text-xl text-red-600">Please sign in to vote.</p>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default VotingPage;
