-- UUID extension untuk PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nik VARCHAR(16),
    role VARCHAR(10) CHECK (role IN ('admin', 'agency', 'citizen')) NOT NULL DEFAULT 'citizen',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. letter_type
CREATE TABLE letter_type (
    letter_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. request_letter
CREATE TABLE request_letter (
    request_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    letter_id UUID REFERENCES letter_type(id),
    status VARCHAR(20) CHECK (status IN ('pending', 'processing', 'rejected', 'completed')) DEFAULT 'pending',
    admin_note TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- 4. file_upload
CREATE TABLE file_upload (
    file_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES request_letter(id),
    file_name VARCHAR NOT NULL,
    file_path TEXT NOT NULL, -- path di S3
    file_type VARCHAR(50), -- KTP, KK, surat_pendukung
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. log_activity
CREATE TABLE log_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    activity TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
