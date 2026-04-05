INSERT INTO AMCUSTOMERMAIN
    (CUSTOMER_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE, COMPANY_NAME, COMPANY_TYPE, GST_NUMBER, COMPANY_SIZE, INDUSTRY, ADDRESS_LINE1, ADDRESS_LINE2, CITY, STATE, PINCODE, COUNTRY, PLAN_NAME, BILLING_CYCLE, STATUS, ONBOARDED_AT)
VALUES
    (1, 'Arjun', 'Mehta', 'arjun@techcorp.in', '9876543210', 'TechCorp India', 'Pvt Ltd', '27AABCT1332L1ZR', '51-200', 'Technology', '4th Floor, BKC', 'Bandra Kurla Complex', 'Mumbai', 'Maharashtra', '400051', 'India', 'Growth', 'Annually', 'Active', TIMESTAMP '2025-01-15 10:00:00'),
    (2, 'Priya', 'Sharma', 'priya@startupx.io', '9123456780', 'StartupX', 'LLP', '07AAECS1234F1Z5', '1-10', 'Fintech', 'Cyber Hub', 'DLF Phase 2', 'Gurugram', 'Haryana', '122002', 'India', 'Starter', 'Monthly', 'Pending', TIMESTAMP '2025-03-01 11:30:00');

INSERT INTO AMROLE
    (ROLE_ID, ROLE_NAME, ROLE_CODE, DESCRIPTION, PERMISSIONS, STATUS, CREATED_AT)
VALUES
    (1, 'Super Admin', 'SUPER_ADMIN', 'Full access to all modules', 'read,write,delete,manage_users,export', 'Active', TIMESTAMP '2025-01-01 09:00:00'),
    (2, 'Manager', 'MANAGER', 'Can manage customers and services', 'read,write,export', 'Active', TIMESTAMP '2025-01-15 09:30:00'),
    (3, 'Viewer', 'VIEWER', 'Read-only access', 'read', 'Active', TIMESTAMP '2025-02-01 08:00:00');

INSERT INTO AMSERVICECATEGORY
    (SERVICE_CATEGORY_ID, CATEGORY_NUMBER, CATEGORY_NAME, DESCRIPTION, STATUS, CREATED_AT)
VALUES
    (1, 1, 'Hotel', 'Services for hotel and hospitality businesses', 'Active', TIMESTAMP '2025-01-01 08:00:00'),
    (2, 2, 'Hospital', 'Services for healthcare and hospital workflows', 'Active', TIMESTAMP '2025-01-01 08:30:00'),
    (3, 3, 'School', 'Services for schools and education institutes', 'Active', TIMESTAMP '2025-01-01 09:00:00');

INSERT INTO AMCUSTOMERSERVICE
    (CUSTOMER_SERVICE_ID, SERVICE_NUMBER, SERVICE_NAME, SERVICE_CATEGORY_ID, DESCRIPTION, STATUS, CREATED_AT)
VALUES
    (1, 1, 'Front Desk Management', 1, 'Reception and guest check-in workflows', 'Active', TIMESTAMP '2025-01-10 08:00:00'),
    (2, 2, 'Room Booking System', 1, 'Reservations and occupancy controls', 'Active', TIMESTAMP '2025-01-12 08:00:00'),
    (3, 3, 'Patient Records', 2, 'Patient profiles and visit history', 'Active', TIMESTAMP '2025-01-15 08:00:00'),
    (4, 4, 'Fee Management', 3, 'Invoices, fee collection, and reminders', 'Active', TIMESTAMP '2025-02-01 08:00:00');

INSERT INTO AMCUSTOMERROLE
    (CUSTOMER_ROLE_ID, CUSTOMER_ID, ROLE_ID, STATUS, ASSIGNED_AT)
VALUES
    (1, 1, 1, 'Active', TIMESTAMP '2025-01-20 10:00:00'),
    (2, 2, 2, 'Active', TIMESTAMP '2025-03-03 12:00:00');

INSERT INTO AMCUSTOMERROLE_SERVICE_MAP
    (CUSTOMER_ROLE_ID, CUSTOMER_SERVICE_ID)
VALUES
    (1, 1),
    (1, 2),
    (2, 4);
