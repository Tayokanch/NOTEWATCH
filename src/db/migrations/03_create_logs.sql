CREATE TABLE IF NOT EXISTS request_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    user_agent TEXT,
    ip_address TEXT,
    status_code INT,
    created_at TIMESTAMP DEFAULT NOW()
);
