import '@styles/NotFound.css';

const NotFound = () => {
    return (
        <div className="NotFound">
            <h1 className="NotFound-Title">404</h1>
            <p>Oops! Something is wrong.</p>
            <a className="button" href="/"><i className="icon-home"></i> Go back in initial page, is better.</a>
        </div>
    );
};

export default NotFound;
