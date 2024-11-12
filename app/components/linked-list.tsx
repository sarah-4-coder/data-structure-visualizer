"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

interface Node {
  value: string
  next: Node | null
}

export function LinkedList() {
  const [head, setHead] = useState<Node | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [operation, setOperation] = useState<string | null>(null)

  const insertAtBeginning = () => {
    if (inputValue) {
      setOperation("insert at beginning")
      const newNode: Node = { value: inputValue, next: head }
      setHead(newNode)
      setInputValue("")
    }
  }

  const insertAtEnd = () => {
    if (inputValue) {
      setOperation("insert at end")
      const newNode: Node = { value: inputValue, next: null }
      if (!head) {
        setHead(newNode)
      } else {
        let current = head
        while (current.next) {
          current = current.next
        }
        current.next = newNode
      }
      setInputValue("")
    }
  }

  const deleteFromBeginning = () => {
    if (head) {
      setOperation("delete from beginning")
      setHead(head.next)
    }
  }

  const renderList = () => {
    const nodes: Node[] = []
    let current = head
    while (current) {
      nodes.push(current)
      current = current.next
    }
    return nodes
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="linked-list-value">Value</Label>
          <Input
            type="text"
            id="linked-list-value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a value"
          />
        </div>
        <span className="flex gap-1.5">
          <Button onClick={insertAtBeginning} className="mt-5 ">Insert at Beginning</Button>
          <Button onClick={insertAtEnd} className="mt-5">Insert at End</Button>
          <Button onClick={deleteFromBeginning} variant="outline" className="mt-5">
            Delete from Beginning
          </Button>
        </span>
      </div>
      <div className="h-64 border rounded-md p-4 flex items-center justify-center overflow-x-auto">
        <AnimatePresence>
          {renderList().map((node, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <div className="bg-purple-500 text-white p-2 m-1 w-16 text-center flex-shrink-0 rounded-md">
                {node.value}
              </div>
              {node.next && (
                <div className="flex items-center text-gray-500">
                  <ArrowRight size={24} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="text-sm">
        <p>
          Last operation: <span className="font-bold">{operation || "None"}</span>
        </p>
        <p>
          Time complexity:
          <ul className="list-disc list-inside">
            <li>
              Insert at beginning: <span className="font-bold">O(1)</span>
            </li>
            <li>
              Insert at end: <span className="font-bold">O(n)</span>
            </li>
            <li>
              Delete from beginning: <span className="font-bold">O(1)</span>
            </li>
          </ul>
        </p>
      </div>
    </div>
  )
}