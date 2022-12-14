import React, { FormEvent, useEffect, useState } from "react";
import { Availibity, Message } from "../types";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import { IBook } from "../models/book.model";
import bookServices from "../service/book.services";

const AddBook = (props: Props) => {
  const { bookId, setBookId } = props;
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [status, setStatus] = useState<string>("Available");
  const [flag, setFlag] = useState<boolean>(true);
  const [message, setMessage] = useState<Message>({
    error: false,
    text: "",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setMessage({ error: false, text: "" });
    if (title === "" || author === "") {
      setMessage({ error: true, text: "All fields are mandatory!!" });
    }
    const newBook: IBook = {
      title,
      author,
      status: status as Availibity,
    };
    try {
      if (bookId !== undefined && bookId !== "") {
        await bookServices.updateBook(bookId, newBook);
        setBookId("");
        setMessage({ error: false, text: "Updated successfully!" });
      } else {
        await bookServices.addBook(newBook);
        setMessage({ error: false, text: "New Book added successfully!" });
      }
    } catch (err: any) {
      setMessage({ error: false, text: err.message });
    }
    setTitle("");
    setAuthor("");
  };

  const editHandler = async () => {
    setMessage({ error: false, text: "" });
    try {
      const docSnap = await bookServices.getBook(bookId);
      setTitle(docSnap.data()?.title);
      setAuthor(docSnap.data()?.author);
      setStatus(docSnap.data()?.status);
    } catch (err: any) {
      setMessage({ error: true, text: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", bookId);
    if (bookId !== undefined && bookId !== "") {
      editHandler();
    }
  }, [bookId]);

  return (
    <div className="p-4 box">
      {message.text && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => {
            setMessage({ error: false, text: "" });
          }}
        >
          {message.text}
        </Alert>
      )}

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBookTitle">
          <InputGroup>
            <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookAuthor">
          <InputGroup>
            <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Book Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <ButtonGroup aria-label="Basic example" className="mb-3">
          <Button
            disabled={flag}
            variant="success"
            onClick={(e) => {
              setStatus("Available");
              setFlag(true);
            }}
          >
            Available
          </Button>
          <Button
            variant="danger"
            disabled={!flag}
            onClick={(e) => {
              setStatus("Not Available");
              setFlag(false);
            }}
          >
            Not Available
          </Button>
        </ButtonGroup>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Add/ Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

type Props = {
  bookId: string;
  setBookId: React.Dispatch<React.SetStateAction<string>>;
};

export default AddBook;
