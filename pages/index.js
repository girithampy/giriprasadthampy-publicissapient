import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Col, Container, Row } from 'reactstrap';

import axios from 'axios';

// Components
import Head from '../components/head';
import Footer from '../components/footer';
import Filter from '../components/filter';
import LaunchItem from '../components/launch-item';

// styles
import styles from './../styles/Home.module.css'

const limit = 100;

const createQueryString = (query) => (
  Object.keys(query)
    .map(key => query[key] ? `${key}=${query[key]}` : '')
    .join('&')
)

export const Home = (props) => {
  const router = useRouter();

  const [filter, setFilter] = useState(router.query || {});
  const [flights, setFlights] = useState(props.launches || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const qs = createQueryString(router.query);
    setLoading(true)
    axios.get(`https://api.spaceXdata.com/v3/launches?limit=${limit}&${qs}`).then(res => {
      setFlights(res.data)
      setLoading(false)
    }).catch(err => {
      console.log('Error :', err);
      setLoading(false)
    })
  }, [filter])

  const onFilterChange = (filter) => {
    setFilter(filter);
    const qs = createQueryString(filter);
    router.push(`/?${qs}`, undefined, { shallow: true });
  }

  return (<Container fluid={true} className={styles.homeContainer}>
    <Head title="SpaceX" description="List and browse all launches by SpaceX program." />
    <Row>
      <Col><h1>SpaceX Launch Programs</h1></Col>
    </Row>
    <div className={styles.bodyContainer}>
      <div className={styles.filterSectionContainer}>
        <Filter filter={filter} onFilterChange={onFilterChange} />
      </div>
      <div className={styles.listContainer}>
        {/* <Row> */}
          {!loading && flights.map((flight, i) =>
            <Col key={i}>
              <LaunchItem
                missionName={flight.mission_name}
                flightNumber={flight.flight_number}
                imageURL={flight.links.mission_patch_small}
                missionIds={flight.mission_id}
                launchYear={flight.launch_year}
                launchSuccess={flight.launch_success === null ? '' : `${flight.launch_success}`}
                landSuccess={flight.rocket.first_stage.cores[0].land_success === null ? '' : `${flight.rocket.first_stage.cores[0].land_success}`} />
            </Col>
          )}
          {!loading && flights.length === 0 && <Col><h4>No Data</h4></Col>}
          {loading && <Col><h4>Loading...</h4></Col>}
        {/* </Row> */}
      </div>
    </div>
    <Footer />
  </Container>)
};

Home.getInitialProps = async ({ query }) => {
  const qs = createQueryString(query);

  const response = await axios.get(`https://api.spaceXdata.com/v3/launches?limit=${limit}&${qs}`);
  return { launches: response.data }
}

export default Home;