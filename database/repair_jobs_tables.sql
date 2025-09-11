-- Repair Jobs Tables for Nexus TechHub
-- This file creates the necessary tables for the repair desk functionality

-- Create repair_jobs table
CREATE TABLE IF NOT EXISTS repair_jobs (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    device_model VARCHAR(255) NOT NULL,
    device_serial VARCHAR(255),
    problem_description TEXT NOT NULL,
    parts_used JSONB DEFAULT '[]'::jsonb,
    estimated_cost DECIMAL(10, 2) DEFAULT 0,
    actual_cost DECIMAL(10, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    technician_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_repair_jobs_status ON repair_jobs(status);
CREATE INDEX IF NOT EXISTS idx_repair_jobs_customer_email ON repair_jobs(customer_email);
CREATE INDEX IF NOT EXISTS idx_repair_jobs_created_at ON repair_jobs(created_at);
CREATE INDEX IF NOT EXISTS idx_repair_jobs_device_model ON repair_jobs(device_model);

-- Create repair_job_parts table for detailed parts tracking
CREATE TABLE IF NOT EXISTS repair_job_parts (
    id SERIAL PRIMARY KEY,
    repair_job_id INTEGER NOT NULL REFERENCES repair_jobs(id) ON DELETE CASCADE,
    part_id INTEGER, -- References products table if available
    part_name VARCHAR(255) NOT NULL,
    part_sku VARCHAR(100),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_cost DECIMAL(10, 2) NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for repair_job_parts
CREATE INDEX IF NOT EXISTS idx_repair_job_parts_repair_job_id ON repair_job_parts(repair_job_id);
CREATE INDEX IF NOT EXISTS idx_repair_job_parts_part_id ON repair_job_parts(part_id);

-- Create repair_job_history table for tracking status changes
CREATE TABLE IF NOT EXISTS repair_job_history (
    id SERIAL PRIMARY KEY,
    repair_job_id INTEGER NOT NULL REFERENCES repair_jobs(id) ON DELETE CASCADE,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by VARCHAR(255), -- Could reference users table
    notes TEXT,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for repair_job_history
CREATE INDEX IF NOT EXISTS idx_repair_job_history_repair_job_id ON repair_job_history(repair_job_id);
CREATE INDEX IF NOT EXISTS idx_repair_job_history_changed_at ON repair_job_history(changed_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_repair_jobs_updated_at
    BEFORE UPDATE ON repair_jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO repair_jobs (
    customer_name,
    customer_email,
    customer_phone,
    device_model,
    device_serial,
    problem_description,
    parts_used,
    estimated_cost,
    status
) VALUES
(
    'John Smith',
    'john.smith@email.com',
    '+971501234567',
    'MacBook Pro 16" 2021',
    'FVF123456789',
    'Screen replacement needed - cracked display',
    '[{"name": "MacBook Pro 16\" Retina Display (2019-2021)", "sku": "MBP16-DISP-2019", "quantity": 1}]',
    599.99,
    'pending'
),
(
    'Sarah Johnson',
    'sarah.j@email.com',
    '+971507654321',
    'MacBook Air M2 2022',
    'FVH987654321',
    'Battery replacement - not holding charge',
    '[{"name": "MacBook Air M2 Battery (2022+)", "sku": "MBA-M2-BATT-2022", "quantity": 1}]',
    99.99,
    'in_progress'
),
(
    'Ahmed Al-Rashid',
    'ahmed.rashid@email.com',
    '+971509876543',
    'MacBook Pro 14" 2021',
    'FVJ456789123',
    'Keyboard replacement - keys not responding',
    '[{"name": "MacBook Pro Magic Keyboard (2021+)", "sku": "MBP-MGKBD-2021", "quantity": 1}]',
    149.99,
    'completed'
)
ON CONFLICT DO NOTHING;

-- Grant permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON repair_jobs TO your_app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON repair_job_parts TO your_app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON repair_job_history TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE repair_jobs_id_seq TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE repair_job_parts_id_seq TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE repair_job_history_id_seq TO your_app_user;

COMMIT;
