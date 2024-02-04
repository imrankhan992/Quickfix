import { useState } from "react";

import { Button } from "./components/ui/button";
import { Metric, Text, Card, Select, SelectItem } from "@tremor/react";

import { CalculatorIcon } from "@heroicons/react/outline";

import { TextInput } from "@tremor/react";
function App() {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="w-full">
        <div className=" md:w-full lg:max-w-[1750px] mx-auto ">
          <div className="bg-sidebarColor w-[90%] mx-auto">
            <h1 className="text-center">SginUp</h1>
            <form className="grid md:grid-cols-3 p-8 gap-2  grid-cols-1    ">
              <TextInput placeholder="Name" className="border" />
              <TextInput placeholder="Email" />
              <TextInput placeholder="Phone" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
