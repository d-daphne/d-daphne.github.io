import React from 'react';
import { X, Printer, FileText } from 'lucide-react';
import { contact, dataRoles, certifications, education } from '../data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-[var(--border)] rounded-[2.25rem] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-muted/60 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#ab93db]" />
            <h2 className="text-base font-extrabold text-[#45324d]">Daphne Duong — Curriculum Vitae</h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#e7b1e8]/40 hover:bg-[#e7b1e8]/70 text-[#45324d] flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-card hover:bg-muted text-slate-700 flex items-center justify-center transition-colors border border-[var(--border)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#45324d] text-xs sm:text-sm leading-relaxed font-sans">
          <div className="text-center pb-6 border-b border-[var(--border)]">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase mb-1">
              <span className="text-gradient">{contact.name}</span>
            </h1>
            <p className="text-xs text-muted-foreground font-bold mb-3">
              {contact.email} | linkedin.com/in/ddaphne | github.com/d-daphne
            </p>
            <div className="max-w-2xl mx-auto text-xs text-slate-700 font-semibold leading-relaxed bg-muted/50 p-4 rounded-2xl border border-[var(--border)]">
              {contact.summary}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold text-[#ab93db] uppercase tracking-[0.24em] border-b border-[var(--border)] pb-1">
              WORK EXPERIENCE
            </h3>
            {dataRoles.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-extrabold text-[#45324d]">
                  <span>{exp.role} • <span className="text-primary font-bold">{exp.org}</span></span>
                  <span className="text-xs text-muted-foreground font-semibold">{exp.location} | {exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium pl-1 text-xs">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold text-[#ab93db] uppercase tracking-[0.24em] border-b border-[var(--border)] pb-1">
              CERTIFICATIONS
            </h3>
            <ul className="list-disc list-inside text-xs font-semibold space-y-1 text-slate-700">
              {certifications.map((cert) => (
                <li key={cert.code}>
                  <strong className="text-[#45324d]">{cert.code}:</strong> {cert.label} — {cert.issuer} ({cert.year})
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-[#ab93db] uppercase tracking-[0.24em] border-b border-[var(--border)] pb-1">
              EDUCATION
            </h3>
            {education.map((edu) => (
              <div key={edu.school} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-semibold text-slate-700">
                <div>
                  <strong className="text-[#45324d]">{edu.school}</strong> — {edu.program}
                </div>
                <span className="text-muted-foreground">{edu.location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
