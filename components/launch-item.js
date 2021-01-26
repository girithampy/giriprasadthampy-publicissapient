import { Card, CardImg, Row, Col, CardBody } from 'reactstrap';

// styles
import styles from './../styles/LaunchItem.module.css'

const LaunchItem = (props) => {
    const { imageURL, missionName, flightNumber, missionIds = [], launchYear, launchSuccess, landSuccess } = props;
    return (<Row xl="12">
        <Col xl="12">
            <Card className={styles.launchItemContainer}>
                <CardImg top src={imageURL} alt={missionName} />
                <CardBody>
                    <h6 className={styles.launchItemName}>{missionName} #{flightNumber}</h6>
                    <div className={styles.missionIdContainer}>
                        <label>Mission Ids :</label>
                        <ul>
                            {missionIds.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    {/* <div className={styles.infoContainer}>
                        <label>Launch Year: <span>{launchYear}</span></label>
                        <label>Successful Launch: <span>{launchSuccess}</span></label>
                        <label>Successful Landing: <span>{landSuccess}</span></label>
                    </div> */}
                    <Row xl="12">
                        <Col xl="12" className={styles.infoContainer}><label>Launch Year: <span>{launchYear}</span></label> </Col>
                        <Col xl="12" className={styles.infoContainer}><label>Successful Launch: <span>{launchSuccess}</span></label></Col>
                        <Col xl="12" className={styles.infoContainer}><label>Successful Landing: <span>{landSuccess}</span></label></Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    </Row>)
}

export default LaunchItem;