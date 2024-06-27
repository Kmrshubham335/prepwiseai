import React from "react";
import AddNewMockInterview from "./_components/AddNewMockInterview";
import InterviewList from "./_components/InterviewList";

function Page() {
  return (
    <div className="p-10">
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="font-bold text-3xl mb-2">Dashboard</h2>
        <h2 className="text-gray-600 mb-6">Create and Start your Interview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AddNewMockInterview />
          {/* we can add more components or cards here */}
        </div>
      </div>
      {/* Previous interview list */}
      <InterviewList />
    </div>
  );
}

export default Page;
