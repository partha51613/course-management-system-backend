CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL UNIQUE,
    alt_phone VARCHAR(255) NULL,
    role ENUM('SME', 'TA', 'ADMIN') NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    bank_ac_no VARCHAR(20) NOT NULL UNIQUE,
    bank_ifsc VARCHAR(255) NOT NULL,
    bank_address VARCHAR(255) NOT NULL,
    isActive BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address) VALUES
('Amit Sharma', 'amit.sharma@example.com', '9876543210', '9123456789', 'SME', 'Male', 'State Bank of India', '123456789012', 'SBIN0001234', 'Guwahati, Assam'),
('Priya Verma', 'priya.verma@example.com', '8765432109', '9012345678', 'TA', 'Female', 'HDFC Bank', '234567890123', 'HDFC0005678', 'Mumbai, Maharashtra'),
('Rahul Das', 'rahul.das@example.com', '7654321098', NULL, 'ADMIN', 'Male', 'ICICI Bank', '345678901234', 'ICIC0003456', 'Kolkata, West Bengal'),
('Neha Patel', 'neha.patel@example.com', '6543210987', '7890123456', 'SME', 'Female', 'Axis Bank', '456789012345', 'UTIB0002345', 'Ahmedabad, Gujarat'),
('Arun Kumar', 'arun.kumar@example.com', '5432109876', NULL, 'TA', 'Other', 'Punjab National Bank', '567890123456', 'PUNB0006789', 'Chennai, Tamil Nadu');


CREATE TABLE departments (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL UNIQUE,
    type ENUM('School', 'Department', 'Centre', 'Others') NOT NULL,
    isActive BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO departments (name, email, phone, type, isActive, createdAt, updatedAt) VALUES
('Department of Computer Science', 'cs@college.edu', '9876543210', 'Department', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('School of Engineering', 'engineering@college.edu', '8765432109', 'School', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Centre for Artificial Intelligence', 'ai@college.edu', '7654321098', 'Centre', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Department of Physics', 'physics@college.edu', '6543210987', 'Department', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Office of Student Affairs', 'student.affairs@college.edu', '5432109876', 'Others', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

