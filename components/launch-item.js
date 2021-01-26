import React from 'react';

// styles
import styles from './../styles/LaunchItem.module.css'

const LaunchItem = (props) => {
    const { imageURL, missionName, flightNumber, missionIds = [], launchYear, launchSuccess, landSuccess } = props;
    return (<div className={styles.launchItemContainer}>
        <img src={imageURL} alt={missionName} />
        <div className={styles.launchItemInfoContainer}>
            <h6 className={styles.launchItemName}>{missionName} #{flightNumber}</h6>
            <div className={styles.missionIdContainer}>
                <label>Mission Ids :</label>
                <ul>
                    {missionIds.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
            <div xl="12">
                <div xl="12" className={styles.infoContainer}><label>Launch Year: <span>{launchYear}</span></label> </div>
                <div xl="12" className={styles.infoContainer}><label>Successful Launch: <span>{launchSuccess}</span></label></div>
                <div xl="12" className={styles.infoContainer}><label>Successful Landing: <span>{landSuccess}</span></label></div>
            </div>
        </div>
    </div>)
}

export default React.memo(LaunchItem);