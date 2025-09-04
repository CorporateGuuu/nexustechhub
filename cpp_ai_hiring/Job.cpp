#include "Job.h"
#include <uuid/uuid.h>  // Assuming uuid library is available, or use simple ID generation

Job::Job(const std::string& title, const std::string& description, const std::vector<std::string>& requiredSkills)
    : title(title), description(description), requiredSkills(requiredSkills) {
    // Generate simple ID for now
    static int idCounter = 0;
    id = "JOB" + std::to_string(++idCounter);
}

std::string Job::getTitle() const {
    return title;
}

std::string Job::getDescription() const {
    return description;
}

std::vector<std::string> Job::getRequiredSkills() const {
    return requiredSkills;
}

std::string Job::getId() const {
    return id;
}

void Job::setId(const std::string& id) {
    this->id = id;
}
