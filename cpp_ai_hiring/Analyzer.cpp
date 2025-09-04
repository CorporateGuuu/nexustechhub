#include "Analyzer.h"
#include <algorithm>
#include <sstream>

Analyzer::Analyzer() {
    skillKeywords = {"C++", "Python", "Java", "JavaScript", "SQL", "Machine Learning", "AI", "Data Analysis"};
}

void Analyzer::analyzeResume(Candidate& candidate) {
    std::string resumeText = candidate.getResumeText();
    std::vector<std::string> skills = extractSkills(resumeText);
    candidate.setSkills(skills);

    // Simple experience extraction (count years mentioned)
    size_t pos = resumeText.find("years");
    if (pos != std::string::npos) {
        // Extract number before "years"
        std::string before = resumeText.substr(0, pos);
        std::stringstream ss(before);
        int years;
        while (ss >> years) {
            candidate.setExperienceYears(years);
            break;
        }
    }
}

std::vector<std::string> Analyzer::extractSkills(const std::string& text) {
    std::vector<std::string> foundSkills;
    std::string lowerText = text;
    std::transform(lowerText.begin(), lowerText.end(), lowerText.begin(), ::tolower);

    for (const auto& skill : skillKeywords) {
        std::string lowerSkill = skill;
        std::transform(lowerSkill.begin(), lowerSkill.end(), lowerSkill.begin(), ::tolower);
        if (lowerText.find(lowerSkill) != std::string::npos) {
            foundSkills.push_back(skill);
        }
    }
    return foundSkills;
}
