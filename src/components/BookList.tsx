import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { IBook } from "../models/Book";

const BookList = () => {
  const [books, setBooks] = useState<IBook[]>([
    {
      id: "101",
      title: "node js",
      author: "Dev Gray",
      status: "Available",
    },
  ]);
  return (
    <div>
      <div className="mb-2">
        <Button variant="dark edit">Refresh List</Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
                <td>
                  <Button variant="secondary" className="edit">
                    Edit
                  </Button>
                  <Button variant="danger" className="delete">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default BookList;
