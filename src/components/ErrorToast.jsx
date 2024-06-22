import PropTypes from 'prop-types';
import './ErrorToast.css'

const ErrorToast = ({ error }) => {
  return (
    <div className={`error-container ${error ? 'show' : ''}`}>
      <div className={`error-content`}>
        {error && <h1>{error}</h1>}
      </div>
    </div>
  )
}

ErrorToast.propTypes = {
  error: PropTypes.string,
}

export default ErrorToast;
