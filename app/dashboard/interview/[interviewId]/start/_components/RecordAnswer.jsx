"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiModalAI";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";

function RecordAnswer({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const latestResult = results.map((result) => result.transcript).join(" ");
      setUserAnswer((prevAns) => prevAns + " " + latestResult);
    }
  }, [results]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      setLoading(true);
      stopSpeechToText();

      const feedbackPrompt = `
You are an AI expert in providing constructive feedback on interview answers. For the following question and user answer, please provide a detailed different rating, feedback, and suggestion every time the user asks.

Question: "${mockInterviewQuestion[activeQuestionIndex]?.question}"

User Answer: "${userAnswer}"

Based on the above question and answer, please provide:
1. A rating from 1 to 10 in the following categories:
   - Communication
   - Confidence
   - Clarity
   - Relevance
2. A brief feedback section (5-8 lines) that includes:
   - Areas of improvement
   - Specific suggestions for enhancement
   - Positive aspects of the answer
3. Detailed suggestions and improvements:
   - Specific steps the user can take to improve their answers in future interviews.
   - Examples or strategies to address weaknesses identified in the feedback.
   - Provide the same answer for the given question so that the user can understand how to give the answer for the question.
4. Data for visualizations:
   - A bar chart showing the rating in each category (Communication, Confidence, Clarity, Relevance).
   - A pie chart showing the distribution of strengths and areas for improvement.

Format your response in JSON as follows:
{
  "rating": {
    "communication": <rating>,
    "confidence": <rating>,
    "clarity": <rating>,
    "relevance": <rating>
  },
  "feedback": "<feedback>",
  "suggestions": "<specific suggestions for improvement>",
  "visualizations": {
    "barChart": {
      "categories": ["Communication", "Confidence", "Clarity", "Relevance"],
      "ratings": [<communication_rating>, <confidence_rating>, <clarity_rating>, <relevance_rating>]
    },
    "pieChart": {
      "sections": ["Strengths", "Areas for Improvement"],
      "values": [<strengths_value>, <areas_for_improvement_value>]
    }
  }
}

Here is the context for providing feedback:
- Communication: How well the user articulated their thoughts.
- Confidence: The level of confidence displayed in the answer.
- Clarity: How clear and understandable the answer was.
- Relevance: How relevant the answer was to the question.

Please ensure the feedback is constructive and aimed at helping the user improve their interview skills.
`;

      try {
        const result = await chatSession.sendMessage(feedbackPrompt);
        const rawResponse = await result.response.text();
        console.log('Raw Response:', rawResponse);

        const cleanJsonResp = rawResponse.replace(/```json/, '').replace(/```/, '').trim();
        console.log('Clean JSON Response:', cleanJsonResp);

        const JsonFeedbackResp = JSON.parse(cleanJsonResp);
        // console.log('Parsed JSON:', JsonFeedbackResp);

        const resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JSON.stringify(JsonFeedbackResp?.rating),
          suggestions: JsonFeedbackResp?.suggestions,
          userEmail: user?.primaryEmailAddress.emailAddress,
          createdAt: moment().format('DD-MM-YYYY')
        });

        // console.log('Database Response:', resp);

        if (resp) {
          toast.success("Your recording has been saved successfully!");
          setUserAnswer('');
          setResults([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        toast.error("Error while saving your record");
        setLoading(false);
      }
    } else {
      startSpeechToText();
      toast("Recording started");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex flex-col my-10 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src={"/webCam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="Webcam Placeholder"
        />
        <Webcam
          mirrored={true}
          className="rounded-lg shadow-lg"
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        className="my-1"
        onClick={SaveUserAnswer}
        aria-label={isRecording ? "Stop Recording" : "Start Recording"}
      >
        {isRecording ? (
          <h2 className="flex items-center text-red-500 gap-2">
            <Mic className="mr-2" />
            Stop Recording...
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      {/* <Button onClick={() => console.log(userAnswer)}>Show Answer</Button> */}
    </div>
  );
}

export default RecordAnswer;
