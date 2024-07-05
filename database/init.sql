-- Create user table
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create note table
CREATE TABLE note (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    userId INTEGER NOT NULL,
    shareableUrl VARCHAR(255) UNIQUE,
    isShared BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_user
        FOREIGN KEY(userId)
        REFERENCES "user"(id)
);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create a trigger to automatically update the updated_at column for note table
CREATE TRIGGER update_note_modtime
    BEFORE UPDATE ON note
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
