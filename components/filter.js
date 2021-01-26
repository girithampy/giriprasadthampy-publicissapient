import { useEffect, useState } from 'react'

import {
    Card, CardImg
} from 'reactstrap';

// styles
import styles from './../styles/Filter.module.css'

const launchYearsFilters = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
const successfullLaunchesFilters = [true, false];
const successfullLandingFilters = [true, false];

const Filter = () => {

    const [launchYear, setLaunchYear] = useState('');
    const [successfullLaunch, setSuccessfullLaunch] = useState('');
    const [successfullLanding, setSuccessfullLanding] = useState('');

    const applyFilter = () => {
        console.log('Applying filter')
        console.log(window)
    }
    return (<Card className={styles.filterContainer}>
        <div>
            <h3>Filters</h3>
        </div>
        <h5>Launch Year</h5>
        <hr />
        {/* <CardImg top src="https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png" alt="Card image cap" /> */}
        {/* <Link href="/?launch_success=true&land_success=true&launch_year=2014"><a>Apply Filter</a></Link> */}
    </Card>)
}

export default Filter;

