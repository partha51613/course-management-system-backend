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

INSERT INTO departments (name, email, phone, type, isActive) VALUES
('Department of Computer Science', 'cs@college.edu', '9876543210', 'Department', TRUE),
('School of Engineering', 'engineering@college.edu', '8765432109', 'School', TRUE),
('Centre for Artificial Intelligence', 'ai@college.edu', '7654321098', 'Centre', TRUE),
('Department of Physics', 'physics@college.edu', '6543210987', 'Department', TRUE),
('Office of Student Affairs', 'student.affairs@college.edu', '5432109876', 'Others', TRUE);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration_week INT NOT NULL,
    department_id INT(10) UNSIGNED,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);


INSERT INTO courses (name, duration_week, department_id, isActive) VALUES
('Data Structures and Algorithms', 12, 1, TRUE),
('Machine Learning Fundamentals', 8, 2, TRUE),
('Thermodynamics and Heat Transfer', 10, 3, FALSE),
('Structural Analysis and Design', 6, 1, TRUE),
('Artificial Intelligence and Deep Learning', 15, 4, TRUE),
('Database Management Systems', 9, 2, FALSE),
('Embedded Systems and IoT', 7, 3, TRUE),
('Cybersecurity and Ethical Hacking', 14, 4, TRUE),
('Renewable Energy Systems', 5, 1, FALSE),
('Cloud Computing and DevOps', 11, 2, TRUE);



CREATE TABLE course_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    session_name VARCHAR(20) NOT NULL,  -- Specify a length for VARCHAR
    run_type ENUM('NEW', 'REPEAT', 'RERUN') NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON UPDATE CASCADE
);

-- Inserting course sessions
INSERT INTO course_sessions (course_id, session_name, run_type) VALUES (1, 'JAN2024', 'NEW'), (1, 'JULY2024', 'REPEAT'), (2, 'JAN2024', 'NEW'), (2, 'JULY2024', 'RERUN'), (3, 'JAN2024', 'NEW'), (4, 'JULY2024', 'NEW'), (5, 'JAN2024', 'NEW'), (5, 'JULY2024', 'REPEAT'), (6, 'JULY2024', 'NEW'), (7, 'JAN2024', 'NEW'), (7, 'JULY2024', 'RERUN'), (8, 'JAN2024', 'NEW'), (9, 'JULY2024', 'NEW'), (10, 'JAN2024', 'NEW'), (10, 'JULY2024', 'REPEAT');


CREATE TABLE session_honorarium (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    course_session_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    honorarium DECIMAL(10,2) NOT NULL,
    payment_status ENUM('NA', 'Pending', 'Paid') DEFAULT 'Pending',
    FOREIGN KEY (course_session_id) REFERENCES course_sessions(id) ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
    CONSTRAINT unique_session_user UNIQUE (course_session_id, user_id)
);




-- UPDATED SCHEMA


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

CREATE TABLE departments (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL UNIQUE,
    type ENUM('School', 'Department', 'Centre', 'Others') NOT NULL,
    isActive BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration_week INT UNSIGNED NOT NULL,
    department_id INT UNSIGNED,
    isActive BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE course_sessions (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    course_id INT UNSIGNED NOT NULL,
    session_name VARCHAR(20) NOT NULL,  
    run_type ENUM('NEW', 'REPEAT', 'RERUN') NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON UPDATE CASCADE
);

CREATE TABLE session_honorarium (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    course_session_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    honorarium DECIMAL(10,2) NOT NULL,
    payment_status ENUM('NA', 'Pending', 'Paid') DEFAULT 'Pending',
    FOREIGN KEY (course_session_id) REFERENCES course_sessions(id) ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
    CONSTRAINT unique_session_user UNIQUE (course_session_id, user_id)
);


INSERT INTO session_honorarium (course_session_id, user_id, honorarium, payment_status) VALUES
(1, 1, 50000.00,"NA" ),
(1, 2, 20000.00,"NA"),
(1, 5, 10000.00,"NA" )