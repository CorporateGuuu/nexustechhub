#include <iostream>
#include <vector>
#include <string>
#include "Candidate.h"
#include "Job.h"
#include "Interview.h"
#include "FileHandler.h"
#include "Analyzer.h"

int main() {
    std::cout << "AI Hiring System - C++ Backend" << std::endl;

    // Initialize system components
    FileHandler fileHandler;
    Analyzer analyzer;

    // Example usage
    std::vector<Candidate> candidates;
    std::vector<Job> jobs;
    std::vector<Interview> interviews;

    // Add a sample job
    Job job1("Software Engineer", "Develop software applications", {"C++", "Python", "Java"});
    jobs.push_back(job1);

    // Simulate resume upload and analysis
    std::string resumePath = "sample_resume.txt";
    std::string resumeContent = fileHandler.readFile(resumePath);
    if (!resumeContent.empty()) {
        Candidate candidate("John Doe", resumeContent);
        analyzer.analyzeResume(candidate);
        candidates.push_back(candidate);

        // Schedule interview
        Interview interview(candidate, job1, "2023-12-01 10:00");
        interviews.push_back(interview);
    }

    // Test empty resume
    std::string emptyPath = "empty_resume.txt";
    std::string emptyContent = fileHandler.readFile(emptyPath);
    if (emptyContent.empty()) {
        std::cout << "Empty resume handled correctly: no content." << std::endl;
    }

    // Test no skills resume
    std::string noSkillsPath = "no_skills_resume.txt";
    std::string noSkillsContent = fileHandler.readFile(noSkillsPath);
    if (!noSkillsContent.empty()) {
        Candidate candidate2("Jane Smith", noSkillsContent);
        analyzer.analyzeResume(candidate2);
        candidates.push_back(candidate2);
        std::cout << "No skills resume: " << candidate2.getSkills().size() << " skills found." << std::endl;
    }

    // Test file writing
    bool writeSuccess = fileHandler.writeFile("test_output.txt", "Test content for file writing.");
    if (writeSuccess) {
        std::cout << "File writing successful." << std::endl;
    } else {
        std::cout << "File writing failed." << std::endl;
    }

    // Test invalid file path
    std::string invalidContent = fileHandler.readFile("nonexistent.txt");
    if (invalidContent.empty()) {
        std::cout << "Invalid file path handled correctly." << std::endl;
    }

    // Display results
    for (const auto& candidate : candidates) {
        std::cout << "Candidate: " << candidate.getName() << std::endl;
        std::cout << "Skills: ";
        for (const auto& skill : candidate.getSkills()) {
            std::cout << skill << " ";
        }
        std::cout << std::endl;
    }

    return 0;
}
