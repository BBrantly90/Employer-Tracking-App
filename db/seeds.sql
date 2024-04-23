-- Inserts department names into department table
INSERT INTO department
  (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');

-- Inserts employee roles into role table
INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Software Engineer', 95000, 1),
  ('Salesperson', 65000, 2),
  ('Accountant', 40000, 3),
  ('Lawyer', 100000, 4);

-- Inserts employee information into employee table
INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Bill', 'Gates', 1, 4),
  ('Billy', 'Mayes', 2, 3),
  ('Kyle', 'Broflowski', 3, 1),
  ('Johnny', 'Cochran', 4, 5);