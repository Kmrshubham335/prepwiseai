'use client';
import React, { useEffect, useState } from 'react';
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { db } from "@/utils/db";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const Interview = ({ params }) => {
  const [interview, setInterviewData] = useState(null);
  const [webCamEnable, setWebCamEnable] = useState(false);

  useEffect(() => {
    const getInterviewDetails = async () => {
      try {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        if (result.length > 0) {
          setInterviewData(result[0]);
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };

    getInterviewDetails();
  }, [params.interviewId]);

  return (
    <div className="container mx-auto my-10 p-4 md:p-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-4xl font-bold font-serif text-gray-800 mb-10">Let's Get Started</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {interview ? (
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold font-mono mb-6 text-gray-800">Interview Details</h3>
            <div className="space-y-4 text-lg text-gray-700 font-mono ">
              <p><strong>Job Role/Position:</strong> {interview.jobPosition}</p>
              <p><strong>Job Description/Tech Stack:</strong> {interview.jobDesc}</p>
              <p><strong>Years Of Experience:</strong> {interview.jobExperience}</p>
              <p><strong>Education:</strong> {interview.education}</p>
              <p><strong>Additional Notes:</strong> {interview.additionalnotes}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
            <p className="text-center text-lg text-gray-500 ml-3">Loading interview details...</p>
          </div>
        )}

        <div className="flex flex-col items-center">
          {webCamEnable ? (
            <Webcam
              onUserMedia={() => setWebCamEnable(true)}
              onUserMediaError={() => setWebCamEnable(false)}
              mirrored={true}
              className="rounded-lg shadow-lg mb-4"
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <div className="flex flex-col items-center p-10 bg-gray-100 rounded-lg shadow-inner">
              <WebcamIcon className="h-24 w-24 text-gray-500 mb-6" />
              <Button 
                onClick={() => setWebCamEnable(true)} 
                className="px-6 py-3 bg-blue-600 text-white font-sans font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-200"
              >
                Enable Web Cam and Microphone
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 p-6 bg-yellow-300 rounded-lg shadow-lg">
        <h2 className="flex items-center text-2xl text-gray-800 mb-4">
          <Lightbulb className="mr-2 h-8 w-8 text-blue-600" />
          <strong>Information</strong>
        </h2>
        <p className="text-lg text-gray-700  font-serif">{process.env.NEXT_PUBLIC_INFORMATION}</p>
      </div>
      <div className='flex justify-end items-end mt-5' >
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'} >
        
        <Button>Start Interview</Button>
        </Link>
      </div>

    </div>
  );
};

export default Interview;


