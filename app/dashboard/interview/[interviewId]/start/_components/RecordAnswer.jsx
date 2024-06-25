"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiModalAI";

function RecordAnswer({ mockInterviewQuestion, activeQuestionIndex }) {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
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
      stopSpeechToText();

      // Validation to ensure user answer length is sufficient
      if (userAnswer.trim().length < 10) {
        toast.error("Error while saving your record, please speak clearly");
        return;
      }

      const feedbackPrompt = `
You are an AI expert in providing constructive feedback on interview answers. For the following question and user answer, please provide a detailed rating and feedback.

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
   - Provide the same answer for the given question so that user can understand how to give the answer for the question.
4. Data for visualizations:
   - A bar chart showing the rating in each category (Communication, Confidence, Clarity, Relevance).
   - A pie chart showing the distribution of strengths and areas for improvement.
   - A line chart showing the trend if multiple questions and answers were provided (if applicable).

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
    },
    "lineChart": {
      "questions": ["Question 1", "Question 2", "Question 3", ...],
      "ratings": {
        "communication": [<rating1>, <rating2>, <rating3>, ...],
        "confidence": [<rating1>, <rating2>, <rating3>, ...],
        "clarity": [<rating1>, <rating2>, <rating3>, ...],
        "relevance": [<rating1>, <rating2>, <rating3>, ...]
      }
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
        const mockJsonResp = result.response
          .text()
          .replace("```json", "")
          .replace("```", "");
          console.log(mockJsonResp);
          toast.success("Your recording has been saved successfully!");
          const JsonFeedbackResp= JSON.parse(mockJsonResp)
      } catch (error) {
        console.error(error);
        toast.error("Error while saving your record");
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

      <Button onClick={() => console.log(userAnswer)}>Show Answer</Button>
    </div>
  );
}

export default RecordAnswer;
