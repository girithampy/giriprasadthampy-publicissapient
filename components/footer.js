import React from 'react';

// styles
import styles from './../styles/Footer.module.css'

const Footer = () => (
    <div className={styles.footerContainer}><label>Developed By <span>Giriprasad Thampy</span></label></div>
)

export default React.memo(Footer);