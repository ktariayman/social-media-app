import React from 'react';

const Download: React.FC = () => {
 const downloadFile = () => {
  // Get the current content of the React component as an HTML string
  const htmlContent = document.documentElement.outerHTML;
  // Create a Blob with the HTML content
  const blob = new Blob([htmlContent], { type: 'text/html' });
  // Create a download URL for the Blob
  const url = URL.createObjectURL(blob);
  // Create an anchor element
  const a = document.createElement('a');
  // Set the anchor's href to the download URL
  a.href = url;
  // Set the anchor's download attribute to specify the filename
  a.download = 'index.html';
  // Append the anchor to the body
  document.body.appendChild(a);
  // Programmatically trigger a click event on the anchor
  a.click();
  // Revoke the URL to free up resources
  window.URL.revokeObjectURL(url);
  // Remove the anchor from the document
  document.body.removeChild(a);
 };

 return (
  <button onClick={downloadFile}>
   Download as HTML
  </button>
 );
};

export default Download;
