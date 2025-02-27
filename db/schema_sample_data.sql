INSERT INTO users (name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address) VALUES
('Amit Sharma', 'amit.sharma@example.com', '9876543210', '9123456789', 'SME', 'Male', 'State Bank of India', '123456789012', 'SBIN0001234', 'Guwahati, Assam'),
('Priya Verma', 'priya.verma@example.com', '8765432109', '9012345678', 'TA', 'Female', 'HDFC Bank', '234567890123', 'HDFC0005678', 'Mumbai, Maharashtra'),
('Rahul Das', 'rahul.das@example.com', '7654321098', NULL, 'ADMIN', 'Male', 'ICICI Bank', '345678901234', 'ICIC0003456', 'Kolkata, West Bengal'),
('Neha Patel', 'neha.patel@example.com', '6543210987', '7890123456', 'SME', 'Female', 'Axis Bank', '456789012345', 'UTIB0002345', 'Ahmedabad, Gujarat'),
('Arun Kumar', 'arun.kumar@example.com', '5432109876', NULL, 'TA', 'Other', 'Punjab National Bank', '567890123456', 'PUNB0006789', 'Chennai, Tamil Nadu');

INSERT INTO departments (name, email, phone, type, isActive) VALUES
('Department of Computer Science', 'cs@college.edu', '9876543210', 'Department', TRUE),
('School of Engineering', 'engineering@college.edu', '8765432109', 'School', TRUE),
('Centre for Artificial Intelligence', 'ai@college.edu', '7654321098', 'Centre', TRUE),
('Department of Physics', 'physics@college.edu', '6543210987', 'Department', TRUE),
('Office of Student Affairs', 'student.affairs@college.edu', '5432109876', 'Others', TRUE);

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


INSERT INTO course_sessions (course_id, session_name, run_type) VALUES
    (1, 'JAN2024', 'NEW'),
    (1, 'JULY2024', 'REPEAT'),
    (2, 'JAN2024', 'NEW'),
    (2, 'JULY2024', 'RERUN'),
    (3, 'JAN2024', 'NEW'),
    (4, 'JULY2024', 'NEW'),
    (5, 'JAN2024', 'NEW'),
    (5, 'JULY2024', 'REPEAT');


INSERT INTO session_honorarium (course_session_id, user_id, honorarium, payment_status) VALUES
(1, 1, 50000.00,"NA" ),
(1, 2, 20000.00,"NA"),
(1, 5, 10000.00,"NA" )