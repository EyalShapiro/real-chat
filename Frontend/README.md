Project Structure
bash
Copy code

```
/chat-application
  ├── /src
      ├── /api
      │    └── connectToServer.ts       # Function to connect to the server
      ├── /components
      │    ├── Chat.tsx                # Main chat component
      │    └── Registration.tsx        # Registration component
      ├── /types
      │    └── messageType.ts          # Type definition for chat messages
      ├── App.tsx                      # Main entry point for the application
      ├── index.tsx                    # React entry point
      └── styles.ts                    # Global styles and theme (optional)
  ├── /public
      ├── index.html                   # HTML file to load the app
      └── /assets
           └── logo.png                # Optional: app logo
  ├── .gitignore
  ├── package.json
  ├── README.md                       # This file
  └── tsconfig.json                   # TypeScript configuration
```
