"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TreeNode {
  value: string
  left: TreeNode | null
  right: TreeNode | null
}

export function BinaryTree() {
  const [root, setRoot] = useState<TreeNode | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [operation, setOperation] = useState<string | null>(null)

  const insert = (value: string) => {
    const newNode: TreeNode = { value, left: null, right: null }
    if (!root) {
      setRoot(newNode)
      return
    }

    const queue: TreeNode[] = [root]
    while (queue.length > 0) {
      const node = queue.shift()!
      if (!node.left) {
        node.left = newNode
        break
      } else if (!node.right) {
        node.right = newNode
        break
      } else {
        queue.push(node.left)
        queue.push(node.right)
      }
    }
  }

  const handleInsert = () => {
    if (inputValue) {
      setOperation("insert")
      insert(inputValue)
      setInputValue("")
    }
  }

  const renderTree = (node: TreeNode | null, x: number, y: number, level: number): JSX.Element | null => {
    if (!node) return null

    const nodeSize = 40
    const horizontalSpacing = 80 / (level + 1)
    const verticalSpacing = 60

    return (
      <g key={`${node.value}-${x}-${y}`}>
        <motion.circle
          cx={x}
          cy={y}
          r={nodeSize / 2}
          fill="#8B5CF6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize="12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {node.value}
        </motion.text>
        {node.left && (
          <>
            <line
              x1={x}
              y1={y + nodeSize / 2}
              x2={x - horizontalSpacing}
              y2={y + verticalSpacing - nodeSize / 2}
              stroke="#4B5563"
              strokeWidth="2"
            />
            {renderTree(node.left, x - horizontalSpacing, y + verticalSpacing, level + 1)}
          </>
        )}
        {node.right && (
          <>
            <line
              x1={x}
              y1={y + nodeSize / 2}
              x2={x + horizontalSpacing}
              y2={y + verticalSpacing - nodeSize / 2}
              stroke="#4B5563"
              strokeWidth="2"
            />
            {renderTree(node.right, x + horizontalSpacing, y + verticalSpacing, level + 1)}
          </>
        )}
      </g>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="binary-tree-value">Value</Label>
          <Input
            type="text"
            id="binary-tree-value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a value"
          />
        </div>
        <span>

        <Button onClick={handleInsert} className="mt-5">Insert</Button>
        </span>
      </div>
      <div className="h-96 border rounded-md p-4 overflow-auto">
        <svg width="100%" height="100%" viewBox="0 0 400 300">
          {root && renderTree(root, 200, 40, 0)}
        </svg>
      </div>
      <div className="text-sm">
        <p>
          Last operation: <span className="font-bold">{operation || "None"}</span>
        </p>
        <p>
          Time complexity: <span className="font-bold">O(log n)</span> for balanced trees, <span className="font-bold">O(n)</span> for unbalanced trees
        </p>
      </div>
    </div>
  )
}