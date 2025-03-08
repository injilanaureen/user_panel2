import { useState } from "react";
import axios from "axios";
import CheckTransaction from "./getairteltransaction";
import AirtelGenarateURL from "./generateairtelurl";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreditCard, MapPin, Globe, Search } from "lucide-react";



export default function AirtelForm() {

  return (

    <div className="flex flex-col items-center max-w-full p-4   rounded-xl shadow-lg">

      <Tabs defaultValue="pay" className="w-full">
        <TabsList className="flex justify-center gap-10 mb-4">
          <TabsTrigger value="pay" className="tab-trigger p-2 text-xl bg-gray-200 rounded-lg shadow-sm text-gray-800 hover:bg-gray-300 transition duration-300">
            Make Payment
          </TabsTrigger>
          <TabsTrigger value="enquiry" className="tab-trigger text-xl p-2 bg-gray-200 rounded-lg shadow-sm text-gray-800 hover:bg-gray-300 transition duration-300">
            Transaction Enquiry
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pay"><AirtelGenarateURL /></TabsContent>
        <TabsContent value="enquiry"><CheckTransaction /></TabsContent>
      </Tabs>

  </div>
  );
}
