import { AlertCircle } from 'lucide-react';

type Props = {
  mvpSection: string;
  endpoint: string;
  description?: string;
  className?: string;
};

export default function BackendGapBanner({
  mvpSection,
  endpoint,
  description,
  className = '',
}: Props) {
  return (
    <div
      className={`flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 ${className}`}
      role="status"
    >
      <AlertCircle className="shrink-0 mt-0.5" size={18} />
      <div>
        <p className="font-semibold">Integração pendente — {mvpSection}</p>
        {description && <p className="mt-1 text-amber-800">{description}</p>}
        <p className="mt-2 font-mono text-xs bg-amber-100/80 rounded px-2 py-1 inline-block">
          {endpoint}
        </p>
      </div>
    </div>
  );
}
