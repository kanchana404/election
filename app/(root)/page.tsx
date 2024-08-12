import Navbar from "@/components/Navbar";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      <Navbar />

      <div>
        <p className="text-3xl font-bold">
          ඔබට කැමති අපේක්ෂකයාට මනාපය පල කරන්න.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4">
  <Card className="w-full md:w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
    <CardHeader className="text-center">
      <CardTitle className="text-xl font-semibold">අනුර කුමාර</CardTitle>
    </CardHeader>
    <Image
      src={"/R.jpeg"}
      width={200}
      height={200}
      alt="image"
      className="mx-auto rounded-lg object-cover"
    />
    <CardFooter className="mt-3 text-center">
      <Button className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600">Vote</Button>
    </CardFooter>
  </Card>

  <Card className="w-full md:w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
    <CardHeader className="text-center">
      <CardTitle className="text-xl font-semibold">රනිල් වික්‍රමසිංහ</CardTitle>
    </CardHeader>
    <Image
      src={"/ranil.jpg"}
      width={400}
      height={400}
      alt="image"
      className="mx-auto rounded-lg object-cover"
    />
    <CardFooter className="mt-3 text-center">
      <Button className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600">Vote</Button>
    </CardFooter>
  </Card>

  <Card className="w-full md:w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
    <CardHeader className="text-center">
      <CardTitle className="text-xl font-semibold">සජිත් ප්‍රේමදාස</CardTitle>
    </CardHeader>
    <Image
      src={"/sajith.jpg"}
      width={200}
      height={200}
      alt="image"
      className="mx-auto rounded-lg object-cover"
    />
    <CardFooter className="mt-3 text-center">
      <Button className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600">Vote</Button>
    </CardFooter>
  </Card>

  <Card className="w-full md:w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
    <CardHeader className="text-center">
      <CardTitle className="text-xl font-semibold">සජිත් ප්‍රේමදාස</CardTitle>
    </CardHeader>
    <Image
      src={"/namal.jpeg"}
      width={200}
      height={200}
      alt="image"
      className="mx-auto rounded-lg object-cover"
    />
    <CardFooter className="mt-3 text-center">
      <Button className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600">Vote</Button>
    </CardFooter>
  </Card>
</div>

      </div>
    </div>
  );
};

export default page;
