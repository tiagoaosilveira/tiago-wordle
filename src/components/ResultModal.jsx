import PropTypes from 'prop-types';
import './ResultModal.css'

const ResultModal = ({ result, onClose }) => {
  return (
    <div className={`modal-container ${result ? 'show' : ''}`}>
      <div className={`modal-content`}>
        <h2>Result</h2>
        <p>{result}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

ResultModal.propTypes = {
  result: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ResultModal;
