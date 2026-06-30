'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/toast-context';
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiX } from 'react-icons/hi';

const icons = {
  success: HiCheckCircle,
  error: HiXCircle,
  info: HiInformationCircle,
};

const colors = {
  success: 'bg-green-50 border-green-400 text-green-800 dark:bg-green-900/50 dark:text-green-200 dark:border-green-600',
  error: 'bg-red-50 border-red-400 text-red-800 dark:bg-red-900/50 dark:text-red-200 dark:border-red-600',
  info: 'bg-blue-50 border-blue-400 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-600',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-[300px] ${colors[toast.type]}`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 hover:opacity-70 transition"
              >
                <HiX className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
