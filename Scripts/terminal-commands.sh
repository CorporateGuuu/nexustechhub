# Initialize git repository (if not already done)
git init

# Add all files to staging
git add .

# Commit the changes
git commit -m "Initial commit for Nexus Tech Hub"

# Add the remote repository
git remote add origin https://github.com/CorporateGuuu/nexustechhub.git

# Push to the main branch
# If the repository is new, use:
git push -u origin main

# If you're pushing to an existing repository and main branch already exists:
# git push -u origin main