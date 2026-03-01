import React from 'react';
import { useHR, Candidate } from '../context/HRContext';
import { motion } from 'framer-motion';
import { User, MoreHorizontal } from 'lucide-react';

const STAGES: Candidate['stage'][] = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

export const Candidates = () => {
  const { candidates, moveCandidateStage } = useHR();

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('candidateId', id);
  };

  const handleDrop = (e: React.DragEvent, stage: Candidate['stage']) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('candidateId');
    if (id) {
      moveCandidateStage(id, stage);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex overflow-x-auto gap-6 pb-4">
        {STAGES.map((stage) => (
          <div
            key={stage}
            className="min-w-[300px] bg-slate-100 rounded-xl p-4 flex flex-col h-full"
            onDrop={(e) => handleDrop(e, stage)}
            onDragOver={handleDragOver}
          >
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-slate-100 pb-2 z-10">
              <h3 className="font-bold text-slate-700">{stage}</h3>
              <span className="bg-white text-slate-500 text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                {candidates.filter(c => c.stage === stage).length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {candidates
                .filter((c) => c.stage === stage)
                .map((candidate) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={candidate.id}
                    className="relative"
                  >
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, candidate.id)}
                      className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group relative z-0"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-slate-800">{candidate.name}</div>
                        <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm text-slate-500 mb-3">{candidate.role}</div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <User className="w-3 h-3" /> {candidate.score}% Match
                        </div>
                        <div className="flex items-center gap-2">
                          {stage === 'Offer' && candidate.phone && (
                            <button
                              onClick={() => {
                                const text = encodeURIComponent(`Hello ${candidate.name}, we are thrilled to offer you the position of ${candidate.role} at our company! Please let us know when you're available to discuss the offer details.`);
                                window.open(`https://wa.me/${candidate.phone}?text=${text}`, '_blank');
                              }}
                              className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors"
                              title="Send Offer via WhatsApp"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </button>
                          )}
                          <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                            {candidate.name.charAt(0)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
