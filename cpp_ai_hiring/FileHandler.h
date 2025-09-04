#ifndef FILEHANDLER_H
#define FILEHANDLER_H

#include <string>

class FileHandler {
public:
    std::string readFile(const std::string& filePath);
    bool writeFile(const std::string& filePath, const std::string& content);
};

#endif // FILEHANDLER_H
