-- Add indexes for common queries
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_pricing ON tools(pricing);
CREATE INDEX idx_tools_name ON tools(name);
CREATE INDEX idx_tools_created ON tools(created_at);

-- Add text search index
CREATE INDEX idx_tools_search ON tools USING gin(
  to_tsvector('english', name || ' ' || description)
);

-- Add index for reviews
CREATE INDEX idx_reviews_tool ON reviews(tool_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Add index for submissions
CREATE INDEX idx_submissions_user ON tool_submissions(user_id);
CREATE INDEX idx_submissions_category ON tool_submissions(category_id);
CREATE INDEX idx_submissions_created ON tool_submissions(created_at); 