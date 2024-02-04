import { useState } from 'react'

import { Button } from './components/ui/button'
import { Metric, Text,Card,Select, SelectItem} from '@tremor/react'

import { CalculatorIcon } from "@heroicons/react/outline";




function App() {

  const [value, setValue] = useState("");
  return (
    <>
     <h1 className="text-3xl font-bold underline bg-red-500">
      Hello world!
    </h1>
    <Button>Click me</Button>
    <Card className="max-w-xs mx-auto">
    <Text>Sales</Text>
    <Metric>$ 34,743</Metric>
  </Card>

  <div className="max-w-sm mx-auto space-y-6">
        
        <Select className='cursor-pointer'>
          <SelectItem value="1" icon={CalculatorIcon}>
          Kilometers
          </SelectItem>
          <SelectItem value="2" icon={CalculatorIcon}>
          Meters
          </SelectItem>
          <SelectItem value="3" icon={CalculatorIcon}>
          Miles
          </SelectItem>
          <SelectItem value="4" icon={CalculatorIcon}>
          Nautical Miles
          </SelectItem>
        </Select>
      </div>
    </>
  )
}

export default App
