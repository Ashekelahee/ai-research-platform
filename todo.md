# AI Research Collaboration Platform - TODO

## Phase 1: Design System & Database Schema
- [x] Design system setup (colors, typography, spacing, components)
- [x] Database schema: labs table
- [x] Database schema: researchers table
- [x] Database schema: equipment table
- [x] Database schema: collaboration_requests table
- [x] Database schema: embeddings/vectors table for semantic search
- [x] Database migrations and schema validation

## Phase 2: Backend Core
- [x] Mock data service with realistic UEF labs and researchers
- [x] Database query helpers for labs
- [x] Database query helpers for researchers
- [x] Database query helpers for equipment
- [x] Database query helpers for collaboration requests
- [x] tRPC procedures for lab listing and filtering
- [x] tRPC procedures for researcher listing and filtering
- [x] tRPC procedures for equipment listing and filtering
- [x] tRPC procedures for collaboration request management
- [ ] Backend unit tests for core queries

## Phase 3: AI Semantic Search
- [x] AI semantic search with LLM integration
- [x] Lab semantic search procedure
- [x] Equipment semantic search procedure
- [ ] Researcher semantic search procedure
- [ ] Search result ranking and filtering logic
- [ ] Search integration tests

## Phase 4: Frontend - Core Pages
- [x] Home page with search bar and featured labs
- [x] Search results page with filters
- [x] Lab detail page with researchers and equipment
- [ ] Researcher detail page
- [ ] Equipment detail page
- [x] Navigation and layout structure
- [ ] Responsive design for all pages

## Phase 5: Collaboration & Admin
- [x] Collaboration request form and submission
- [ ] Admin dashboard layout
- [ ] Admin: Lab management (CRUD)
- [ ] Admin: Researcher management (CRUD)
- [ ] Admin: Equipment management (CRUD)
- [ ] Admin: Collaboration requests view and management
- [ ] Admin: Search analytics and insights
- [x] Role-based access control (admin vs user)

## Phase 6: Polish & Testing
- [x] Seed realistic UEF lab data (mock data)
- [ ] UI polish and refinement
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] End-to-end feature testing
- [ ] Write vitest unit tests

## Phase 7: Delivery
- [ ] Final checkpoint and project snapshot
- [ ] Documentation and deployment

## Notes
- Using mock data service instead of dedicated database
- Light, elegant interface with minimal design
- AI-powered semantic search using LLM
- No database required - all data in-memory


## Current Updates (Completed)
- [x] Add department-specific color schemes to mock data
- [x] Update lab detail pages with department colors
- [x] Create interactive AI agent search bar component
- [x] Update home page with new search interface
- [x] Department color mapping:
  - Photonics: Indigo (#6366f1)
  - Chemistry: Orange (#f97316)
  - Forestry: Green (#22c55e)
  - XR & Tech: Purple (#a855f7)
  - Natural Resources: Cyan (#06b6d4)
