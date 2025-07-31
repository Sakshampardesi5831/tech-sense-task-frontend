import React from 'react'

const AllListContact = () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];

  const handleEdit = (index) => {
    console.log('Edit item:', index);
  };

  const handleDelete = (index) => {
    console.log('Delete item:', index);
  };
  return (
     <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item} />
          <Box>
            <IconButton onClick={() => handleEdit(index)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(index)}>
              <Delete />
            </IconButton>
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

export default AllListContact