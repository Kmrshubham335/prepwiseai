'use client'
import { useEffect,useState } from 'react'
import { db } from '@/utils/db';
import { eq} from 'drizzle-orm';
import { MockInterview } from '@/utils/schema';
import QuestionSection from './_components/QuestionSection'
import RecordAnswer from './_components/RecordAnswer';

function StartInterview({params}) {
  const [interviewData,setInterviewData] = useState()
  const [mockInterviewQuestion,setMockInterviewQuestion] = useState()
  const [activeQuestionIndex,setActiveQuestionIndex] = useState(0)
  useEffect(() => {
    const getInterviewDetails = async () => {
      try {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));

        const jsonMockResp=JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockResp)
        setMockInterviewQuestion(jsonMockResp)
        setInterviewData(result[0])
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };

    getInterviewDetails();
  }, [params.interviewId]);
  
  return (
    <div>
      <div className='grid grid-col-1 md:grid-cols-2 gap-10' >
        
        <QuestionSection
         mockInterviewQuestion={mockInterviewQuestion} 
        activeQuestionIndex={activeQuestionIndex}/>
        <RecordAnswer
         mockInterviewQuestion={mockInterviewQuestion} 
         activeQuestionIndex={activeQuestionIndex}
        />  
      </div>
    </div>
  )
}

export default StartInterview