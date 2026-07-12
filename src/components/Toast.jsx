import React from 'react';
import Icon from './Icons';

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className={`fixed bottom-6 right-6 px-4 py-3.5 rounded-xl text-white font-medium text-sm flex items-center gap-2.5 shadow-2x border ${
      toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-400' : 'bg-red-950/90 border-red-500/30 text-red-400'
    }`}>
      <Icon name={toast.type === 'success' ? 'check' : 'close'} className="w-4 h-4" />
      <span>{toast.message}</span>
    </div>
  );
}
