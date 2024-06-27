'use client';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({ params }) {
  const [feedBackList, setFeedbackList] = useState([]);
  const router = useRouter()

  useEffect(() => {
    GetFeedback();
  }, []);

  // Fetching data from db
  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
  };

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-serif font-bold text-green-400'>Congratulation!</h2>
      <h2 className='font-bold font-serif text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-sm text-gray-500'>
        Find below interview question with correct answer,Your answer with feedback,suggestion and rating for improvement
      </h2>
      {feedBackList && feedBackList.map((item, index) => (
        <Collapsible key={index} className='mt-7'>
          <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>
            {item.question} <ChevronDown className='h-5 w-5' />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='font-semibold font-serif flex flex-col gap-2'>
              <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating Out of 10: </strong>{item.rating}</h2>
              <h2 className='text-red-500 rounded-lg p-2 border text-sm'><strong>Your Answer:</strong>{item.userAns}</h2>
              <h2 className='text-green-400 rounded-lg p-2 border text-lg'><strong>Correct Answer:</strong>{item.correctAns}</h2>
              <h2 className='text-black rounded-lg p-2 border text-lg'><strong>Suggestion:</strong>{item.suggestions}</h2>
              <h2 className='text-primary bg-blue-400 rounded-lg p-2 border text-lg'><strong>FeedBack:</strong>{item.feedback}</h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}

      <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;
