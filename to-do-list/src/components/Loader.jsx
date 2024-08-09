function Loader() {
    return (
        <>
            <div className="loading-container text-center position-fixed">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );
}

export default Loader;
