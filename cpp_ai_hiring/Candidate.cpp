#include "Candidate.h"

Candidate::Candidate(const std::string& name, const std::string& resumeText)
    : name(name), resumeText(resumeText), experienceYears(0) {}

std::string Candidate::getName() const {
    return name;
}

std::string Candidate::getResumeText() const {
    return resumeText;
}

std::vector<std::string> Candidate::getSkills() const {
    return skills;
}

void Candidate::setSkills(const std::vector<std::string>& skills) {
    this->skills = skills;
}

int Candidate::getExperienceYears() const {
    return experienceYears;
}

void Candidate::setExperienceYears(int years) {
    experienceYears = years;
}
