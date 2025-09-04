#ifndef CANDIDATE_H
#define CANDIDATE_H

#include <string>
#include <vector>

class Candidate {
private:
    std::string name;
    std::string resumeText;
    std::vector<std::string> skills;
    int experienceYears;

public:
    Candidate(const std::string& name, const std::string& resumeText);
    std::string getName() const;
    std::string getResumeText() const;
    std::vector<std::string> getSkills() const;
    void setSkills(const std::vector<std::string>& skills);
    int getExperienceYears() const;
    void setExperienceYears(int years);
};

#endif // CANDIDATE_H
