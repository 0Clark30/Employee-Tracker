INSERT INTO department (department_name)
VALUES ("TECHNOLOGY"),
       ("SALES"),
       ("OPERATIONS"),
       ("HUMAN RESOURCES"),
       ("RISK MANAGEMENT");


INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000, 1),
    ("Salesman", 90000, 2),
    ("Benefits Chairman",65000, 4),
    ("Systems Admin", 70000, 3),
    ("Security Guard", 80000, 5),
    ("Director of HR", 110000, 4),
    ("Head of Security",95000,5),
    ("CTO", 200000, 1),
    ("VP of Sales", 180000, 2),
    ("COO", 160000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ("Jimmy", "John", 9, NULL),        
    ("Little", "Wayne", 8, NULL),        
    ("John", "Denver", 10, NULL),          
    ("Hakuna", "Matata", 7, NULL),        
    ("Lelo", "Stitch", 6, NULL),          
    ("John", "Silvers", 1, 2),      
    ("Hailey", "Comet", 2, 1),         
    ("Evan", "Essence", 3, 5),         
    ("Hale", "Storm", 4, 3),           
    ("Donald", "Clinton", 5 , 4); 
  