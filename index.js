import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {
  createEvent,
  getEvent,
  getEventByAdminId,
  updateEvent,
  deleteEvent,
  duplicateEvent,
  saveResponse,
  getResponses,
  addComment,
  getComments,
  deleteComment
} from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app in production
const clientDistPath = join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// =====================
// API Routes
// =====================

// Create new event
app.post('/api/events', (req, res) => {
  try {
    const { 
      title, 
      description, 
      location, 
      dates, 
      theme_color,
      organizer_name,
      organizer_email 
    } = req.body;
    
    if (!title || !dates || dates.length === 0) {
      return res.status(400).json({ error: 'Title and dates are required' });
    }
    
    const event = {
      id: nanoid(10),
      adminId: nanoid(16),
      readonlyId: nanoid(12),
      adminEmail: organizer_email || '',
      name: title,
      description: description || '',
      location: location || '',
      expectedParticipants: 10, // Default
      viewMode: 'days',
      selectedDates: dates,
      themeColor: theme_color || '#6366f1',
      deadline: null
    };
    
    createEvent(event);
    
    res.json({
      id: event.id,
      admin_id: event.adminId,
      readonly_id: event.readonlyId
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Get event for participants
app.get('/api/events/:id', (req, res) => {
  try {
    const event = getEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    const responses = getResponses(event.id);
    const comments = getComments(event.id);
    
    // Transform responses to participant format
    const participants = responses.map(r => ({
      name: r.participant_name,
      email: r.participant_email,
      availability: r.availability.map(a => 
        typeof a === 'object' ? a : { date: a.date, status: a.status }
      ),
      updated_at: r.updated_at
    }));
    
    // Transform to frontend-expected format
    res.json({
      id: event.id,
      title: event.name,
      description: event.description,
      location: event.location,
      dates: event.selected_dates,
      theme_color: event.theme_color,
      organizer_name: event.admin_email ? event.admin_email.split('@')[0] : 'Organizador',
      status: event.status,
      participants,
      comments: comments.map(c => ({
        id: c.id,
        author: c.author_name,
        content: c.content,
        created_at: c.created_at
      }))
    });
  } catch (error) {
    console.error('Error getting event:', error);
    res.status(500).json({ error: 'Failed to get event' });
  }
});

// Get event for admin
app.get('/api/admin/:adminId', (req, res) => {
  try {
    const event = getEventByAdminId(req.params.adminId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    const responses = getResponses(event.id);
    const comments = getComments(event.id);
    
    // Transform responses to participant format
    const participants = responses.map(r => ({
      name: r.participant_name,
      email: r.participant_email,
      availability: r.availability,
      updated_at: r.updated_at
    }));
    
    res.json({
      id: event.id,
      admin_id: event.admin_id,
      title: event.name,
      description: event.description,
      location: event.location,
      dates: event.selected_dates,
      theme_color: event.theme_color,
      status: event.status,
      winner_date: event.winner_date,
      created_at: event.created_at,
      participants,
      comments: comments.map(c => ({
        id: c.id,
        author: c.author_name,
        content: c.content,
        created_at: c.created_at
      }))
    });
  } catch (error) {
    console.error('Error getting admin event:', error);
    res.status(500).json({ error: 'Failed to get admin data' });
  }
});

// Vote on event
app.post('/api/events/:id/vote', (req, res) => {
  try {
    const { name, availability } = req.body;
    const event = getEvent(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    if (!name || !availability) {
      return res.status(400).json({ error: 'Name and availability are required' });
    }
    
    if (event.status === 'closed') {
      return res.status(400).json({ error: 'Event is closed' });
    }
    
    // Use name as email for anonymous voting
    const email = name.toLowerCase().replace(/\s+/g, '_') + '@anonymous.local';
    
    saveResponse(req.params.id, email, name, availability);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving vote:', error);
    res.status(500).json({ error: 'Failed to save vote' });
  }
});

// Update event (admin only)
app.patch('/api/admin/:adminId', (req, res) => {
  try {
    // Transform frontend field names to database field names
    const updates = {};
    if (req.body.title) updates.name = req.body.title;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.location !== undefined) updates.location = req.body.location;
    if (req.body.dates) updates.selectedDates = req.body.dates;
    if (req.body.theme_color) updates.themeColor = req.body.theme_color;
    
    const updatedEvent = updateEvent(req.params.adminId, updates);
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Duplicate event
app.post('/api/admin/:adminId/duplicate', (req, res) => {
  try {
    const newId = nanoid(10);
    const newAdminId = nanoid(16);
    const newReadonlyId = nanoid(12);
    
    const newEvent = duplicateEvent(req.params.adminId, newId, newAdminId, newReadonlyId);
    if (!newEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({
      id: newId,
      admin_id: newAdminId,
      readonly_id: newReadonlyId
    });
  } catch (error) {
    console.error('Error duplicating event:', error);
    res.status(500).json({ error: 'Failed to duplicate event' });
  }
});

// Delete event
app.delete('/api/admin/:adminId', (req, res) => {
  try {
    const success = deleteEvent(req.params.adminId);
    if (!success) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Get comments for event
app.get('/api/events/:id/comments', (req, res) => {
  try {
    const comments = getComments(req.params.id);
    res.json(comments.map(c => ({
      id: c.id,
      author: c.author_name,
      content: c.content,
      created_at: c.created_at
    })));
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ error: 'Failed to get comments' });
  }
});

// Add comment
app.post('/api/events/:id/comments', (req, res) => {
  try {
    const { author, content } = req.body;
    const event = getEvent(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Comment content is required' });
    }
    
    const comment = addComment(req.params.id, author || 'Anónimo', null, content.trim());
    res.json({
      id: comment.id,
      author: comment.author_name,
      content: comment.content,
      created_at: comment.created_at
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Delete comment
app.delete('/api/events/:id/comments/:commentId', (req, res) => {
  try {
    // Simple delete - in a real app would verify ownership
    deleteComment(parseInt(req.params.commentId), null);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// Serve React app for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(join(clientDistPath, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✨ Eventually v2 server running on http://localhost:${PORT}`);
});
