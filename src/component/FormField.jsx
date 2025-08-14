import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const FormField = forwardRef((_, ref) => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    address1: "",
    address2: "",
    city: "",
    phoneNo: "",
    pincode: "",
  });

  const [saveInfo, setSaveInfo] = useState(false);
  const [validationError, setValidationError] = useState({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("checkoutInfo");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setSaveInfo(true);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    handleSubmit: () => {
      const errors = formValidation();
      if (Object.keys(errors).length > 0) {
        setValidationError(errors);
        return false;
      } else {
        setValidationError({});
        if (saveInfo) {
          localStorage.setItem("checkoutInfo", JSON.stringify(formData));
        } else {
          localStorage.removeItem("checkoutInfo");
        }
        return true;
      }
    }
  }));

  const formValidation = () => {
    let error = {};
    if (!formData.fName || !/^[a-zA-Z]{2,30}$/.test(formData.fName)) {
      error.fName = "Valid First Name required";
    }
    if (!formData.lName || !/^[a-zA-Z]{2,30}$/.test(formData.lName)) {
      error.lName = "Valid Last Name required";
    }
    if (!formData.address1) {
      error.address1 = "Address Line 1 is required";
    }
    if (!formData.address2) {
      error.address2 = "Address Line 2 is required";
    }
    if (!formData.city || !/^[a-zA-Z\s]{2,30}$/.test(formData.city)) {
      error.city = "Valid City name required";
    }
    if (!formData.phoneNo || !/^[6-9][0-9]{9}$/.test(formData.phoneNo)) {
      error.phoneNo = "Valid 10-digit phone number required";
    }
    if (!formData.pincode || !/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      error.pincode = "Valid 6-digit pincode required";
    }
    return error;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container fluid>
      <h5 className="mb-4">Billing Details</h5>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="fName">
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                autoFocus
                required
                type="text"
                name="fName"
                value={formData.fName}
                onChange={handleChange}
                isInvalid={!!validationError.fName}
              />
              <Form.Control.Feedback type="invalid">
                {validationError.fName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lName">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                required
                type="text"
                name="lName"
                value={formData.lName}
                onChange={handleChange}
                isInvalid={!!validationError.lName}
              />
              <Form.Control.Feedback type="invalid">
                {validationError.lName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="address1" className="mb-3">
          <Form.Label>Address Line 1*</Form.Label>
          <Form.Control
            required
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            isInvalid={!!validationError.address1}
          />
          <Form.Control.Feedback type="invalid">
            {validationError.address1}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="address2" className="mb-3">
          <Form.Label>Address Line 2*</Form.Label>
          <Form.Control
            required
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            isInvalid={!!validationError.address2}
          />
          <Form.Control.Feedback type="invalid">
            {validationError.address2}
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="city">
              <Form.Label>Town/City*</Form.Label>
              <Form.Control
                required
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                isInvalid={!!validationError.city}
              />
              <Form.Control.Feedback type="invalid">
                {validationError.city}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="pincode">
              <Form.Label>Pincode*</Form.Label>
              <Form.Control
                required
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                isInvalid={!!validationError.pincode}
              />
              <Form.Control.Feedback type="invalid">
                {validationError.pincode}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="phoneNo" className="mb-3">
          <Form.Label>Phone Number*</Form.Label>
          <Form.Control
            required
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            isInvalid={!!validationError.phoneNo}
          />
          <Form.Control.Feedback type="invalid">
            {validationError.phoneNo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Check
          type="checkbox"
          label="Save this information for faster check-out next time"
          className="mt-3"
          checked={saveInfo}
          onChange={() => setSaveInfo(!saveInfo)}
        />
      </Form>
    </Container>
  );
});

export default FormField;

       