import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    education:varchar('education').notNull(),
    additionalnotes:varchar('additionalnotes').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull()
})

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(), 
    mockIdRef:varchar('mockIdRef').notNull(),
    question: varchar('question').notNull(),  
    correctAns: text('correctAnswer'),
    userAns:text('userAnswer'),  
    rating: varchar('rating'), 
    feedback: text('feedback'),
    suggestions: text('suggestions'), 
    visualizations: text('visualizations'), 
    createdAt: varchar('createdAt'),
    userEmail: varchar('useremail'),
  });
  

