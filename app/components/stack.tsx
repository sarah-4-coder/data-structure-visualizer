"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowDown } from "lucide-react"

const TopPointer = () => (
  <motion.div
    className="absolute -top-11 right-3 flex flex-col items-center text-blue-500"
    initial={{ y: -10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -10, opacity: 0 }}
  >
    <span className="text-sm font-bold mb-1">Top</span>
    <ArrowDown size={20} />
  </motion.div>
)

export default function Stack() {
  const [stack, setStack] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [operation, setOperation] = useState<string | null>(null)

  const push = () => {
    if (inputValue) {
      setOperation("push")
      setStack((prevStack) => [...prevStack, inputValue])
      setInputValue("")
    }
  }

  const pop = () => {
    if (stack.length > 0) {
      setOperation("pop")
      setStack((prevStack) => prevStack.slice(0, -1))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="stack-value">Value</Label>
          <Input
            type="text"
            id="stack-value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a value"
          />
        </div>
        <span className="flex gap-1.5">
          <Button onClick={push} className="mt-5 ">Push</Button>
          <Button onClick={pop} className="mt-5" variant="outline">
            Pop
          </Button>
        </span>
      </div>
      <div className="border rounded-md p-4 overflow-x-auto">
        <div className="flex items-center h-64 relative justify-center">
          <AnimatePresence>
            {stack.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-blue-500 text-white p-2 m-1 w-12 h-12 flex items-center justify-center text-center relative rounded-md"
              >
                {item}
                {index === stack.length - 1 && <TopPointer />}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="text-sm">
        <p>
          Last operation: <span className="font-bold">{operation || "None"}</span>
        </p>
        <p>
          Time complexity: <span className="font-bold">O(1)</span> for both push and pop operations
        </p>
      </div>
    </div>
  )
}