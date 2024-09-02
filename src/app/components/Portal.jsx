  // import React, { useState, useEffect } from "react";
  // import ReactDOM from "react-dom";

  // const Portal = ({ children }) => {
  //   return ReactDOM.createPortal(children, document.body);
  // };

  // const App = () => {
  //   const [isOpen, setIsOpen] = useState(false);

  //   useEffect(() => {
  //     const handleKeyDown = (event) => {
  //       if (event.key === "Escape") {
  //         setIsOpen(false);
  //       }
  //     };

  //     if (isOpen) {
  //       window.addEventListener("keydown", handleKeyDown);
  //       return () => window.removeEventListener("keydown", handleKeyDown);
  //     }
  //   }, [isOpen]);

  //   return (
  //     <>
  //       <button onClick={() => setIsOpen(!isOpen)}>Toggle Modal</button>
  //       {isOpen && (
  //         <Portal>
  //           <div
  //             role="dialog"
  //             aria-labelledby="modal-title"
  //             aria-hidden={!isOpen}
  //             style={{
  //               position: "fixed",
  //               top: 0,
  //               left: 0,
  //               width: "100%",
  //               height: "100%",
  //               background: "rgba(0, 0, 0, 0.5)",
  //               zIndex: 9999,
  //             }}
  //           >
  //             <div
  //               style={{
  //                 position: "absolute",
  //                 top: "50%",
  //                 left: "50%",
  //                 transform: "translate(-50%, -50%)",
  //                 background: "white",
  //                 padding: "20px",
  //                 borderRadius: "4px",
  //               }}
  //             >
  //               <h1 id="modal-title">Portal Modal</h1>
  //               <button onClick={() => setIsOpen(false)}>Close</button>
  //             </div>
  //           </div>
  //         </Portal>
  //       )}
  //     </>
  //   );
  // };

  // export default App;
