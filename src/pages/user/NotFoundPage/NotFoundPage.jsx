import React from 'react';

function NotFoundPage() {
  document.title = 'Trang không tồn tại';

  return (
    <div className="container">
      <div
        style={{
          fontSize: '4rem',
          fontWeight: '900',
          color: '#262626',
        }}
      >
        Page Not Found
      </div>
    </div>
  );
}

export default NotFoundPage;
