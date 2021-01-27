import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios';

// styles
import styles from './../styles/Home.module.css'

const Head = dynamic(() => import('../components/head'));
const Footer = dynamic(() => import('../components/footer'));
const Filter = dynamic(() => import('../components/filter'));
const LaunchItem = dynamic(() => import('../components/launch-item'));

const pageLimit = 8;

const createQueryString = (query) => (
  Object.keys(query)
    .map(key => query[key] ? `${key}=${query[key]}` : '')
    .join('&')
)

export const Home = (props) => {
  const router = useRouter();

  const [pageOffset, setPageOffset] = useState(0);
  const [filter, setFilter] = useState(router.query || {});
  const [flights, setFlights] = useState(props.launches || []);
  const [loading, setLoading] = useState(false);

  const fetchLaunches = async (filter, offset = 0, type = 'reset') => {
    const qs = createQueryString(filter);
    setLoading(true);
    axios.get(`https://api.spaceXdata.com/v3/launches?limit=${pageLimit}&offset=${offset}&${qs}`).then(res => {
      console.log('pageOffset after', pageOffset)
      if (type === 'pagination') {
        setFlights([...flights, ...res.data])
      } else {
        setFlights(res.data)
      }
      setPageOffset(offset)

      setLoading(false)
    }).catch(err => {
      console.log('Error :', err);
      setLoading(false)
    })
  }

  const onFilterChange = (filter) => {
    setFilter(filter);
    const qs = createQueryString(filter);
    router.push(`/?${qs}`, undefined, { shallow: true });
    setFlights([]);
    fetchLaunches(filter);
  }
  return (<div className={styles.homeContainer}>
    <div className={styles.homeInnerContainer}>
      <Head title="SpaceX" description="List and browse all launches by SpaceX program." />
      <div className={styles.titleContainer}>
        <h1>SpaceX Launch Programs</h1>
      </div>
      <div className={styles.bodyContainer}>

        <div className={styles.filterSectionContainer}>
          <Filter filter={filter} onFilterChange={onFilterChange} />
        </div>
        <div className={styles.listContainer}>
          {flights.map((flight, i) =>
            <div className={styles.listItemContainer} key={i}>
              <LaunchItem
                missionName={flight.mission_name}
                flightNumber={flight.flight_number}
                imageURL={flight.links.mission_patch_small}
                missionIds={flight.mission_id}
                launchYear={flight.launch_year}
                launchSuccess={flight.launch_success === null ? '' : `${flight.launch_success}`}
                landSuccess={flight.rocket.first_stage.cores[0].land_success === null ? '' : `${flight.rocket.first_stage.cores[0].land_success}`} />
            </div>
          )}
          {!loading && flights.length === 0 && <div className={styles.messageContainer}><h4>No Data</h4></div>}
          {loading && <div className={styles.messageContainer}><h4>Loading...</h4></div>}
          {!loading && flights.length >= pageLimit && <div className={styles.loadMoreContainer}>
            <button onClick={() => fetchLaunches(filter, (pageOffset + pageLimit), 'pagination')}>Load more</button>
          </div>}
        </div>

      </div>
      <Footer />
    </div>
  </div>)
};

Home.getInitialProps = async ({ query }) => {
  const qs = createQueryString(query);

  const response = await axios.get(`https://api.spaceXdata.com/v3/launches?limit=${pageLimit}&${qs}`);
  return { launches: response.data }
}

export default Home;