import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/auth.Stores';
import { useDownloadsStore } from '../stores/download.Stores';

function DownloadButton({ bookId }) {
  const { User } = useAuthStore();
  const { downloadedBook, checkIfDownloaded, downloadBook, unDownloadBook, isLoadingDownload } =
    useDownloadsStore();

  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    if (User?.User_ID && bookId) {
      (async () => {
        const data = await checkIfDownloaded({ userId: User.User_ID, bookId });
        setIsDownloaded(!!data);
      })();
    }
  }, [User, bookId]);

  const handleToggleDownload = async () => {
    if (isDownloaded) {
      await unDownloadBook({ userId: User.User_ID, bookId });
      setIsDownloaded(false);
    } else {
      await downloadBook({ userId: User.User_ID, bookId });
      setIsDownloaded(true);
    }
  };

  return (
    <button
      disabled={isLoadingDownload}
      onClick={handleToggleDownload}
      className={`px-6 py-2 rounded-full font-semibold transition ${
        isDownloaded
          ? 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          : 'bg-[#A56F6E] text-white hover:bg-[#8F5B5A]'
      }`}
    >
      {isLoadingDownload ? 'Processing...' : isDownloaded ? 'Remove Download' : 'Download Book'}
    </button>
  );
}

export default DownloadButton;
