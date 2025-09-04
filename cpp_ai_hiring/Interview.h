#ifndef INTERVIEW_H
#define INTERVIEW_H

#include <string>
#include "Candidate.h"
#include "Job.h"

class Interview {
private:
    Candidate candidate;
    Job job;
    std::string dateTime;
    std::string status;  // e.g., "Scheduled", "Completed", "Cancelled"

public:
    Interview(const Candidate& candidate, const Job& job, const std::string& dateTime);
    Candidate getCandidate() const;
    Job getJob() const;
    std::string getDateTime() const;
    std::string getStatus() const;
    void setStatus(const std::string& status);
};

#endif // INTERVIEW_H
