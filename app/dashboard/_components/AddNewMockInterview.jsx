'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "react-datepicker/dist/react-datepicker.css";
import { chatSession } from "@/utils/GeminiModalAI";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";


function AddNewMockInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [education, setEducation] = useState("");
  const[jsonResponse,setJsonResponse] = useState([])
  const {user} =useUser()
  const router =useRouter()

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobDesc, jobExperience, jobPosition, additionalNotes, education);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Education: ${education}, Additional Notes:${additionalNotes} ,Depends on Job Position, Job Description, Education ,Additional Notes & Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and answer field on JSON.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      
      const mockJsonResp = result.response.text().replace('```json', '').replace('```', '');
      // console.log(JSON.parse(mockJsonResp));
      setJsonResponse(mockJsonResp)

      // Saving the resp in db
      if(mockJsonResp)
        {
      const resp = await db.insert(MockInterview).values({
        mockId:uuidv4(),
        jsonMockResp:mockJsonResp,
        jobPosition:jobPosition,
        jobDesc:jobDesc,
        jobExperience:jobExperience,
        education:education,
        additionalnotes:additionalNotes,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-YYYY')
      }).returning({mockId:MockInterview.mockId})
      console.log('Insert Id:',resp)
      if(resp)
        {
          setOpenDialog(false)
          router.push('/dashboard/interview/'+resp[0].mockId)

        }
    }
    else 
    {
      console.log("Error in inserting in the DB")
    }
    } catch (error) {
      console.error("Error generating mock interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div 
        className="p-10 border rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out transform"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about yourself</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <h2 className="mb-4">Add details about your job position/role and years of experience</h2>
                  <div className="my-3">
                    <label className="font-medium">Job Role/Position</label>
                    <Input 
                      placeholder="Ex. Frontend Developer" 
                      required 
                      className="mt-1 w-full"
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label className="font-medium">Job Description/Tech Stack</label>
                    <Textarea 
                      required 
                      placeholder="Ex. ReactJs, NextJs"  
                      className="mt-1 w-full"
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label className="font-medium">Years Of Experience</label>
                    <Input 
                      required 
                      placeholder="Ex. 5" 
                      type="number"  
                      max="25" 
                      className="mt-1 w-full"
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label className="font-medium">Education</label>
                    <Input 
                      placeholder="Ex. Bachelor's in Computer Science" 
                      className="mt-1 w-full"
                      onChange={(event) => setEducation(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label className="font-medium">Additional Notes</label>
                    <Textarea 
                      placeholder="Any special requests or notes for the interview"  
                      className="mt-1 w-full"
                      onChange={(event) => setAdditionalNotes(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-4">
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button disabled={loading} type="submit">
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating from AI
                      </>
                    ) : (
                      'Start Interview'
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewMockInterview;
