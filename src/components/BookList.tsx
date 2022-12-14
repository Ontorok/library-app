import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { IBook } from "../models/book.model";
import bookServices from "../service/book.services";

const BookList = (props: Props) => {
  const { getBookId } = props;
  const [books, setBooks] = useState<IBook[]>([]);

  const fetchBooks = async (): Promise<void> => {
    const data = await bookServices.getAllBooks();
    const books = data.docs.map((doc) => {
      const bookData = doc.data();
      const book: IBook = {
        id: doc.id,
        title: bookData.title,
        author: bookData.author,
        status: bookData.status,
      };
      return book;
    });
    setBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onDelete = async (id: string): Promise<void> => {
    await bookServices.deleteBook(id);
    fetchBooks();
  };

  return (
    <div>
      <div className="mb-2">
        <Button variant="dark edit" onClick={fetchBooks}>
          Refresh List
        </Button>
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
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={() => getBookId(doc.id as string)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={() => onDelete(doc.id as string)}
                  >
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

type Props = {
  getBookId: (id: string) => void;
};

export default BookList;
