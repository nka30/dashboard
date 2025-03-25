import { useState } from "react";
import { useCreatePostMutation } from "../store/api";
import { Container, TextField, Button, Typography, Paper, Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [createPost, { isLoading,isError,error }] = useCreatePostMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
        const response = await createPost({ title, body, author }).unwrap();
        console.log("Post created successfully:", response); 
        router.push('/');
      } catch (err) {
        console.log("Error creating post:", err);
      }
  };
  if (isError) {
    console.error("API Error:", error);
  }
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Paper elevation={2} sx={{ p: 4, maxWidth: 500, width: '100%' , borderRadius: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' },
            fontFamily: 'Inconsolata',
        }}>Create a New Post</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" sx={{ 
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              }
            }}  />
          <TextField label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} fullWidth margin="normal" sx={{ 
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              }
            }} />
          <TextField label="Body" value={body} onChange={(e) => setBody(e.target.value)} fullWidth margin="normal" multiline rows={4} sx={{ 
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              }
            }} />

            {isError && (
              <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                Error creating post. Please try again.
              </Typography>
            )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "#333" }} />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                sx={{
                  bgcolor: "#666666",
                  borderRadius: 3,
                  fontSize: '16px',
                  fontFamily: 'Inconsolata',
                }}
              >
                Create
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
}