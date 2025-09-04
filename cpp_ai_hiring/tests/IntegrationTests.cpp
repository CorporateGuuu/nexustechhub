#include "Analyzer.h"
#include "Candidate.h"
#include "Job.h"
#include "Interview.h"
#include "FileHandler.h"
#include <iostream>
#include <cassert>

void testFullWorkflow() {
    FileHandler fh;
    Analyzer analyzer;

    // Read resume
    std::string resumeContent = fh.readFile("sample_resume.txt");
    assert(!resumeContent.empty());

    // Create candidate and analyze
    Candidate candidate("John Doe", resumeContent);
    analyzer.analyzeResume(candidate);
    assert(candidate.getSkills().size() > 0);
    assert(candidate.getExperienceYears() == 5);

    // Create job
    Job job("Software Engineer", "Develop software", {"C++", "Python"});
    assert(job.getRequiredSkills().size() == 2);

    // Schedule interview
    Interview interview(candidate, job, "2023-12-01 10:00");
    assert(interview.getStatus() == "Scheduled");

    std::cout << "testFullWorkflow passed." << std::endl;
}

void testEdgeCases() {
    Analyzer analyzer;

    // Empty resume
    Candidate emptyCandidate("Empty", "");
    analyzer.analyzeResume(emptyCandidate);
    assert(emptyCandidate.getSkills().empty());
    assert(emptyCandidate.getExperienceYears() == 0);

    // Resume with no skills
    Candidate noSkillsCandidate("No Skills", "I have no technical skills.");
    analyzer.analyzeResume(noSkillsCandidate);
    assert(noSkillsCandidate.getSkills().empty());

    std::cout << "testEdgeCases passed." << std::endl;
}

int main() {
    testFullWorkflow();
    testEdgeCases();
    std::cout << "All Integration tests passed." << std::endl;
    return 0;
}
