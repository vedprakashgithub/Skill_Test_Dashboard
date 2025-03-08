"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "./header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Sidebar } from "@/components/sidebar";
import { Trophy, FileText, CheckCircle, ArrowRight } from "lucide-react";

// Sample data for the comparison graph
const generateComparisonData = () => [
  { percentile: 0, value: 2 },
  { percentile: 10, value: 5 },
  { percentile: 20, value: 10 },
  { percentile: 30, value: 15 },
  { percentile: 40, value: 25 },
  { percentile: 50, value: 45 },
  { percentile: 60, value: 30 },
  { percentile: 70, value: 20 },
  { percentile: 80, value: 10 },
  { percentile: 90, value: 5 },
  { percentile: 100, value: 2 },
];

// Initial syllabus data
const initialSyllabusData = [
  { topic: "HTML Tools, Forms, History", percentage: 80, color: "bg-blue-500" },
  {
    topic: "Tags & References in HTML",
    percentage: 60,
    color: "bg-orange-500",
  },
  { topic: "Tables & References in HTML", percentage: 24, color: "bg-red-500" },
  { topic: "Tables & CSS Basics", percentage: 96, color: "bg-green-500" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [rank, setRank] = useState("1");
  const [percentile, setPercentile] = useState("30");
  const [score, setScore] = useState("10");
  const [comparisonData,] = useState(
    generateComparisonData()
  );
  const [syllabusData, setSyllabusData] = useState(initialSyllabusData);
  const [userPercentileMarker, PercentileMarker] = useState([
    // Corrected here
    { percentile: 30, value: 0 },
    { percentile: 30, value: 15 },
  ]);

  // Update all data when values change
  useEffect(() => {
    PercentileMarker([
      // Corrected here
      { percentile: Number.parseInt(percentile), value: 0 },
      { percentile: Number.parseInt(percentile), value: 15 },
    ]);

    const scoreRatio = Number.parseInt(score) / 15;
    const newSyllabusData = [
      {
        topic: "HTML Tools, Forms, History",
        percentage: Math.round(scoreRatio * 100 * 1.2),
        color: "bg-blue-500",
      },
      {
        topic: "Tags & References in HTML",
        percentage: Math.round(scoreRatio * 100 * 0.9),
        color: "bg-orange-500",
      },
      {
        topic: "Tables & References in HTML",
        percentage: Math.round(scoreRatio * 100 * 0.36),
        color: "bg-red-500",
      },
      {
        topic: "Tables & CSS Basics",
        percentage: Math.round(scoreRatio * 100 * 1.44),
        color: "bg-green-500",
      },
    ];

    const cappedSyllabusData = newSyllabusData.map((item) => ({
      ...item,
      percentage: Math.min(item.percentage, 100),
    }));

    setSyllabusData(cappedSyllabusData);
  }, [score, percentile]);

  const calculateStrokeDashOffset = () => {
    const circumference = 2 * Math.PI * 45;
    const scoreRatio = Number.parseInt(score) / 15;
    return circumference * (1 - scoreRatio);
  };

  const handleSave = () => {
    setShowUpdateDialog(false);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* update form, Quick Statistics and Comparison Graph on the left */}
              <div className="space-y-6">
                <div>
                  <Card className="p-3">
                    <CardContent>
                      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                        {/* Left Section: Icon & Title */}
                        <div className="flex items-center gap-3">
                          <div className="bg-orange-100 rounded-md">
                            <Image
                              src="/images.png"
                              alt="Icon"
                              width={40} // Set appropriate width
                              height={40} // Set appropriate height
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h2 className="text-sm font-semibold whitespace-nowrap">
                              Hyper Text Markup Language
                            </h2>
                            {/* Full description without truncation */}
                            <p className="text-gray-500 text-[10px]">
                              Questions: 08 | Duration: 15 mins | Submitted on 5
                              June 2021
                            </p>
                          </div>
                        </div>

                        {/* Update Button */}
                        <button
                          className="bg-[#3636a3] text-white px-3 py-2 text-xs rounded-sm font-medium"
                          onClick={() => setShowUpdateDialog(true)}
                        >
                          Update
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {/* Quick Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-center gap-2 p-2 border rounded-md flex-1">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <Trophy className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{rank}</h3>
                          <p className="text-gray-500 text-xs">YOUR RANK</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 border rounded-md flex-1">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <FileText className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{percentile}%</h3>
                          <p className="text-gray-500 text-xs">PERCENTILE</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 border rounded-md flex-1">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{score} / 15</h3>
                          <p className="text-gray-500 text-xs">
                            CORRECT ANSWERS
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comparison Graph */}
                <Card>
                  <CardHeader>
                    <CardTitle>Comparison Graph</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        <span className="font-medium">
                          You scored {percentile}% percentile
                        </span>{" "}
                        which is{" "}
                        {Number.parseInt(percentile) < 72 ? "lower" : "higher"}{" "}
                        than the average percentile 72% of all the engineers who
                        took this assessment
                      </p>

                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={comparisonData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                            />
                            <XAxis
                              dataKey="percentile"
                              label={{
                                value: "Percentile",
                                position: "bottom",
                              }}
                            />
                            <YAxis hide />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#6366f1"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 8, fill: "#4f46e5" }}
                            />
                            <Line
                              data={userPercentileMarker}
                              type="monotone"
                              stroke="#9ca3af"
                              strokeWidth={1}
                              strokeDasharray="5 5"
                              dot={false}
                            />
                            <Line
                              data={[
                                { percentile: 90, value: 0 },
                                { percentile: 90, value: 5 },
                              ]}
                              type="monotone"
                              stroke="#6366f1"
                              strokeWidth={1}
                              dot={{ r: 6, fill: "#6366f1" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Syllabus Wise Analysis and Question Analysis on the right */}
              {/* Syllabus Wise Analysis and Question Analysis on the right */}
              <div className="space-y-6">
                {/* Syllabus Wise Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Syllabus Wise Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {syllabusData.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              {item.topic}
                            </span>
                            <span className="text-sm font-medium">
                              {item.percentage}%
                            </span>
                          </div>
                          <div className="relative w-full h-2 bg-gray-200 rounded">
                            <div
                              className={`absolute top-0 left-0 h-full ${item.color} rounded`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Question Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>Question Analysis</span>
                      <span className="text-blue-600">{score}/15</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        <span className="font-medium">
                          You scored {score} questions correct out of 15.
                        </span>{" "}
                        {Number.parseInt(score) < 12
                          ? "However, it still needs some improvements."
                          : "Great job!"}
                      </p>

                      <div className="flex justify-center py-2">
                        <div className="relative w-40 h-40">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                              src="/target.jpg"
                              alt="Target"
                              width={60} // Set an appropriate size
                              height={60}
                              className="w-15 h-15"
                            />
                          </div>
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="10"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#3b82f9"
                              strokeWidth="10"
                              strokeDasharray="282.7"
                              strokeDashoffset={calculateStrokeDashOffset()}
                              transform="rotate(-250 50 50)"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        {showUpdateDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Update scores</h2>
                <div className="bg-orange-100  rounded-md">
          
                  <Image
                    src="/images.png"
                    alt="Image Description"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>

              <div className="space-y-4 text-xs ">
                {/* Update your Rank */}
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 text-md bg-[#3636a3] text-white border border-[#3636a3] rounded-full">
                    1
                  </span>
                  <label className="flex-grow text-left">
                    <span className="block mb-1">
                      Update your <strong>Rank</strong>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="w-35 border border-blue-600 rounded-md px-2 py-2 text-left" // Adjusted width and padding
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                  />
                </div>

                {/* Update your Percentile */}
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 text-md bg-[#3636a3] text-white border border-[#3636a3] rounded-full">
                    2
                  </span>
                  <label className="flex-grow text-left">
                    <span className="block mb-1">
                      Update your <strong>Percentile</strong>{" "}
                    </span>
                  </label>
                  <input
                    type="text"
                    className="w-35 border border-blue-600 rounded-md px-2 py-2 text-left" // Adjusted width and padding
                    value={percentile}
                    onChange={(e) => setPercentile(e.target.value)}
                  />
                </div>

                {/* Update your Current Score */}
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 text-md bg-[#3636a3] text-white border border-[#3636a3] rounded-full">
                    3
                  </span>
                  <label className="flex-grow  text-left">
                    <span className="block mb-1">
                      Update your <strong>Current Score (out of 15)</strong>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="w-35 border border-blue-600 rounded-md px-2 py-2 text-left" // Adjusted width and padding
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  className="px-5 py-2 border border-black rounded-md"
                  onClick={() => setShowUpdateDialog(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 bg-[#3636a3] text-white rounded-md flex items-center gap-2"
                  onClick={handleSave}
                >
                  Save
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
