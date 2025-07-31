import { Fragment, useEffect, useState } from "react";

import {
  TextField,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import axios from "axios";
import { Edit, Delete } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
function App() {
  const handleEdit = (index) => {
   toast.error("In progress");

  };

  const handleDelete = (index) => {
    toast.error("In progress");
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [trigger, setTrigger] = useState(false);
  const [items, setItems] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setErrors({ ...errors, name: "Name must be at least 3 characters" });
      return;
    }
    if (email.includes("@") === false) {
      setErrors({ ...errors, email: "Email must be a valid email" });
      return;
    }
    if (phone.length < 10) {
      setErrors({ ...errors, phone: "Phone must be at least 10 characters" });
      return;
    }
    if (message.length > 250) {
      setErrors({
        ...errors,
        message: "Message must be at least 250 characters",
      });
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/contacts", {
        name,
        email,
        phone,
        message,
      });
      console.log(response);
      toast.success("Contact added successfully");
      setEmail("");
      setName("");
      setPhoneNumber("");
      setMessage("");
      setTrigger(true);
    } catch (error) {
      console.log(error);
      toast.error("Error adding contact");
    }
  };
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/contacts");
        const data = response.data.data.data;
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContacts();
  }, []);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/contacts");
        const data = response.data.data.data;
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContacts();
  }, [trigger]);

  return (
    <Fragment>
      <ToastContainer />
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Contact Management
        </Typography>
      </Container>
      <div
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.name} />
              <Box>
                <IconButton onClick={() => handleEdit(item._id)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(item._id)}>
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            gap: "20px",
          }}
        >
          <TextField
            placeholder="Enter the email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            helperText={errors.email}
          />
          <TextField
            placeholder="Enter the name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            helperText={errors.name}
          />
          <TextField
            placeholder="Enter the phone number"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phone}
            helperText={errors.phone}
          />
          <TextField
            placeholder="Enter the message"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            helperText={errors.message}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Fragment>
  );
}

export default App;
