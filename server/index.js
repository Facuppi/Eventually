import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {
  createEvent,
  getEvent,
  getEventByAdminId,
  getEventByReadonlyId,
  getEventsByUserEmail,
  updateEvent,
  closeEvent,
  reopenEvent,
  deleteEvent,
  duplicateEvent,
  saveResponse,
  getResponses,
  getResponseByEmail,
  deleteResponse,
  getOrCreateUser,
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

// API Routes

// Get or create user, return their event history
app.post('/api/users/login', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    
    getOrCreateUser(email);
    const events = getEventsByUserEmail(email);
    
    res.json({ email, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Get user's events
app.get('/api/users/:email/events', (req, res) => {
  try {
    const events = getEventsByUserEmail(req.params.email);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get events' });
  }
});

// Create new event
app.post('/api/events', (req, res) => {
  try {
    const { name, description, location, expectedParticipants, viewMode, selectedDates, adminEmail, customSlug, themeColor, deadline } = req.body;
    
    const event = {
      id: nanoid(10),
      adminId: nanoid(16),
      readonlyId: nanoid(12),
      adminEmail: adminEmail || '',
      name,
      description: description || '',
      location: location || '',
      expectedParticipants,
      viewMode,
      selectedDates,
      customSlug: customSlug || null,
      themeColor: themeColor || '#0071e3',
      deadline: deadline || null
    };
    
    createEvent(event);
    
    res.json({
      eventId: event.id,
      adminId: event.adminId,
      readonlyId: event.readonlyId,
      shareUrl: `/event/${event.id}`,
      adminUrl: `/admin/${event.adminId}`,
      readonlyUrl: `/results/${event.readonlyId}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Get event for participants (includes all responses for matrix view)
app.get('/api/events/:id', (req, res) => {
  try {
    const event = getEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    const responses = getResponses(event.id);
    const comments = getComments(event.id);
    
    // Don't expose admin_id to participants, but include responses for matrix view
    const { admin_id, admin_email, readonly_id, ...safeEvent } = event;
    res.json({ ...safeEvent, responses, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get event' });
  }
});

// Get readonly results view
app.get('/api/readonly/:readonlyId', (req, res) => {
  try {
    const event = getEventByReadonlyId(req.params.readonlyId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    const responses = getResponses(event.id);
    const comments = getComments(event.id);
    
    // Only return read-only data
    const { admin_id, admin_email, readonly_id, ...safeEvent } = event;
    res.json({ 
      ...safeEvent, 
      responses, 
      comments,
      readonlyMode: true 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get readonly event' });
  }
});

// Get event for admin (with full details and responses)
app.get('/api/admin/:adminId', (req, res) => {
  try {
    const event = getEventByAdminId(req.params.adminId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    const responses = getResponses(event.id);
    const comments = getComments(event.id);
    
    // Calculate recommendations
    const recommendations = calculateRecommendations(event.selected_dates, responses, event.expected_participants);
    
    res.json({
      ...event,
      responses,
      comments,
      recommendations
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get admin data' });
  }
});

// Update event (admin only)
app.patch('/api/admin/:adminId', (req, res) => {
  try {
    const updatedEvent = updateEvent(req.params.adminId, req.body);
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
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
      eventId: newId,
      adminId: newAdminId,
      readonlyId: newReadonlyId,
      shareUrl: `/event/${newId}`,
      adminUrl: `/admin/${newAdminId}`,
      readonlyUrl: `/results/${newReadonlyId}`
    });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Submit or update response
app.post('/api/events/:id/respond', (req, res) => {
  try {
    const { participantEmail, participantName, availability } = req.body;
    const event = getEvent(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    if (event.status === 'closed') {
      return res.status(400).json({ error: 'Event is closed' });
    }
    
    saveResponse(req.params.id, participantEmail, participantName, availability);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save response' });
  }
});

// Get participant's existing response by email
app.get('/api/events/:id/response/:email', (req, res) => {
  try {
    const response = getResponseByEmail(req.params.id, req.params.email);
    res.json(response || null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

// Delete participant response (admin only)
app.delete('/api/admin/:adminId/responses/:email', (req, res) => {
  try {
    const event = getEventByAdminId(req.params.adminId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    deleteResponse(event.id, req.params.email);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete response' });
  }
});

// Close event and declare winner
app.post('/api/admin/:adminId/close', (req, res) => {
  try {
    const { winnerDate } = req.body;
    closeEvent(req.params.adminId, winnerDate);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to close event' });
  }
});

// Reopen event
app.post('/api/admin/:adminId/reopen', (req, res) => {
  try {
    reopenEvent(req.params.adminId);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reopen event' });
  }
});

// Add comment
app.post('/api/events/:id/comments', (req, res) => {
  try {
    const { authorName, authorEmail, content } = req.body;
    const event = getEvent(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Comment content is required' });
    }
    
    const comment = addComment(req.params.id, authorName, authorEmail, content.trim());
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get comments for event
app.get('/api/events/:id/comments', (req, res) => {
  try {
    const comments = getComments(req.params.id);
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get comments' });
  }
});

// Delete comment (admin only)
app.delete('/api/admin/:adminId/comments/:commentId', (req, res) => {
  try {
    const success = deleteComment(parseInt(req.params.commentId), req.params.adminId);
    if (!success) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// Calculate recommendations
function calculateRecommendations(dates, responses, expectedParticipants) {
  if (responses.length === 0) return [];
  
  const dateScores = dates.map(date => {
    let available = 0;
    let adaptable = 0;
    let unavailable = 0;
    
    responses.forEach(response => {
      const status = response.availability[date];
      if (status === 'available') available++;
      else if (status === 'adaptable') adaptable++;
      else if (status === 'unavailable') unavailable++;
    });
    
    const totalResponses = responses.length;
    const score = (available * 3 + adaptable * 1) / (totalResponses * 3);
    
    return {
      date,
      available,
      adaptable,
      unavailable,
      notResponded: expectedParticipants - totalResponses,
      score,
      isPerfect: available === totalResponses && totalResponses === expectedParticipants,
      isGood: unavailable === 0 && totalResponses > 0
    };
  });
  
  return dateScores.sort((a, b) => {
    if (a.isPerfect !== b.isPerfect) return b.isPerfect ? 1 : -1;
    if (a.isGood !== b.isGood) return b.isGood ? 1 : -1;
    return b.score - a.score;
  });
}

// Serve React app for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(join(clientDistPath, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
