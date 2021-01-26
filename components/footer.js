import { Row, Col } from 'reactstrap';

// styles
import styles from './../styles/Footer.module.css'

const Footer = () => (
    <Row xl="12">
        <Col className={styles.footerContainer}><label>Developed By <span>Giriprasad Thampy</span></label></Col>
    </Row>
)

export default Footer;