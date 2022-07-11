import './App.css';
import { SWRConfig } from 'swr';
import { ImagesWrapper } from './components/ImagesWrapper';
import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

function App() {
  const [searchId, setSearchId] = useState(1644227106000);
  const fetcher = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json()
  }
  return (<SWRConfig
    value={{
      fetcher: fetcher,
      onError: (err) => {
        console.error(err);
      },
    }}>
    <Form onSubmit={(event) => {
      event.preventDefault();
      setSearchId(event.target[0].value);
      event.target.reset();
    }}>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Control type="text" placeholder="Search ID:" />
        </Col>
        <Col xs="auto">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
    <ImagesWrapper searchId={searchId} />
  </SWRConfig >
  );
};

export default App;
