                GOOGLE
                  ↓
            Firebase Auth
                  ↓
               Login
                  ↓
        POST /api/user
                  ↓
               MongoDB
                  ↓
       backendUser with _id
                  ↓
             AuthContext
          ↙       ↓       ↘
   Dashboard    History    Admin
       ↓           ↓
Upload PDF     GET history
       ↓           ↓
Multer        MongoDB
       ↓
PDF Parse
       ↓
Cohere AI
       ↓
Score + Feedback
       ↓
MongoDB
       ↓
Dashboard Result

---------------------------------------------------------------------------------------------------------


Login
  │
  └── PUBLIC
       no HOC


Dashboard
  │
  └── withAuthHOC
       ↓
     Login required


History
  │
  └── withAuthHOC
       ↓
     Login required


Admin
  │
  └── withAdminHOC
       ↓
     Login required
       +
     role === "admin"


---------------------------------------------------------------------------------------------------------