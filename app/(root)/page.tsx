import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";


const page = () => {
  return (
    <div>
      <Navbar />

      <div>
        <p className="text-3xl font-bold">
          ඔබට කැමති අපේක්ෂකයාට මනාපය පල කරන්න.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
  <Card className="bg-white shadow-md rounded-lg overflow-hidden">
    <CardHeader className="text-center">
      <CardTitle className="text-xl font-semibold">අනුර කුමාර</CardTitle>
    </CardHeader>
    <div className="flex justify-center">
      <Image
        src="/anura.png"
        width={200}
        height={200}
        alt="image"
        className="rounded-lg object-cover w-48 h-48"
      />
    </div>
    <CardFooter className="mt-3 text-center">
      <Button className="w-full bg-red-800 text-white py-2 rounded-full hover:bg-red-900">
        Vote
      </Button>
    </CardFooter>
  </Card>

  <Card className="bg-white shadow-md rounded-lg overflow-hidden">
    <CardHeader className="text-center">
      <CardTitle className="text-xl font-semibold">රනිල් වික්‍රමසිංහ</CardTitle>
    </CardHeader>
    <div className="flex justify-center">
      <Image
        src="/ranil.png"
        width={200}
        height={200}
        alt="image"
        className="rounded-lg object-cover w-48 h-48"
      />
    </div>
    <CardFooter className="mt-3 text-center">
      <Button className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600">
        Vote
      </Button>
    </CardFooter>
  </Card>

  <Card className="bg-white shadow-md rounded-lg overflow-hidden">
    <CardHeader className="text-center">
      <CardTitle className="text-xl font-semibold">සජිත් ප්‍රේමදාස</CardTitle>
    </CardHeader>
    <div className="flex justify-center">
      <Image
        src="/sajith.png"
        width={200}
        height={200}
        alt="image"
        className="rounded-lg object-cover w-48 h-48"
      />
    </div>
    <CardFooter className="mt-3 text-center">
      <Button className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600">
        Vote
      </Button>
    </CardFooter>
  </Card>

  <Card className="bg-white shadow-md rounded-lg overflow-hidden">
    <CardHeader className="text-center">
      <CardTitle className="text-xl font-semibold">නාමල් රාජපක්ෂ</CardTitle>
    </CardHeader>
    <div className="flex justify-center">
      <Image
        src="/namal.png"
        width={200}
        height={200}
        alt="image"
        className="rounded-lg object-cover w-48 h-48"
      />
    </div>
    <CardFooter className="mt-3 text-center">
      <Button className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600">
        Vote
      </Button>
    </CardFooter>
  </Card>
</div>

      </div>
    </div>
  );
};

export default page;
