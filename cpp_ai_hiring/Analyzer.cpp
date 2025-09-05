#include "Analyzer.h"
#include <algorithm>
#include <sstream>
#include <regex>

Analyzer::Analyzer() {
    skillKeywords = {"C++", "Python", "Java", "JavaScript", "SQL", "Machine Learning", "AI", "Data Analysis", "React", "Node.js", "HTML", "CSS", "Git", "Docker", "Kubernetes", "AWS", "Azure", "Linux", "Windows", "macOS"};
    skillSynonyms = {
        {"C++", {"cpp", "c plus plus", "c++11", "c++14", "c++17"}},
        {"Python", {"python3", "py", "django", "flask"}},
        {"Java", {"java se", "java ee", "spring", "hibernate"}},
        {"JavaScript", {"js", "node", "nodejs", "react.js", "vue.js", "angular"}},
        {"Machine Learning", {"ml", "machine learning", "deep learning", "neural networks", "tensorflow", "pytorch"}},
        {"AI", {"artificial intelligence", "computer vision", "nlp", "natural language processing"}},
        {"Data Analysis", {"data analytics", "pandas", "numpy", "matplotlib", "seaborn"}}
    };
}

void Analyzer::analyzeResume(Candidate& candidate) {
    std::string resumeText = candidate.getResumeText();
    std::vector<std::string> skills = extractSkills(resumeText);
    candidate.setSkills(skills);

    // Improved experience extraction using regex
    std::regex experienceRegex(R"(\b(\d+)\s*(?:\+?\s*)?(?:years?|yrs?)\b)", std::regex_constants::icase);
    std::smatch match;
    int maxYears = 0;
    std::string::const_iterator searchStart(resumeText.cbegin());
    while (std::regex_search(searchStart, resumeText.cend(), match, experienceRegex)) {
        int years = std::stoi(match[1]);
        if (years > maxYears) {
            maxYears = years;
        }
        searchStart = match.suffix().first;
    }
    candidate.setExperienceYears(maxYears);
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

    // Check for synonyms
    for (const auto& synonymPair : skillSynonyms) {
        const std::string& mainSkill = synonymPair.first;
        const std::vector<std::string>& synonyms = synonymPair.second;
        for (const auto& synonym : synonyms) {
            std::string lowerSynonym = synonym;
            std::transform(lowerSynonym.begin(), lowerSynonym.end(), lowerSynonym.begin(), ::tolower);
            if (lowerText.find(lowerSynonym) != std::string::npos && std::find(foundSkills.begin(), foundSkills.end(), mainSkill) == foundSkills.end()) {
                foundSkills.push_back(mainSkill);
                break;
            }
        }
    }

    return foundSkills;
}
