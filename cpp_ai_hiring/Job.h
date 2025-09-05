#ifndef JOB_H
#define JOB_H

#include <string>
#include <vector>

class Job {
private:
    std::string title;
    std::string description;
    std::vector<std::string> requiredSkills;
    std::string id;

public:
    Job(const std::string& title, const std::string& description, const std::vector<std::string>& requiredSkills);
    std::string getTitle() const;
    std::string getDescription() const;
    std::vector<std::string> getRequiredSkills() const;
    std::string getId() const;
    void setId(const std::string& id);
};

#endif // JOB_H
