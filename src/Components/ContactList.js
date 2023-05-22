import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = () => {
    setShowAddModal(true);
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    const { name, email, phone } = e.target.elements;
    const newContact = {
      id: Date.now(),
      name: name.value,
      email: email.value,
      phone: phone.value,
    };
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setShowAddModal(false);
  };

  const handleViewContact = (contact) => {
    setCurrentContact(contact);
    setShowViewModal(true);
  };

  const handleEditContact = (contact) => {
    setCurrentContact(contact);
    setShowEditModal(true);
  };

  const handleSaveEditContact = (e) => {
    e.preventDefault();
    const { name, email, phone } = e.target.elements;
    const editedContact = {
      id: currentContact.id,
      name: name.value,
      email: email.value,
      phone: phone.value,
    };
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === editedContact.id ? editedContact : contact
      )
    );
    setShowEditModal(false);
  };

  const handleDeleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
  );

  return (
    <div className="container">
      <div className="headerCO">
        <h1>All Contact</h1>
        <Button
          className="plusButton"
          variant="primary"
          onClick={handleAddContact}
        >
          <AiOutlinePlusCircle />
        </Button>
      </div>
      {contacts.length === 0 && <p className="Heading">Contact List is empty</p>}

      <input
        className="inputTop"
        type="text"
        placeholder="Search contact"
        value={searchQuery}
        onChange={handleSearch}
      />

      {filteredContacts.length === 0 && searchQuery && <p>Contact not found</p>}

      {contacts.length > 0 && (
        <div className="card-list cardview">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} style={{ width: "18rem" }}>
              <Card.Body className="cardBody">
                <Card.Title>{contact.name}</Card.Title>
                <Card.Text>Email: {contact.email}</Card.Text>
                <Card.Text>Phone: {contact.phone}</Card.Text>
                <Button
                  className="buttonicon"
                  variant="info"
                  onClick={() => handleViewContact(contact)}
                >
                  <AiFillEye />
                </Button>
                <Button
                  className="buttonicon"
                  variant="warning"
                  onClick={() => handleEditContact(contact)}
                >
                  <MdModeEditOutline />
                </Button>
                <Button
                  className="buttonicon"
                  variant="danger"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  <AiFillDelete />
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Add Contact Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveContact}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Contact Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {currentContact.name}</p>
          <p>Email: {currentContact.email}</p>
          <p>Phone: {currentContact.phone}</p>
        </Modal.Body>
      </Modal>

      {/* Edit Contact Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveEditContact}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                defaultValue={currentContact.name}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={currentContact.email}
                required
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                defaultValue={currentContact.phone}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ContactList;
