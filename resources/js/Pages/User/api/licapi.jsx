import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LicBillPay from './licbillpay';
import FetchLICBill from './licfetchbill';
import LICEnquiry from './licstatusenquiry';

export default function Licapi() {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gradient-to-br from-secondary_color to-gray-light text-white-dark rounded-2xl shadow-lg">
      <Tabs defaultValue="pay" className="w-full">
        <TabsList className="flex justify-between bg-white p-8 rounded-lg">
          <TabsTrigger value="pay" className="px-6 py-2 text-xl  text-white-dark  font-bold">Pay Bill</TabsTrigger>
          <TabsTrigger value="fetch" className="px-6 py-2 text-xl text-white-dark  font-bold">Fetch Bill</TabsTrigger>
          <TabsTrigger value="enquiry" className="px-6 py-2 text-xl text-white-dark  font-bold">Status Enquiry</TabsTrigger>
        </TabsList>
        <div className="p-4 bg-tertiary-color rounded-lg mt-2">
          <TabsContent value="pay">
            <LicBillPay />
          </TabsContent>
          <TabsContent value="fetch">
            <FetchLICBill />
          </TabsContent>
          <TabsContent value="enquiry">
            <LICEnquiry/>
          </TabsContent>
        </div>
      </Tabs>
      </div>
    );
  }
