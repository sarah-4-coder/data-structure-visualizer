"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Queue() {
  const [queue, setQueue] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [operation, setOperation] = useState<string | null>(null)

  const enqueue = () => {
    if (inputValue) {
      setOperation("enqueue")
      setQueue((prevQueue) => [...prevQueue, inputValue])
      setInputValue("")
    }
  }

  const dequeue = () => {
    if (queue.length > 0) {
      setOperation("dequeue")
      setQueue((prevQueue) => prevQueue.slice(1))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="value">Value</Label>
          <Input
            type="text"
            id="value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a value"
          />
        </div>
        <Button onClick={enqueue} className="mt-5">Enqueue</Button>
        <Button onClick={dequeue} className="mt-5"variant="outline">
          Dequeue
        </Button>
      </div>
      <div className="h-64 border rounded-md p-4 flex items-center justify-center overflow-x-auto">
        {queue.map((item, index) => (
          <motion.div
            key={`${item}-${index}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-green-500 text-white p-2 m-1 w-16 text-center flex-shrink-0"
          >
            {item}
          </motion.div>
        ))}
      </div>
      <div className="text-sm">
        <p>
          Last operation: <span className="font-bold">{operation || "None"}</span>
        </p>
        <p>
          Time complexity: <span className="font-bold">O(1)</span> for both enqueue and dequeue operations
        </p>
      </div>
    </div>
  )
}