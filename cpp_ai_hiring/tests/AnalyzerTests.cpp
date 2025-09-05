#include "Analyzer.h"
#include "Candidate.h"
#include <iostream>
#include <cassert>

void testSkillExtraction() {
    Analyzer analyzer;
    Candidate candidate("Test User", "Experienced in C++, Python, and JavaScript.");
    analyzer.analyzeResume(candidate);
    auto skills = candidate.getSkills();
    assert(std::find(skills.begin(), skills.end(), "C++") != skills.end());
    assert(std::find(skills.begin(), skills.end(), "Python") != skills.end());
    assert(std::find(skills.begin(), skills.end(), "JavaScript") != skills.end());
    std::cout << "testSkillExtraction passed." << std::endl;
}

void testExperienceParsing() {
    Analyzer analyzer;
    Candidate candidate("Test User", "5 years of experience in software development.");
    analyzer.analyzeResume(candidate);
    assert(candidate.getExperienceYears() == 5);
    std::cout << "testExperienceParsing passed." << std::endl;
}

int main() {
    testSkillExtraction();
    testExperienceParsing();
    std::cout << "All tests passed." << std::endl;
    return 0;
}
