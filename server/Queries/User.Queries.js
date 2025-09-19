export const insertAVisitorQuery = `INSERT INTO Visitor ( Name, Email, Registration_Date, Password, Country)
VALUES (?, ?, ?, ?, ?);`;
// VALUES ('John Doe', 'VH6Z0@example.com, '2025-04-25', 'password123', 'India');

// get email and password
export const checkAVisitorQuery = `SELECT * FROM Visitor v
JOIN
	User u ON v.Visitor_ID = u.Visitor_ID
WHERE 
    Email = ?
    AND Password = SHA2(?, 256);`;

export const checkAUserQuery = `SELECT * FROM User u
JOIN
    Visitor v ON u.Visitor_ID = v.Visitor_ID
WHERE 
    Email = ? 
    AND Password = SHA2(?, 256);`;
