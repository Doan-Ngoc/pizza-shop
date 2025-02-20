import './Footer.css';

const Footer: React.FC = () => {
  return (
    <div className='footer d-flex justify-content-center'>
      <div className='d-flex footer-container w-75 justify-content-between align-items-center gap-3'>
        <img src="/images/logo.png" />
        <div className='follow-us d-flex gap-3'>
          <span>Follow Us:</span>
          <div className='social-icons d-flex gap-3'>
            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
              <i className="fab fa-facebook"></i>
            </a>
            <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
              <i className="fab fa-twitter"></i>
            </a>
            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
              <i className="fab fa-instagram"></i>
            </a>
            <a href='https://www.youtube.com' target='_blank' rel='noopener noreferrer'>
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer