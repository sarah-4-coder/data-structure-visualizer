/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import Stack from "./stack"
import { Queue } from "./queue"
import { LinkedList } from "./linked-list"
import { BinaryTree } from "./binary-tree"
import { Graph } from "./graph"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DataStructureVisualizer() {
  const [activeTab, setActiveTab] = useState("stack")

  return (
    <div className="container mx-auto  ">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Data Structure Visualizer</CardTitle>
          
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="stack">Stack</TabsTrigger>
              <TabsTrigger value="queue">Queue</TabsTrigger>
              <TabsTrigger value="linkedList">Linked List</TabsTrigger>
              <TabsTrigger value="binaryTree">Binary Tree</TabsTrigger>
              <TabsTrigger value="graph">Graph</TabsTrigger>
            </TabsList>
            <div className="mt-4 p-4 border rounded-lg bg-background">
              <TabsContent value="stack">
                <Stack />
              </TabsContent>
              <TabsContent value="queue">
                <Queue />
              </TabsContent>
              <TabsContent value="linkedList">
                <LinkedList />
              </TabsContent>
              <TabsContent value="binaryTree">
                <BinaryTree />
              </TabsContent>
              <TabsContent value="graph">
                <Graph />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}