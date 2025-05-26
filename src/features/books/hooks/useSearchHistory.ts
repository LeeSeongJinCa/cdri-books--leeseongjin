import { useCallback, useState } from "react";

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  // 이미 히스토리에 있으면 삭제 하고 맨처음으로 추가합니다.
  const addHistory = useCallback((keyword: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter((v) => v.trim() !== "" && v !== keyword);
      newHistory.unshift(keyword);
      return newHistory.slice(0, 5);
    });
  }, []);

  // 히스토리에서 삭제합니다.
  const deleteHistory = useCallback((keyword: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter((v) => v.trim() !== "" && v !== keyword);
      return newHistory;
    });
  }, []);

  return {
    history,
    addHistory,
    deleteHistory,
  };
};
