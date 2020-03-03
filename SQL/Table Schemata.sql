--Data Engineerig
CREATE TABLE departments(
	dept_no varchar(50) not null,
	dept_name varchar(50) not null,
	CONSTRAINT departments_PK (dept_no)
);

CREATE TABLE employees(
	emp_no int not null,
	birth_date varchar(50) not null,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	gender varchar(50) not null,
	hire_date date not null,
	CONSTRAINT employees_PK PRIMARY KEY (emp_no)
);

CREATE TABLE dept_emp(
	emp_no int not null,
	dept_no varchar(50) not null,
	from_date date not null,
	to_date date not null,
	CONSTRAINT dept_emp_no_FK FOREIGN KEY (emp_no) REFERENCES employees (emp_no),
	CONSTRAINT dept_dept_no_FK FOREIGN KEY (dept_no) REFERENCES departments (dept_no)
);

CREATE TABLE dept_manager(
	dept_no varchar(50) not null,
	emp_no int not null,
	from_date date not null,
	to_date date not null,
	CONSTRAINT dept_manager_dept_FK FOREIGN KEY (dept_no) REFERENCES departments(dept_no),
	CONSTRAINT dept_manager_emp_no_FK FOREIGN KEY (emp_no) REFERENCES employees(emp_no)
);

CREATE TABLE salaries(
	emp_no serial PRIMARY KEY,
	salary int not null,
	from_date date not null,
	to_date date not null,
	CONSTRAINT salaries_FK FOREIGN KEY (emp_no) REFERENCES employees(emp_no)
);

CREATE TABLE titles(
	emp_no int not null,
	title varchar(50) not null,
	from_date date not null,
	to_date date not null,
	CONSTRAINT titles_FK FOREIGN KEY (emp_no) REFERENCES employees(emp_no)
);
