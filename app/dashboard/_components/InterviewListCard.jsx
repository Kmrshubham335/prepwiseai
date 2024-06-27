import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewListCard({interview}) {
  const router = useRouter()
  const onStart = ()=>{
    router.push('/dashboard/interview'+interview?.mockId)
  }
  return (
    <div className='border shadow-sm rounded-lg p-5 mt-5 bg-white'>
    <h2 className='font-bold text-blue-600 text-xl'>{interview?.jobPosition}</h2>
    <h2 className='text-sm text-gray-500'>{interview?.jobExperience} Years of Experience</h2>
    <h2 className='text-sm text-gray-500'>Created at: {interview?.createdAt}</h2>
    <div className='flex justify-between mt-4 gap-3'>
      <Link href={"/dashboard/interview/"+interview?.mockId+"/feedback"} className='w-full'  >
      <Button size="lg" className="w-full bg-blue-600 text-white hover:bg-blue-700">
        Feedback
      </Button>
      </Link>
      <Link href={"/dashboard/interview/" + interview?.mockId} className="w-full">
        <Button size="lg" variant="secondary" className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300">
          Start
        </Button>
      </Link>
    </div>
  </div>
  
  )
}

export default InterviewListCard