export const getTop10UserQuery = `SELECT u.User_ID, u.Current_Streak, u.Longest_Streak, v.Name
    FROM User u
    JOIN Visitor v ON u.Visitor_ID = v.Visitor_ID
    ORDER BY u.Current_Streak DESC, u.Longest_Streak DESC, v.Registration_Date ASC
    LIMIT 10`;
