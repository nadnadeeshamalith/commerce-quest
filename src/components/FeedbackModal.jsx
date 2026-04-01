import React, { useState } from 'react';
import { X, MessageSquareHeart, Send, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose, userName, onSubmit }) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({
        name: userName || 'නිර්නාමික (Anonymous)',
        text: comment.trim(),
        appVersion: 'grade6_update', // metadata to know what context the user had
        userAgent: navigator.userAgent
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setComment('');
        onClose();
      }, 2500);
    } catch (e) {
      console.error(e);
      alert('කමෙන්ට් එක යැවීමේදී දෝෂයක්. කරුණාකර නැවත උත්සාහ කරන්න.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-[#050505]/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 shadow-2xl rounded-3xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative p-6 px-8 border-b border-white/5 flex items-center gap-4 bg-gradient-to-r from-blue-900/40 to-indigo-900/40">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl">
            <MessageSquareHeart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">අදහස් දැක්වීම</h2>
            <p className="text-[11px] font-bold text-slate-400 tracking-wider">SHARE YOUR THOUGHTS</p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 relative">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">ස්තූතියි!</h3>
              <p className="text-slate-400 font-bold text-sm">ඔබේ අදහස් අපට ඉතා වටිනවා.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="text-slate-300 text-sm font-bold flex flex-col gap-1">
                <span>මොනවා හරි අඩුපාඩුවක් තියෙනවද?</span>
                <span className="text-indigo-300">අලුතින් මොනවද වෙබ්සයිට් එකට එකතු වෙන්න ඕනේ?</span>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-focus-within:opacity-50 blur transition duration-300" />
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="ඔබේ අදහස මෙතන ලියන්න..."
                  className="relative w-full h-32 p-4 bg-slate-950 border border-slate-700/80 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!comment.trim() || isSubmitting}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-indigo-600 text-white font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:shadow-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline" />
                    යවන්න (Send)
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
