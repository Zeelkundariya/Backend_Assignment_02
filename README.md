# Notes Management REST API

A complete, production-ready Notes Management API built with Node.js, Express, and MongoDB (Mongoose). This project follows a strict MVC architecture and implements advanced querying techniques including filtering, pagination, and sorting.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete notes.
- **Bulk Operations**: Create and Delete multiple notes at once.
- **Advanced Filtering**: Filter by category, pinned status, and date range.
- **Route Parameters**: Dynamic segments for fetching by category or status.
- **Pagination**: Efficiently fetch large datasets with customizable page and limit.
- **Sorting**: Sort results by title, category, or timestamps in ascending/descending order.
- **Strict Validation**: Robust error handling and input validation (e.g., ObjectId validation).
- **Consistent Response Format**: All responses follow a mandatory JSON structure.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **ODM**: Mongoose
- **Environment**: Dotenv
- **Development**: Nodemon

## 📂 Project Structure

```text
notes-app/
├── src/
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose schemas & models
│   ├── controllers/     # Business logic & request handlers
│   ├── routes/          # API route definitions
│   ├── app.js           # Express app setup
│   └── index.js         # Entry point (Server listener)
├── .env                 # Environment variables (Private)
├── .env.example         # Template for environment variables
├── .gitignore           # Files to ignore in Git
└── package.json         # Project dependencies & scripts
```

## ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Zeelkundariya/Backend_Assignment_02.git
   cd Backend_Assignment_02
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```text
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Run the application**:
   - For development (with nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

## 📊 API Endpoints

### CRUD Operations
- `POST /api/notes` - Create a single note
- `POST /api/notes/bulk` - Create multiple notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get note by ID
- `PUT /api/notes/:id` - Full replace note
- `PATCH /api/notes/:id` - Partial update note
- `DELETE /api/notes/:id` - Delete single note
- `DELETE /api/notes/bulk` - Delete multiple notes

### Route Parameters
- `GET /api/notes/category/:category` - Get notes by category
- `GET /api/notes/status/:isPinned` - Get notes by pinned status
- `GET /api/notes/:id/summary` - Get note summary (selected fields)

### Query Parameters & Filtering
- `GET /api/notes/filter` - General filter (category, isPinned)
- `GET /api/notes/filter/pinned` - Get pinned notes (supports category query)
- `GET /api/notes/filter/category?name=work` - Filter by category name
- `GET /api/notes/filter/date-range` - Filter by `from` and `to` dates

### Pagination
- `GET /api/notes/paginate` - Paginate all notes
- `GET /api/notes/paginate/category/:category` - Paginate notes within a category

### Sorting
- `GET /api/notes/sort` - Sort all notes (sortBy, order)
- `GET /api/notes/sort/pinned` - Sort only pinned notes

## 📝 Response Format

All responses return the following structure:
```json
{
  "success": true,
  "message": "String message",
  "data": {} or [] or null,
  "count": 10,           // Included for list endpoints
  "pagination": {}       // Included for paginated endpoints
}
```

## 📜 License

This project is licensed under the MIT License.
