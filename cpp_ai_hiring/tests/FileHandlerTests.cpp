#include "FileHandler.h"
#include <iostream>
#include <cassert>
#include <fstream>

void testReadFile() {
    FileHandler fh;
    std::string content = fh.readFile("sample_resume.txt");
    assert(!content.empty());
    assert(content.find("John Doe") != std::string::npos);
    std::cout << "testReadFile passed." << std::endl;
}

void testReadNonexistentFile() {
    FileHandler fh;
    std::string content = fh.readFile("nonexistent.txt");
    assert(content.empty());
    std::cout << "testReadNonexistentFile passed." << std::endl;
}

void testWriteFile() {
    FileHandler fh;
    bool success = fh.writeFile("test_write.txt", "Test content");
    assert(success);
    // Verify by reading back
    std::string content = fh.readFile("test_write.txt");
    assert(content == "Test content");
    std::cout << "testWriteFile passed." << std::endl;
}

int main() {
    testReadFile();
    testReadNonexistentFile();
    testWriteFile();
    std::cout << "All FileHandler tests passed." << std::endl;
    return 0;
}
