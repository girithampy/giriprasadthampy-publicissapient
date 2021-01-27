import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

// styles
import styles from '../styles/LaunchItem.module.css';

const LaunchItem = (props) => {
  const {
    imageURL,
    missionName,
    flightNumber,
    missionIds = [],
    launchYear,
    launchSuccess,
    landSuccess
  } = props;
  return (
    <div className={styles.launchItemContainer}>
      {/* <img src={imageURL} alt={missionName} /> */}
      <div className={styles.imageContainer}>
        <div className={styles.imageInnerContainer}>
          <Image
            src={imageURL}
            alt={missionName}
            height="100%"
            width="100%"
            layout="responsive"
          />
        </div>
      </div>

      <div className={styles.launchItemInfoContainer}>
        <h4 className={styles.launchItemName}>
          {missionName}#{flightNumber}
        </h4>
        <div className={styles.missionIdContainer}>
          <label>Mission Ids :</label>
          <ul>
            {missionIds.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div xl="12">
          <div xl="12" className={styles.infoContainer}>
            <label>
              Launch Year: <span>{launchYear}</span>
            </label>{' '}
          </div>
          <div xl="12" className={styles.infoContainer}>
            <label>
              Successful Launch: <span>{launchSuccess}</span>
            </label>
          </div>
          <div xl="12" className={styles.infoContainer}>
            <label>
              Successful Landing: <span>{landSuccess}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

LaunchItem.propTypes = {
  imageURL: PropTypes.string,
  missionName: PropTypes.string,
  flightNumber: PropTypes.string,
  missionIds: PropTypes.instanceOf(Array),
  launchYear: PropTypes.string,
  launchSuccess: PropTypes.bool,
  landSuccess: PropTypes.bool
};

LaunchItem.defaultProps = {
  imageURL: '',
  missionName: '',
  flightNumber: '',
  missionIds: [],
  launchYear: '',
  launchSuccess: null,
  landSuccess: null
};

export default React.memo(LaunchItem);
