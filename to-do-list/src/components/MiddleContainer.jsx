function MiddleContainer({ children }) {
    return (
        <div className="middle-container position-fixed border rounded login-container p-3 bg-white">
            {children}
        </div>
    );
}

export default MiddleContainer;
