import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support this function.');
    }
  };

  return (
    mockInterviewQuestion && (
      <div className='p-5 rounded-xl border my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm text-center font-mono cursor-pointer ${activeQuestionIndex === index ? 'bg-red-500 text-white' : 'bg-secondary'}`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className='my-6 text-md md:text-lg font-serif'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
        <Volume2
          className=' my-4 cursor-pointer'
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />
        <div className='border rounded-lg p-5 bg-blue-100'>
          <h2 className='flex text gap-2 items-center text-blue-700'>
            <Lightbulb />
            <strong className='font-mono'>Note:</strong>
          </h2>
          <h2 className='font-mono text-sm text-primary my-2'>
            {process.env.NEXT_PUBLIC_QUESTION_INFO}
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionSection;
