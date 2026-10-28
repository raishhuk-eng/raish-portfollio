import { Link } from 'react-router-dom';
import { BsHouseDoor, BsSearch } from 'react-icons/bs';

export default function NotFoundPage() {
  return (
    <div className="py-5 text-center min-vh-70 d-flex align-items-center justify-content-center">
      <div className="container py-5">
        <div className="glass-card max-w-600 mx-auto p-5">
          <div className="badge rounded-pill bg-danger-subtle text-danger font-mono px-3 py-2 mb-3">
            Error 404 &bull; Page Not Found
          </div>
          <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            404
          </h1>
          <p className="fs-5 text-secondary mb-4">
            The page route you requested does not exist or has been relocated.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/" className="btn btn-brand-primary">
              <BsHouseDoor size={16} />
              <span>Return to Home</span>
            </Link>
            <Link to="/skills" className="btn btn-brand-outline">
              <BsSearch size={15} />
              <span>Explore Skills</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
