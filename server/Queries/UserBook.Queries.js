// --- LIKE QUERIES ---

// get count of liked books
export const countLikedBooks = `
    SELECT COUNT(*) FROM Likes
    WHERE User_ID = ?`;

// Checks if a user has already liked a specific book.
export const checkLikeQuery = `
    SELECT * FROM Likes
    WHERE User_ID = ? AND Book_ID = ?;
`;

// Adds a new like entry.
export const addLikeQuery = `
    INSERT INTO Likes (User_ID, Book_ID)
    VALUES (?, ?);
`;

// Removes a like entry.
export const removeLikeQuery = `
    DELETE FROM Likes
    WHERE User_ID = ? AND Book_ID = ?;
`;

// --- DOWNLOAD QUERIES ---

// Checks the current number of downloaded books for a user (where Percentage_Read < 100).
export const countActiveDownloadsQuery = `
    SELECT COUNT(*) AS active_downloads 
    FROM Offline_Content
    WHERE User_ID = ? AND Percentage_Read < 100;
`;

// Checks if a specific book is already downloaded (by checking the Offline_Content table).
export const checkDownloadQuery = `
    SELECT * FROM Offline_Content
    WHERE User_ID = ? AND Book_ID = ?;
`;

// Adds a book to the Offline_Content list (marking it as downloaded but not yet read).
export const addDownloadQuery = `
    INSERT INTO Offline_Content (User_ID, Book_ID, Page_Number)
    VALUES (?, ?, ?);
`;

// Removes a book from the Offline_Content list.
export const removeDownloadQuery = `
    DELETE FROM Offline_Content
    WHERE User_ID = ? AND Book_ID = ?;
`;

// update percentage read
export const updatePercentageReadQuery = `
    UPDATE Offline_Content 
    SET Page_Number = ?, Percentage_Read = ?, Last_Accessed = ?
    WHERE User_ID = ? AND Book_ID = ?;`;

// --- REVIEW QUERIES ---
export const getTheReviewQuery = `SELECT * from Reviews WHERE User_ID = ? AND Book_ID = ?;`;
export const addAReviewQuery = `INSERT INTO Reviews (User_ID, Book_ID, Review_Text, Review_Date, Rating) VALUES (?, ?, ?, ?, ?);`;
export const updateAReviewQuery = `UPDATE Reviews SET Review_Text = ?, Review_Date = ?, Rating = ? WHERE User_ID = ? AND Book_ID = ?;`;
export const deleteAReviewQuery = `DELETE FROM Reviews WHERE User_ID = ? AND Book_ID = ?;`;
