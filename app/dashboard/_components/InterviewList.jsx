"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import InterviewListCard from "./InterviewListCard";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress)
      )
      .orderBy(desc(MockInterview.id));
    console.log(result);
    setInterviewList(result);
  };
  return (
    <div>
      <h2 className="font-bold font-serif text-blue-600 text-xl mt-5  ">Previous MockInterview List</h2>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-col-3 my-5 " >
        {interviewList && interviewList.map((interview,index)=>(
            <InterviewListCard key={index} 
            interview={interview}
            />
        ))}
      </div>
    </div>
  );
}

export default InterviewList;
