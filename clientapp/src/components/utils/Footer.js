import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar } from 'react-bootstrap';

const Footer = () => {
  const [year, setYear] = useState();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, [year])
  return (
    <Navbar fixed='bottom' bg='dark' variant='dark'>
      <Container>
        <Col lg={12} className="text-center text-muted">
          <div>
            &copy;{year} - {year - 1}, All Rights Reserved by Sushant Gupta
          </div>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Footer;
