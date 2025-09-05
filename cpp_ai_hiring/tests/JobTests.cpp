#include "Job.h"
#include <iostream>
#include <cassert>

void testJobCreation() {
    Job job("Software Engineer", "Develop software", {"C++", "Python"});
    assert(job.getTitle() == "Software Engineer");
    assert(job.getDescription() == "Develop software");
    assert(job.getRequiredSkills().size() == 2);
    assert(job.getRequiredSkills()[0] == "C++");
    assert(job.getRequiredSkills()[1] == "Python");
    std::cout << "testJobCreation passed." << std::endl;
}

void testJobId() {
    Job job1("Job1", "Desc1", {});
    Job job2("Job2", "Desc2", {});
    assert(job1.getId() != job2.getId());
    std::cout << "testJobId passed." << std::endl;
}

int main() {
    testJobCreation();
    testJobId();
    std::cout << "All Job tests passed." << std::endl;
    return 0;
}
