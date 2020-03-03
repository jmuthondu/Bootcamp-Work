--DATA ANALYSIS
--#1 Details of each employee: employee number, last name, first name, gender, and salary.

SELECT * FROM employees;
SELECT employees.emp_no, employees.last_name, employees.first_name, employees.gender
FROM employees
JOIN salaries ON employees.emp_no = salaries.emp_no;

--#2 List employees who were hired in 1986
SELECT first_name, last_name, hire_date
FROM employees
WHERE hire_date BETWEEN '1986-01-01' AND '1987-01-01';

--#3 List the manager of each department with the following information: department number, department name, the manager's employee number, last name, first name, and start and end employment dates
SELECT * FROM departments;
SELECT * FROM dept_manager;

SELECT departments.dept_no, departments.dept_name, dept_manager.emp_no, employees.last_name, employees.first_name,
employees.gender, employees.last_name, dept_manager.from_date,dept_manager.to_date
FROM departments
JOIN dept_manager ON departments.dept_no = dept_manager.dept_no
JOIN employees ON dept_manager.emp_no = employees.emp_no;

--#4 List the department of each employee with the following information: employee number, last name, first name, and department name.
SELECT * FROM dept_emp
SELECT dept_emp.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM dept_emp
JOIN employees
ON dept_emp.emp_no = employees.emp_no
JOIN departments
ON dept_emp.dept_no = departments.dept_no;

--#5 All employees whose first name is Hercules and last name begins with a 'B'.
SELECT first_name, last_name 
FROM employees
WHERE first_name = 'Hercules' AND last_name LIKE 'B%';

--#6 All Employees in the sales department including their employee number,last name,first name and the department name

SELECT dept_emp.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM dept_emp
JOIN employees ON dept_emp.emp_no = employees.emp_no
JOIN departments ON dept_emp.dept_no = departments.dept_no
WHERE departments.dept_name = 'Sales';

--#7 All Employees in the sales and development departments including their employee number,last name, first name and their department name

SELECT dept_emp.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM dept_emp
JOIN employees ON dept_emp.emp_no = employees.emp_no
JOIN departments ON dept_emp.dept_no = departments.dept_no
WHERE departments.dept_name = 'Sales' OR departments.dept_name = 'Development';

--#8 In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.

SELECT last_name, COUNT(last_name) AS "The frequency"
FROM employees
GROUP BY last_name
ORDER BY (last_name) DESC;

