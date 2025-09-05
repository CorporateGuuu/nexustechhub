#include "Interview.h"

Interview::Interview(const Candidate& candidate, const Job& job, const std::string& dateTime)
    : candidate(candidate), job(job), dateTime(dateTime), status("Scheduled") {}

Candidate Interview::getCandidate() const {
    return candidate;
}

Job Interview::getJob() const {
    return job;
}

std::string Interview::getDateTime() const {
    return dateTime;
}

std::string Interview::getStatus() const {
    return status;
}

void Interview::setStatus(const std::string& status) {
    this->status = status;
}
