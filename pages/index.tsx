import { useState } from "react";
import { useGetPostsQuery, useGetPostByIdQuery } from "../store/api";
import { Container, Typography, Card, CardContent, Box, Modal, CircularProgress } from "@mui/material";

function PostDetail({ id }: { id: number | null }) {
  const { data: post, isLoading, error } = useGetPostByIdQuery(id ?? 0, { skip: !id });

  if (!id) return null;
  if (isLoading) return <Box display="flex" justifyContent="center"><CircularProgress sx={{color:'#333'}}/></Box>;
  if (error || !post) return <Typography align="center">Error loading post.</Typography>;

  return (
    <Card sx={{ maxWidth: 600, width: "100%", p: 3, boxShadow: 6, borderRadius: 4, bgcolor: "white" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>{post.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>By {post.author || "Unknown"}</Typography>
        <Typography variant="body1">{post.body}</Typography>
      </CardContent>
    </Card>
  );
}

export default function BlogList() {
  const { data: posts, isLoading, error } = useGetPostsQuery();
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleOpen = (id: number) => setSelectedPostId(id);
  const handleClose = () => setSelectedPostId(null);

  if (isLoading) return <Box display="flex" 
    justifyContent="center" 
    alignItems="center" 
    height="100vh" 
    width="100%"  
    sx={{ position: "absolute", top: 0, left: 0 }}><CircularProgress sx={{color:'#333'}}/></Box>;
  if (error) return <Typography>Error: {JSON.stringify(error)}</Typography>;
  const reversedPosts = posts ? [...posts].reverse() : [];
  return (
    <Container>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4} marginTop={2}>
        {reversedPosts?.map((post) => (
          <Card
            key={post.id}
            sx={{
              cursor: "pointer",
              borderRadius: 4,
              boxShadow: 3,
              bgcolor: "white", 
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6
              }
            }}
            onClick={() => handleOpen(post.id)}
          >
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2" color="text.secondary">By {post.author || "Unknown"}</Typography>
              <Typography variant="body2">{post.body.substring(0, 50)}...</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Modal open={Boolean(selectedPostId)} onClose={handleClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PostDetail id={selectedPostId} />
      </Modal>
    </Container>
  );
}
