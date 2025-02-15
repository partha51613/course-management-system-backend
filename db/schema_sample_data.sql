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

--  OLD QUERY, delete when not requiured
-- CREATE TABLE course_sessions (
--     id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--     course_id INT UNSIGNED NOT NULL,
--     session_name VARCHAR(20) NOT NULL,  
--     run_type ENUM('NEW', 'REPEAT', 'RERUN') NOT NULL,
--     FOREIGN KEY (course_id) REFERENCES courses(id) ON UPDATE CASCADE,
--     CONSTRAINT unique_course_session UNIQUE (course_id, session_name)
-- );

CREATE TABLE course_sessions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_id INT UNSIGNED NOT NULL,
    session_name VARCHAR(20) NOT NULL,  
    run_type ENUM('NEW', 'REPEAT', 'RERUN') NOT NULL,
    CONSTRAINT unique_course_session UNIQUE (course_id, session_name),
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

