// app/components/FeedbackSystem.tsx
"use client";

import { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Send,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

interface Feedback {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  roomType: string;
  date: string;
  helpful: number;
  notHelpful: number;
  userVote?: 'helpful' | 'notHelpful';
}

export default function FeedbackSystem({ roomId }: { roomId: string }) {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [newFeedback, setNewFeedback] = useState({
    rating: 5,
    comment: '',
    userName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Load existing feedback
  useEffect(() => {
    fetchFeedback();
  }, [roomId]);

  const fetchFeedback = async () => {
    try {
      const response = await fetch(`/api/feedback?roomId=${roomId}`);
      const data = await response.json();
      if (data.success) {
        setFeedback(data.feedback);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const submitFeedback = async () => {
    if (!newFeedback.comment.trim() || !newFeedback.userName.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newFeedback,
          roomId,
          date: new Date().toISOString()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setFeedback([data.feedback, ...feedback]);
        setNewFeedback({ rating: 5, comment: '', userName: '' });
        setShowForm(false);
        alert('Thank you for your feedback!');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const voteFeedback = async (feedbackId: string, vote: 'helpful' | 'notHelpful') => {
    try {
      const response = await fetch(`/api/feedback/vote`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackId, vote })
      });

      const data = await response.json();
      if (data.success) {
        setFeedback(feedback.map(f => 
          f.id === feedbackId 
            ? { 
                ...f, 
                helpful: data.helpful, 
                notHelpful: data.notHelpful,
                userVote: vote 
              }
            : f
        ));
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  // Calculate average rating
  const averageRating = feedback.length > 0
    ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length
    : 0;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-teal-300" />
            Guest Feedback
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[1,2,3,4,5].map(star => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-bold text-lg">{averageRating.toFixed(1)}</span>
            <span className="text-white/70 text-sm">({feedback.length} reviews)</span>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Add Review
        </button>
      </div>

      {/* Feedback Form */}
      {showForm && (
        <div className="mb-8 p-6 bg-white/5 rounded-xl border border-teal-500/30">
          <h4 className="text-xl font-bold text-white mb-4">Share Your Experience</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                value={newFeedback.userName}
                onChange={(e) => setNewFeedback({...newFeedback, userName: e.target.value})}
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Rating</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewFeedback({...newFeedback, rating: star})}
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= newFeedback.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Your Comment</label>
              <textarea
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white h-32"
                value={newFeedback.comment}
                onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                placeholder="Share your experience..."
                maxLength={500}
              />
              <div className="text-right text-white/50 text-sm mt-1">
                {newFeedback.comment.length}/500 characters
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={submitFeedback}
                disabled={isSubmitting}
                className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Review
                  </>
                )}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback List */}
      <div className="space-y-6">
        {feedback.length === 0 ? (
          <div className="text-center py-8 text-white/70">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          feedback.map((item) => (
            <div key={item.id} className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-white">{item.userName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {[1,2,3,4,5].map(star => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= item.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white/70 text-sm">{item.date}</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-teal-500/20 text-teal-300 text-xs rounded-full">
                  {item.roomType}
                </span>
              </div>
              
              <p className="text-white/90 mb-4">{item.comment}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="text-white/70">Was this helpful?</span>
                <button
                  onClick={() => voteFeedback(item.id, 'helpful')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                    item.userVote === 'helpful'
                      ? 'bg-teal-500/30 text-teal-300'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({item.helpful})</span>
                </button>
                <button
                  onClick={() => voteFeedback(item.id, 'notHelpful')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                    item.userVote === 'notHelpful'
                      ? 'bg-rose-500/30 text-rose-300'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>Not Helpful ({item.notHelpful})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}