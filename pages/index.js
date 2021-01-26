import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Col, Container, Row } from 'reactstrap';

import axios from 'axios';

// Components
import Head from '../components/head';
import Footer from '../components/footer';
import Filter from '../components/filter';

// styles
import styles from './../styles/Home.module.css'

const limit = 100;

const createQueryString = (query) => (
  Object.keys(query)
    .map(key => query[key] ? `${key}=${query[key]}` : '')
    .join('&')
)

export const Home = (props) => {
  const [spaceXPrograms, setSpaceXPrograms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log('launch_success changed to ', props)
    const qs = createQueryString(router.query);
    axios.get(`https://api.spaceXdata.com/v3/launches?limit=${limit}&${qs}`).then(res => {
      setSpaceXPrograms(res.data)
      console.log('res.data ', res.data)
    }).catch(err => console.log('Error :', err))
  }, [router.query])

  return (<Container className={styles.homeContainer}>
    <Head title="SpaceX" />
    <Row xl="12">
      <Col><h1>Space X Launch Program</h1></Col>
    </Row>
    <Row ss="12" sm="12">
      <Col xs="12" sm="4" md="3">
        <Filter />
      </Col>
    </Row>
    {/* <div>This is home page launch_success:{spaceXPrograms.length}</div> */}
    {/* <Footer /> */}
  </Container>)
};

// Home.getInitialProps = async ({ query }) => {
//   const qs = createQueryString(query);

//   const response = await axios.get(`https://api.spaceXdata.com/v3/launches?limit=${limit}&${qs}`);
//   console.log('response ', response.data)
//   return { spaceXresponse: response.data }
// }

export default Home;