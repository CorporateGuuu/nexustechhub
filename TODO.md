# JWT Secret Integration Tasks

## Current Status
- [x] Analyze current Supabase JWT setup
- [x] Understand legacy HS256 secret requirements
- [x] Plan integration approach

## Completed Tasks
- [x] Update lib/supabase.js to support HS256 JWT verification
- [x] Add SUPABASE_JWT_SECRET environment variable documentation
- [x] Update SUPABASE_SETUP.md with JWT secret configuration

## Pending Tasks
- [ ] Set SUPABASE_JWT_SECRET environment variable in deployment environment
- [ ] Test JWT verification with legacy secret
- [ ] Verify access token expiry configuration (3600 seconds) in Supabase dashboard

## Files to Modify
- lib/supabase.js - Add HS256 verification support
- SUPABASE_SETUP.md - Update environment variables section

## Environment Variables to Add
- SUPABASE_JWT_SECRET - Legacy JWT secret for HS256 verification
