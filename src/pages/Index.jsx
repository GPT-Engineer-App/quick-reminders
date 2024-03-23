import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, IconButton, Spacer, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      toast({
        title: "Please enter a todo",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Box maxWidth="400px" margin="0 auto" p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Todo App
      </Heading>
      <form onSubmit={handleSubmit}>
        <HStack mb={8}>
          <Input variant="filled" placeholder="Enter a todo" value={todo} onChange={(e) => setTodo(e.target.value)} />
          <Button colorScheme="blue" type="submit" px={8}>
            <FaPlus />
          </Button>
        </HStack>
      </form>
      <VStack spacing={4} alignItems="stretch">
        {todos.map((todo) => (
          <HStack key={todo.id}>
            <Text>{todo.text}</Text>
            <Spacer />
            <IconButton icon={<FaTrash />} isRound onClick={() => deleteTodo(todo.id)} />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
