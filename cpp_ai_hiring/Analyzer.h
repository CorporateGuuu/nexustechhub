#ifndef ANALYZER_H
#define ANALYZER_H

#include <string>
#include <vector>
#include <map>
#include "Candidate.h"

class Analyzer {
private:
    std::vector<std::string> skillKeywords;
    std::map<std::string, std::vector<std::string>> skillSynonyms;

public:
    Analyzer();
    void analyzeResume(Candidate& candidate);
    std::vector<std::string> extractSkills(const std::string& text);
};

#endif // ANALYZER_H
