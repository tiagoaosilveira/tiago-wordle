import PropTypes from 'prop-types';
import './ResultModal.css'

const ResultModal = ({ result, onClose }) => {
  return (
    <div className={`modal-container ${result ? 'show' : ''}`}>
      <div className={`modal-content`}>
        <h1>Congratulations!</h1>
        <button onClick={onClose}>Close</button>
        <div className={'firework'}></div>
        <div className={'firework'}></div>
        <div className={'firework'}></div>
      </div>
    </div>
  )
}

ResultModal.propTypes = {
  result: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ResultModal;
