import { useState } from "react";
import { Message } from "../types/messageType";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";

const AddBook = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [status, setStatus] = useState<string>("Available");
  const [flag, setFlag] = useState<boolean>(true);
  const [message, setMessage] = useState<Message>({
    error: false,
    text: "",
  });

  return (
    <div className="p-4 box">
      {message.text && (
        <Alert variant={message?.error ? "danger" : "success"} dismissible>
          {message.text}
        </Alert>
      )}

      <Form>
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

export default AddBook;
