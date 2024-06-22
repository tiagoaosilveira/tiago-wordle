import PropTypes from 'prop-types';
import './ResultModal.css'

const ResultModal = ({ result, onClose }) => {
  return (
    <div className={`modal-container ${result ? 'show' : ''}`}>
      <div className={`modal-content`}>
        {result === 'WIN' && <h1>Congratulations!</h1>}
        {result === 'LOSE' && <h1>You lost after 3 tries!</h1>}
        <button onClick={onClose}>Play Again</button>
        {result === 'WIN' &&
          <div>
            <div className={'firework'}></div>
            <div className={'firework'}></div>
            <div className={'firework'}></div>
          </div>
        }
      </div>
    </div>
  )
}

ResultModal.propTypes = {
  result: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ResultModal;
