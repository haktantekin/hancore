import React, { useState, useCallback, useEffect } from 'react';
import { CopyButtonProps } from 'types/type';

const CopyButton: React.FC<CopyButtonProps> = ({
  children,
  value,
  timeout = 1000,
  onCopied,
  disabled = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<number | null>(null);

  const copy = useCallback(() => {
    if (disabled || copied) return;

    navigator.clipboard.writeText(value)
      .then(() => {
        setCopied(true);
        onCopied?.();
        const timeoutId = window.setTimeout(() => setCopied(false), timeout);
        setCopyTimeout(timeoutId);
      })
      .catch((err) => console.error('Failed to copy: ', err));
  }, [value, timeout, onCopied, disabled, copied]);

  useEffect(() => {
    return () => {
      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }
    };
  }, [copyTimeout]);

  return children({ copy, copied });
};

export default CopyButton;