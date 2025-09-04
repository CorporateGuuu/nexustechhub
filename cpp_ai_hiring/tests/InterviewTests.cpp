#include "Interview.h"
#include "Candidate.h"
#include "Job.h"
#include <iostream>
#include <cassert>

void testInterviewCreation() {
    Candidate candidate("John Doe", "Resume text");
    Job job("Software Engineer", "Develop software", {"C++"});
    Interview interview(candidate, job, "2023-12-01 10:00");
    assert(interview.getCandidate().getName() == "John Doe");
    assert(interview.getJob().getTitle() == "Software Engineer");
    assert(interview.getDateTime() == "2023-12-01 10:00");
    assert(interview.getStatus() == "Scheduled");
    std::cout << "testInterviewCreation passed." << std::endl;
}

void testInterviewStatus() {
    Candidate candidate("Jane Smith", "Resume");
    Job job("Manager", "Manage team", {});
    Interview interview(candidate, job, "2023-12-02 14:00");
    interview.setStatus("Completed");
    assert(interview.getStatus() == "Completed");
    std::cout << "testInterviewStatus passed." << std::endl;
}

int main() {
    testInterviewCreation();
    testInterviewStatus();
    std::cout << "All Interview tests passed." << std::endl;
    return 0;
}
