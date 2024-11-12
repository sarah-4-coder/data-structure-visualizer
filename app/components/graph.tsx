"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  source: string;
  target: string;
}

export function Graph() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sourceNode, setSourceNode] = useState("");
  const [targetNode, setTargetNode] = useState("");
  const [operation, setOperation] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const addNode = () => {
    if (inputValue && !nodes.some((node) => node.id === inputValue)) {
      setOperation("add node");
      const newNode: Node = {
        id: inputValue,
        x: Math.random() * 300 + 50,
        y: Math.random() * 200 + 50,
      };
      setNodes([...nodes, newNode]);
      setInputValue("");
    }
  };

  const addEdge = () => {
    if (sourceNode && targetNode && sourceNode !== targetNode) {
      setOperation("add edge");
      const newEdge: Edge = { source: sourceNode, target: targetNode };
      if (
        !edges.some(
          (edge) =>
            edge.source === newEdge.source && edge.target === newEdge.target
        )
      ) {
        setEdges([...edges, newEdge]);
      }
      setSourceNode("");
      setTargetNode("");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        svgRef.current.setAttribute("viewBox", `0 0 ${width} ${height}`);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="graph-node">Add Node</Label>
          <Input
            type="text"
            id="graph-node"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter node value"
          />
        </div>

        <span>
          <Button onClick={addNode} className="mt-5">
            Add Node
          </Button>
        </span>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="graph-edge-source">Add Edge (Source)</Label>
          <Input
            type="text"
            id="graph-edge-source"
            value={sourceNode}
            onChange={(e) => setSourceNode(e.target.value)}
            placeholder="Enter source node"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="graph-edge-target">Add Edge (Target)</Label>
          <Input
            type="text"
            id="graph-edge-target"
            value={targetNode}
            onChange={(e) => setTargetNode(e.target.value)}
            placeholder="Enter target node"
          />
        </div>
        <span>
          <Button onClick={addEdge} className="mt-5">
            Add Edge
          </Button>
        </span>
      </div>
      <div className="h-96 border rounded-md p-4 overflow-hidden">
        <svg ref={svgRef} width="100%" height="100%">
          {edges.map((edge, index) => {
            const source = nodes.find((node) => node.id === edge.source);
            const target = nodes.find((node) => node.id === edge.target);
            if (source && target) {
              return (
                <line
                  key={index}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#4B5563"
                  strokeWidth="2"
                />
              );
            }
            return null;
          })}
          {nodes.map((node) => (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill="#EC4899"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize="12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {node.id}
              </motion.text>
            </g>
          ))}
        </svg>
      </div>
      <div className="text-sm">
        <p>
          Last operation:{" "}
          <span className="font-bold">{operation || "None"}</span>
        </p>
        <p>
          Time complexity:
          <ul className="list-disc list-inside">
            <li>
              Add node: <span className="font-bold">O(1)</span>
            </li>
            <li>
              Add edge: <span className="font-bold">O(1)</span>
            </li>
            <li>
              Find node: <span className="font-bold">O(n)</span>
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
}
