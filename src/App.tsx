import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import "./App.css";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

function App() {
  const [bookId, setBookId] = useState<string>("");

  const getBookIdHandler = (id: string): void => {
    console.log("book id in app.tsx : ", id);
    setBookId(id);
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Library - Firebase CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook bookId={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BookList getBookId={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
